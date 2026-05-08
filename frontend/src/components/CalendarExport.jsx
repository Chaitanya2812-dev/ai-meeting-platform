import { useState } from "react";

const TYPE_META = {
  meeting:  { icon: "🤝", label: "Meeting",    color: "var(--accent)",              bg: "var(--accent-light)" },
  deadline: { icon: "⏰", label: "Deadline",   color: "var(--error, #dc2626)",      bg: "var(--error-light, #fef2f2)" },
  followup: { icon: "📌", label: "Follow-up",  color: "var(--warning, #d97706)",    bg: "var(--warning-light, #fffbeb)" },
  review:   { icon: "🔍", label: "Review",     color: "var(--success, #16a34a)",    bg: "var(--success-light, #f0fdf4)" },
};

function pad(n) { return String(n).padStart(2, "0"); }

function toICSDate(dateStr, timeStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!timeStr || timeStr === "null") {
    return `${y}${pad(m)}${pad(d)}`;
  }
  const [h, min] = timeStr.split(":").map(Number);
  return `${y}${pad(m)}${pad(d)}T${pad(h)}${pad(min)}00`;
}

function addMinutes(dateStr, timeStr, duration) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [h, min] = (timeStr && timeStr !== "null") ? timeStr.split(":").map(Number) : [0, 0];
  const dt = new Date(y, m - 1, d, h, min + (duration || 60));
  return `${dt.getFullYear()}${pad(dt.getMonth()+1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`;
}

