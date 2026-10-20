from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import ollama
import smtplib
from email.mime.text import MIMEText

app = FastAPI()

# Allow React to communicate with Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class ReportRequest(BaseModel):
    zip_code: str

class LeadRequest(BaseModel):
    name: str
    email: str
    phone: str
    timeline: str

@app.post("/api/chat")
async def chat(request: ChatRequest):
    response = ollama.chat(model='qwen2.5:14b', messages=[
        {'role': 'system', 'content': 'You are the AI assistant for Clutch City Realty in Houston. Keep responses professional, concise, and focused on helping buyers, sellers, or renters.'},
        {'role': 'user', 'content': request.message}
    ])
    return {"reply": response['message']['content']}

@app.post("/api/market-report")
async def market_report(request: ReportRequest):
    prompt = f"Act as a Houston real estate expert. Provide a brief, 3-sentence market overview for zip code {request.zip_code}, highlighting the general neighborhood vibe and typical property types."
    response = ollama.chat(model='qwen2.5:14b', messages=[
        {'role': 'user', 'content': prompt}
    ])
    return {"report": response['message']['content']}

@app.post("/api/lead")
async def capture_lead(request: LeadRequest):
    # 1. Print it to the backend terminal immediately so you have a backup record
    email_body = f"""
New Lead from Clutch City Realty Website!

Name: {request.name}
Email: {request.email}
Phone: {request.phone}
Timeline: {request.timeline}
"""
    print("--- NEW LEAD DETECTED ---")
    print(email_body)

    # 2. Send the actual email via Gmail
    try:
        msg = MIMEText(email_body)
        msg['Subject'] = f"New Lead: {request.name}"
        msg['From'] = "clutchcityrealty@gmail.com"
        msg['To'] = "clutchcityrealty@gmail.com"

        # Connect to Gmail's server
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        
        # Log in with your App Password
        app_password = "fxvg utcm huun hfcz" 
        server.login("clutchcityrealty@gmail.com", app_password)
        
        # Send and close connection
        server.send_message(msg)
        server.quit()
            
        return {"status": "success", "message": "Lead received"}
    except Exception as e:
        print("Email sending failed:", str(e))
        # We still return success so the user sees a "Thank you" screen, 
        # even if the email failed. You still have the backup print in the terminal!
        return {"status": "success", "message": "Lead received but email failed"}