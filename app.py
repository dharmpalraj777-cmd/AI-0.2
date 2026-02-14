from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json, os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

MEMORY_FILE = "memory.json"

if not os.path.exists(MEMORY_FILE):
    with open(MEMORY_FILE, "w") as f:
        json.dump([], f)

class Chat(BaseModel):
    message: str

def load_memory():
    with open(MEMORY_FILE, "r") as f:
        return json.load(f)

def save_memory(role, content):
    memory = load_memory()
    memory.append({"role": role, "content": content})
    memory = memory[-10:]
    with open(MEMORY_FILE, "w") as f:
        json.dump(memory, f)

@app.post("/chat")
def chat(chat: Chat):
    save_memory("user", chat.message)

    messages = load_memory()
    messages.insert(0, {
        "role": "system",
        "content": "You are AI Version 0.2, a helpful assistant. Reply in simple Hindi or English."
    })

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages
    )

    reply = response.choices[0].message.content
    save_memory("assistant", reply)

    return {"reply": reply}
