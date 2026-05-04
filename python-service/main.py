from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from transcribe import transcribe_audio
import shutil
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Python transcription service is running!"}

@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    tmp_path = f"./tmp_{file.filename}"
    with open(tmp_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    try:
        result = transcribe_audio(tmp_path)
    finally:
        os.remove(tmp_path)
    return result