function buildICS(events) {
  const uid = () => Math.random().toString(36).slice(2) + "@meetingai";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MeetingAI//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];
  for (const ev of events) {
    const allDay = !ev.time || ev.time === "null";
    const dtstart = allDay
      ? `DTSTART;VALUE=DATE:${toICSDate(ev.date, null)}`
      : `DTSTART:${toICSDate(ev.date, ev.time)}`;
    const dtend = allDay
      ? `DTEND;VALUE=DATE:${toICSDate(ev.date, null)}`
      : `DTEND:${addMinutes(ev.date, ev.time, ev.duration)}`;
    lines.push(
      "BEGIN:VEVENT",
      `UID:${uid()}`,
      `SUMMARY:${ev.title}`,
      dtstart,
      dtend,
      `DESCRIPTION:${(ev.description || "").replace(/\n/g, "\\n")} (from MeetingAI)`,
      `STATUS:CONFIRMED`,
      "END:VEVENT"
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

function googleCalendarUrl(ev) {
  const allDay = !ev.time || ev.time === "null";
  const dates = allDay
    ? `${toICSDate(ev.date, null)}/${toICSDate(ev.date, null)}`
    : `${toICSDate(ev.date, ev.time)}/${addMinutes(ev.date, ev.time, ev.duration)}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.title,
    dates,
    details: `${ev.description || ""}\n\nAdded via MeetingAI`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

function outlookCalendarUrl(ev) {
  const allDay = !ev.time || ev.time === "null";
  const [y, m, d] = ev.date.split("-");
  const startDate = `${y}-${pad(m)}-${pad(d)}`;
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: ev.title,
    startdt: allDay ? startDate : `${startDate}T${ev.time}:00`,
    enddt: allDay ? startDate : new Date(new Date(`${startDate}T${ev.time}:00`).getTime() + (ev.duration || 60) * 60000).toISOString().slice(0, 16),
    body: ev.description || "",
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params}`;
}

function downloadICS(events) {
  const ics = buildICS(events);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "meeting-events.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export default function CalendarExport({ events = [] }) {
  const [selected, setSelected] = useState(new Set(events.map((_, i) => i)));
  const [expanded, setExpanded] = useState(null);

  if (!events || events.length === 0) return null;

  const toggle = (i) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const selectedEvents = events.filter((_, i) => selected.has(i));

  return (
    <div className="card anim-up" style={{ padding: "20px", animationDelay: "0.2s" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg style={{ width: 16, height: 16, color: "var(--accent)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--text-primary)" }}>
            Calendar Events
          </span>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "2px 7px", borderRadius: 99, background: "var(--accent-light)", color: "var(--accent)", border: "1px solid var(--accent)" }}>
            {events.length}
          </span>
        </div>
        <button
          onClick={() => setSelected(selected.size === events.length ? new Set() : new Set(events.map((_, i) => i)))}
          style={{ fontSize: "0.73rem", color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)" }}>
          {selected.size === events.length ? "Deselect all" : "Select all"}
        </button>
      </div>

      {/* Event list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {events.map((ev, i) => {
          const meta = TYPE_META[ev.type] || TYPE_META.meeting;
          const isOpen = expanded === i;
          const isSelected = selected.has(i);

          return (
            <div key={i} style={{
              border: `1px solid ${isSelected ? "var(--accent)" : "var(--border)"}`,
              borderRadius: 10,
              background: isSelected ? "var(--accent-light)" : "var(--bg-subtle)",
              overflow: "hidden",
              transition: "all 0.15s ease",
              opacity: isSelected ? 1 : 0.6,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", cursor: "pointer" }}
                onClick={() => toggle(i)}>
                {/* Checkbox */}
                <div style={{
                  width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                  background: isSelected ? "var(--accent)" : "transparent",
                  border: `1.5px solid ${isSelected ? "var(--accent)" : "var(--border-strong)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.1s ease",
                }}>
                  {isSelected && (
                    <svg style={{ width: 11, height: 11, color: "#fff" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  )}
                </div>

                {/* Type badge */}
                <span style={{ fontSize: "0.7rem", padding: "2px 7px", borderRadius: 99, background: meta.bg, color: meta.color, border: `1px solid ${meta.color}`, fontWeight: 600, flexShrink: 0 }}>
                  {meta.icon} {meta.label}
                </span>

                {/* Title & date */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {ev.title}
                  </p>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", margin: 0, marginTop: 1 }}>
                    {ev.date}{ev.time && ev.time !== "null" ? ` · ${ev.time}` : " · All day"}
                    {ev.duration && ev.time !== "null" ? ` · ${ev.duration} min` : ""}
                  </p>
                </div>

                {/* Quick-add buttons */}
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                  <a href={googleCalendarUrl(ev)} target="_blank" rel="noreferrer"
                    title="Add to Google Calendar"
                    style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 7, background: "var(--surface)", border: "1px solid var(--border)", textDecoration: "none", fontSize: "0.75rem", transition: "all 0.15s" }}>
                    <svg style={{ width: 14, height: 14, color: "#4285F4" }} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fillOpacity=".15"/>
                      <path d="M12 6v6l4 2" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" fill="none"/>
                      <circle cx="12" cy="12" r="9.5" stroke="#4285F4" strokeWidth="1" fill="none"/>
                    </svg>
                  </a>

                  <button
                    title="Expand details"
                    onClick={() => setExpanded(isOpen ? null : i)}
                    style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 7, background: "var(--surface)", border: "1px solid var(--border)", cursor: "pointer", transition: "all 0.15s" }}>
                    <svg style={{ width: 13, height: 13, color: "var(--text-muted)", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Expanded description + calendar options */}
              {isOpen && (
                <div style={{ padding: "0 13px 13px", borderTop: "1px solid var(--border)" }}>
                  {ev.description && (
                    <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.55, margin: "10px 0 10px", fontStyle: "italic" }}>
                      "{ev.description}"
                    </p>
                  )}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <a href={googleCalendarUrl(ev)} target="_blank" rel="noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 7, background: "#4285F4", color: "#fff", fontSize: "0.78rem", fontWeight: 600, textDecoration: "none" }}>
                      <svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      Google Calendar
                    </a>
                    <a href={outlookCalendarUrl(ev)} target="_blank" rel="noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 7, background: "#0078D4", color: "#fff", fontSize: "0.78rem", fontWeight: 600, textDecoration: "none" }}>
                      <svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      Outlook
                    </a>
                    <button onClick={() => downloadICS([ev])}
                      style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 7, background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)" }}>
                      <svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      .ics file
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bulk export footer */}
      {selectedEvents.length > 0 && (
        <div style={{ display: "flex", gap: 8, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
          <button onClick={() => downloadICS(selectedEvents)} className="btn btn-primary"
            style={{ flex: 1, height: 38, fontSize: "0.8125rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <svg style={{ width: 14, height: 14 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export {selectedEvents.length} event{selectedEvents.length !== 1 ? "s" : ""} (.ics)
          </button>
        </div>
      )}
    </div>
  );
}
