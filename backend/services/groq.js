// const Groq = require('groq-sdk');
// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// async function analyzeMeeting(transcript) {
//   const response = await groq.chat.completions.create({
//     model: "llama-3.3-70b-versatile",
//     messages: [
//       {
//         role: 'system',
//         content: `You are a meeting assistant. Given a meeting transcript, return ONLY a valid JSON object with no extra text, no markdown, no backticks. Use exactly this structure:
// {
//   "summary": "2-3 sentence summary",
//   "decisions": ["decision 1", "decision 2"],
//   "tasks": [
//     { "task": "task description", "assignee": "person name or Unknown", "deadline": "deadline or Not specified" }
//   ]
// }`
//       },
//       {
//         role: 'user',
//         content: `Transcript:\n\n${transcript}`
//       }
//     ]
//   });

//   const raw = response.choices[0].message.content;
//   const jsonMatch = raw.match(/\{[\s\S]*\}/);
//   if (!jsonMatch) throw new Error('Groq did not return valid JSON');
//   return JSON.parse(jsonMatch[0]);
// }

// async function chatWithMeeting(transcript, userQuestion) {
//   const response = await groq.chat.completions.create({
//     model: "llama-3.3-70b-versatile",
//     messages: [
//       {
//         role: 'system',
//         content: `You are a helpful assistant. Answer questions based only on this meeting transcript. Be concise.\n\nTranscript:\n${transcript}`
//       },
//       {
//         role: 'user',
//         content: userQuestion
//       }
//     ]
//   });

//   return response.choices[0].message.content;
// }

// module.exports = { analyzeMeeting, chatWithMeeting };

// ---------------------------------------------------------------------


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

async function extractCalendarEvents(transcript) {
  const today = new Date().toISOString().split('T')[0];
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: 'system',
        content: `You are a calendar assistant. Extract all meetings, deadlines, follow-ups, and scheduled events from the transcript.
Today's date is ${today}. Use this to resolve relative dates like "next Monday", "this Friday", "tomorrow".
Return ONLY a valid JSON array with no extra text, no markdown, no backticks:
[
  {
    "title": "Short event title",
    "date": "YYYY-MM-DD",
    "time": "HH:MM or null if not mentioned",
    "duration": "duration in minutes or 60 if not mentioned",
    "description": "brief context from the meeting",
    "type": "meeting | deadline | followup | review"
  }
]
If no events found, return [].`
      },
      {
        role: 'user',
        content: `Transcript:\n\n${transcript}`
      }
    ]
  });

  const raw = response.choices[0].message.content;
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) return [];
  try {
    return JSON.parse(jsonMatch[0]);
  } catch {
    return [];
  }
}

module.exports = { analyzeMeeting, chatWithMeeting, extractCalendarEvents };