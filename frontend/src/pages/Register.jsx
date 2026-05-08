import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "var(--font-body)" }}>

      {/* ── Left Panel – branding ── */}
      <div style={{
        width: "45%", background: "linear-gradient(135deg,#5b3ff8 0%,#7c3aed 50%,#4f46e5 100%)",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "48px", position: "relative", overflow: "hidden",
      }} className="hidden lg:flex">

        {/* decorative blobs */}
        <div style={{ position:"absolute", top:-80, right:-80, width:300, height:300, borderRadius:"50%", background:"rgba(255,255,255,0.07)" }} />
        <div style={{ position:"absolute", bottom:-60, left:-60, width:240, height:240, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }} />
        <div style={{ position:"absolute", top:"40%", right:40, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.06)" }} />

        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:12, position:"relative" }}>
          <div style={{ width:40, height:40, background:"rgba(255,255,255,0.2)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(8px)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" x2="12" y1="19" y2="22"/>
            </svg>
          </div>
          <span style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"1.2rem", color:"white", letterSpacing:"-0.03em" }}>MeetingAI</span>
        </div>

        {/* Center text */}
        <div style={{ position:"relative" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)", borderRadius:100, padding:"6px 16px", marginBottom:24 }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:"#4ade80", display:"inline-block" }} />
            <span style={{ fontSize:"0.8rem", color:"rgba(255,255,255,0.9)", fontWeight:500 }}>Free — No credit card needed</span>
          </div>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"2.4rem", fontWeight:800, color:"white", lineHeight:1.1, marginBottom:16, letterSpacing:"-0.04em" }}>
            Start capturing<br />meeting intelligence
          </h2>
          <p style={{ fontSize:"1rem", color:"rgba(255,255,255,0.75)", lineHeight:1.7, maxWidth:340 }}>
            Join and never miss an action item, decision, or key insight from your meetings again.
          </p>

          {/* Steps */}
          <div style={{ display:"flex", flexDirection:"column", gap:16, marginTop:36 }}>
            {[
              { icon:"🎙️", title:"Upload your meeting", desc:"MP3, WAV, MP4, WebM and more" },
              { icon:"🤖", title:"AI analyzes instantly", desc:"Groq Whisper + Llama3 processes in seconds" },
              { icon:"✅", title:"Get insights & export", desc:"Summary, tasks, chat & email export" },
            ].map(s => (
              <div key={s.title} style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                <span style={{ fontSize:"1.3rem", lineHeight:1 }}>{s.icon}</span>
                <div>
                  <p style={{ color:"white", fontWeight:600, fontSize:"0.9rem", marginBottom:2 }}>{s.title}</p>
                  <p style={{ color:"rgba(255,255,255,0.6)", fontSize:"0.8rem" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ position:"relative", fontSize:"0.82rem", color:"rgba(255,255,255,0.5)", fontStyle:"italic" }}>
          "Built for students, teams, and professionals."
        </p>
      </div>

      {/* ── Right Panel – form ── */}
      <div style={{
        flex:1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",
        background:"var(--bg)", padding:"48px 24px",
      }}>
        {/* Mobile logo */}
        <div className="lg:hidden" style={{ display:"flex", alignItems:"center", gap:10, marginBottom:40 }}>
          <div style={{ width:36, height:36, background:"var(--accent)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" x2="12" y1="19" y2="22"/>
            </svg>
          </div>
          <span style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"1.1rem", color:"var(--text-primary)" }}>MeetingAI</span>
        </div>

        <div style={{ width:"100%", maxWidth:400 }} className="anim-up">
          <div style={{ marginBottom:32 }}>
            <h1 style={{ fontFamily:"var(--font-display)", fontSize:"1.75rem", fontWeight:800, color:"var(--text-primary)", marginBottom:8, letterSpacing:"-0.03em" }}>
              Create your account
            </h1>
            <p style={{ color:"var(--text-secondary)", fontSize:"0.9rem" }}>Get started with AI meeting notes — free</p>
          </div>

          <div className="card" style={{ padding:32 }}>
            {error && (
              <div style={{ background:"var(--error-light)", border:"1px solid var(--error)", borderRadius:10, padding:"10px 14px", marginBottom:20, fontSize:"0.82rem", color:"var(--error)", display:"flex", alignItems:"center", gap:8 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:18 }}>
              <div>
                <label style={{ display:"block", fontSize:"0.8125rem", fontWeight:600, color:"var(--text-secondary)", marginBottom:7 }}>Full name</label>
                <input className="input" type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" />
              </div>
              <div>
                <label style={{ display:"block", fontSize:"0.8125rem", fontWeight:600, color:"var(--text-secondary)", marginBottom:7 }}>Email address</label>
                <input className="input" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div>
                <label style={{ display:"block", fontSize:"0.8125rem", fontWeight:600, color:"var(--text-secondary)", marginBottom:7 }}>Password</label>
                <div style={{ position:"relative" }}>
                  <input className="input" type={showPass ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" minLength={6} style={{ paddingRight:42 }} />
                  <button type="button" onClick={() => setShowPass(p => !p)}
                    style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"var(--text-muted)", padding:0 }}>
                    {showPass
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" x2="23" y1="1" y2="23"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary" style={{ width:"100%", height:44, fontSize:"0.9rem", marginTop:4, borderRadius:12 }}>
                {loading
                  ? <span style={{ display:"flex", alignItems:"center", gap:8 }}><span className="spinner" />Creating account...</span>
                  : "Create account"
                }
              </button>
            </form>
          </div>

          <p style={{ textAlign:"center", fontSize:"0.85rem", color:"var(--text-muted)", marginTop:20 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color:"var(--accent)", fontWeight:600, textDecoration:"none" }}>Sign in</Link>
          </p>
        </div>

        {/* Footer */}
        <div style={{ marginTop:48, textAlign:"center" }}>
          <p style={{ fontSize:"0.78rem", color:"var(--text-muted)", marginBottom:8 }}>Built by</p>
          <div style={{ display:"flex", alignItems:"center", gap:16, justifyContent:"center" }}>
            <a href="https://www.linkedin.com/in/chaitanya-naik-82b44a2b8" target="_blank" rel="noreferrer"
              style={{ display:"flex", alignItems:"center", gap:6, color:"var(--text-secondary)", textDecoration:"none", fontSize:"0.82rem", fontWeight:500, transition:"color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.color="var(--accent)"}
              onMouseLeave={e => e.currentTarget.style.color="var(--text-secondary)"}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              Chaitanya Naik
            </a>
            <span style={{ color:"var(--border-strong)" }}>·</span>
            <a href="https://www.linkedin.com/in/kalesujit/" target="_blank" rel="noreferrer"
              style={{ display:"flex", alignItems:"center", gap:6, color:"var(--text-secondary)", textDecoration:"none", fontSize:"0.82rem", fontWeight:500, transition:"color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.color="var(--accent)"}
              onMouseLeave={e => e.currentTarget.style.color="var(--text-secondary)"}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              Sujit Kale
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
