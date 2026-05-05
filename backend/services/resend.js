const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendMeetingSummary({ toEmail, meetingTitle, summary, decisions, tasks }) {
  const taskRows = tasks.map(t => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;">${t.task}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;">${t.assignee}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;">${t.deadline}</td>
    </tr>
  `).join('');

  const decisionList = decisions.map(d => `<li style="margin-bottom:6px;">${d}</li>`).join('');

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px 20px;">
      <h1 style="font-size:22px;font-weight:700;margin-bottom:4px;">Meeting Summary</h1>
      <p style="color:#888;font-size:13px;margin-bottom:28px;">${meetingTitle}</p>

      <h2 style="font-size:15px;font-weight:600;color:#555;text-transform:uppercase;letter-spacing:.05em;">Summary</h2>
      <p style="font-size:15px;color:#333;line-height:1.7;margin-bottom:24px;">${summary}</p>

      <h2 style="font-size:15px;font-weight:600;color:#555;text-transform:uppercase;letter-spacing:.05em;">Key Decisions</h2>
      <ul style="font-size:14px;color:#333;line-height:1.8;margin-bottom:24px;">
        ${decisionList}
      </ul>

      <h2 style="font-size:15px;font-weight:600;color:#555;text-transform:uppercase;letter-spacing:.05em;">Action Items</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:32px;">
        <thead>
          <tr style="background:#f4f4f4;">
            <th style="padding:8px 12px;text-align:left;">Task</th>
            <th style="padding:8px 12px;text-align:left;">Assignee</th>
            <th style="padding:8px 12px;text-align:left;">Deadline</th>
          </tr>
        </thead>
        <tbody>
          ${taskRows}
        </tbody>
      </table>

      <p style="font-size:12px;color:#bbb;text-align:center;">Sent via MeetingAI — AI powered meeting summarizer</p>
    </div>
  `;

  const result = await resend.emails.send({
    from: 'MeetingAI <onboarding@resend.dev>',
    to: toEmail,
    subject: `Meeting Summary — ${meetingTitle}`,
    html
  });

  return result;
}

module.exports = { sendMeetingSummary };