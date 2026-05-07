const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const fs = require('fs');

async function transcribeAudio(filePath, language = 'en') {  // ADD language param
  const transcription = await groq.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    model: 'whisper-large-v3',
    response_format: 'verbose_json',
    language: language,  // ADD THIS LINE
  });

  return {
    text: transcription.text,
    segments: transcription.segments || []
  };
}

module.exports = { transcribeAudio };