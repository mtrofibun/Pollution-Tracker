from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

app = FastAPI(title="Sensor Explanation Service")

MODEL_NAME = "microsoft/Phi-3-mini-4k-instruct"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    torch_dtype=torch.float32,
    device_map="cpu"
)

class SensorExplanationInput(BaseModel):
    current_value: float
    avg_24h: float
    trend: str            
    risk_level: str        
    anomaly_detected: bool

def generate_explanation(prompt: str) -> str:
    inputs = tokenizer(prompt, return_tensors="pt")

    outputs = model.generate(
        **inputs,
        max_new_tokens=60,
        do_sample=False,
        temperature=0.0
    )

    full_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return full_text.replace(prompt, "").strip()

@app.post("/explain")
def explain_sensor(data: SensorExplanationInput):
    prompt = f"""
You are given summarized pollution sensor statistics.
Explain the situation in 1–2 concise sentences for a general audience.

Current value: {data.current_value}
24-hour average: {data.avg_24h}
Trend: {data.trend}
Risk level: {data.risk_level}
Anomaly detected: {data.anomaly_detected}
"""

    explanation = generate_explanation(prompt)

    return {
        "explanation": explanation
    }

@app.get("/health")
def health():
    return {"status": "ok"}