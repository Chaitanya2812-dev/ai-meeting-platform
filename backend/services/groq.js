const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function analyzeMeeting(transcript) {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: 'system',
        content: `You are a meeting assistant. Given a meeting transcript, return ONLY a valid JSON object with no extra text, no markdown, no backticks. Use exactly this structure:
{
  "summary": "2-3 sentence summary",
  "decisions": ["decision 1", "decision 2"],
  "tasks": [
    { "task": "task description", "assignee": "person name or Unknown", "deadline": "deadline or Not specified" }
  ]
}`
      },
      {
        role: 'user',
        content: `Transcript:\n\n${transcript}`
      }
    ]
  });

  const raw = response.choices[0].message.content;
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Groq did not return valid JSON');
  return JSON.parse(jsonMatch[0]);
}

async function chatWithMeeting(transcript, userQuestion) {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: 'system',
        content: `You are a helpful assistant. Answer questions based only on this meeting transcript. Be concise.\n\nTranscript:\n${transcript}`
      },
      {
        role: 'user',
        content: userQuestion
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = { analyzeMeeting, chatWithMeeting };