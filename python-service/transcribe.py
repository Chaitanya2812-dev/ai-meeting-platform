import whisper

print("Loading Whisper model...")
model = whisper.load_model("base")
print("Whisper model loaded.")

def transcribe_audio(file_path: str) -> dict:
    result = model.transcribe(file_path)
    return {
        "text": result["text"],
        "segments": result["segments"]
    }