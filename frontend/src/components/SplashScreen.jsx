import { useEffect, useState } from "react";

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 400);
    const t2 = setTimeout(() => setPhase("exit"), 3200);
    const t3 = setTimeout(() => onDone(), 3900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#0a0a0a",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 20,
      opacity: phase === "exit" ? 0 : 1,
      transform: phase === "exit" ? "scale(1.04)" : "scale(1)",
      transition: phase === "exit" ? "opacity 0.7s ease, transform 0.7s ease" : "none",
      pointerEvents: phase === "exit" ? "none" : "all",
    }}>

      {/* Glow blob */}
      <div style={{
        position: "absolute", width: 500, height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(45,91,227,0.3) 0%, transparent 70%)",
        filter: "blur(80px)",
        opacity: phase === "text" ? 1 : 0,
        transition: "opacity 1s ease",
        pointerEvents: "none",
      }} />

      {/* VIRUS heading */}
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(3.5rem, 12vw, 7rem)",
        fontWeight: 800,
        letterSpacing: "-0.04em",
        color: "#ffffff",
        opacity: phase === "enter" ? 0 : 1,
        transform: phase === "enter" ? "translateY(24px)" : "translateY(0)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        lineHeight: 1,
        position: "relative", zIndex: 1,
      }}>
        VI<span style={{ color: "#2d5be3" }}>RUS</span>
      </div>


      {/* Underline bar */}
      <div style={{
          width: phase === "text" ? "120px" : "0px",
          height: 2,
          background: "linear-gradient(90deg, #2d5be3, #7c9fff)",
          borderRadius: 99,
          transition: "width 0.7s ease 0.3s",
          position: "relative", zIndex: 1,
        }} />

      {/* Team avatars */}
      <div style={{
          display: "flex", alignItems: "center", gap: 28,
          opacity: phase === "text" ? 1 : 0,
          transform: phase === "text" ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
          position: "relative", zIndex: 1,
          marginTop: 8,
        }}>

        {/* Person 1 - Virus (you) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{
              width: 80, height: 80, borderRadius: "50%",
              border: "2.5px solid #2d5be3",
              overflow: "hidden",
              boxShadow: "0 0 0 4px rgba(45,91,227,0.15)",
            }}>
            <img src="/sujit.png" alt="Virus"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#ffffff", fontSize: "0.8rem", fontWeight: 700, fontFamily: "var(--font-display)", margin: 0, letterSpacing: "-0.02em" }}>Virus</p>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem", margin: "2px 0 0", fontFamily: "var(--font-body)" }}>Developer</p>
          </div>
        </div>

        {/* Connector */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: 28, height: 1.5, background: "rgba(255,255,255,0.15)", borderRadius: 99 }} />
          <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}>×</span>
          <div style={{ width: 28, height: 1.5, background: "rgba(255,255,255,0.15)", borderRadius: 99 }} />
        </div>

        {/* Person 2 - Partner */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{
              width: 80, height: 80, borderRadius: "50%",
              border: "2.5px solid #2d5be3",
              overflow: "hidden",
              boxShadow: "0 0 0 4px rgba(45,91,227,0.15)",
            }}>
            <img src="/chaitanya.png" alt="Chaitanya"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#ffffff", fontSize: "0.8rem", fontWeight: 700, fontFamily: "var(--font-display)", margin: 0, letterSpacing: "-0.02em" }}>Chaitanya</p>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem", margin: "2px 0 0", fontFamily: "var(--font-body)" }}>Developer</p>
          </div>
        </div>

      </div>
              {/* Hindi welcome */}
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.01em",
                opacity: phase === "text" ? 1 : 0,
                transform: phase === "text" ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s",
                position: "relative", zIndex: 1,
              }}>
                VIRUS, aapka swagat Karta hai 🙏
              </div>

    </div>
  );
}