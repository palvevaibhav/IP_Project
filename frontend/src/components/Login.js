import { useState } from "react";

// ─── Demo credentials ─────────────────────────────────────────────────────────
const VALID_USERS = [
  { username: "admin",    password: "admin123",    role: "Administrator" },
  { username: "netops",   password: "netops123",   role: "Network Operator" },
  { username: "readonly", password: "readonly123", role: "Read-Only Viewer" },
];

// ─── Animated grid background ─────────────────────────────────────────────────
function GridBg() {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18, pointerEvents: "none" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e3a5f" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

// ─── Topology decoration ──────────────────────────────────────────────────────
function TopoDeco() {
  const nodes = [
    { x: 120, y: 200, r: 18, c: "#ff6b35", label: "RTR" },
    { x: 280, y: 130, r: 14, c: "#00d4aa", label: "SW"  },
    { x: 430, y: 240, r: 16, c: "#a78bfa", label: "SRV" },
    { x: 220, y: 320, r: 12, c: "#4a9eff", label: "DC"  },
    { x: 370, y: 150, r: 10, c: "#22d3ee", label: "AP"  },
    { x: 500, y: 180, r: 14, c: "#ef4444", label: "FW"  },
    { x: 80,  y: 360, r: 11, c: "#94a3b8", label: "PC"  },
    { x: 460, y: 340, r: 13, c: "#f59e0b", label: "AWS" },
  ];
  const edges = [
    [0,1],[1,4],[1,2],[2,5],[0,3],[3,1],[2,7],[5,2],[0,6],
  ];
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.22 }}>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="#1e3a5f" strokeWidth="1"
          strokeDasharray="5,4"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} opacity={0.15} />
          <circle cx={n.x} cy={n.y} r={n.r} fill="none" stroke={n.c} strokeWidth="0.8" />
          <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle"
            fontSize="7" fontFamily="monospace" fill={n.c} opacity={0.8}>
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ─── LoginPage ────────────────────────────────────────────────────────────────
export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    const user = VALID_USERS.find(
      u => u.username === username.trim() && u.password === password
    );

    if (user) {
      onLogin({ username: user.username, role: user.role });
    } else {
      setError("Invalid username or password.");
    }
    setLoading(false);
  };

  const fillDemo = (u, p) => { setUsername(u); setPassword(p); setError(""); };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#030712",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <GridBg />
      <TopoDeco />

      {/* Card */}
      <div style={{
        position: "relative",
        zIndex: 10,
        width: 380,
        background: "#070e1a",
        border: "0.5px solid #1e293b",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 0 60px rgba(74,158,255,0.06), 0 24px 48px rgba(0,0,0,0.5)",
      }}>

        {/* Top accent bar */}
        <div style={{ height: 3, background: "linear-gradient(90deg,#4a9eff,#00d4aa,#a78bfa)", opacity: 0.7 }} />

        {/* Header */}
        <div style={{ padding: "28px 30px 20px", borderBottom: "0.5px solid #1e293b", textAlign: "center" }}>
          <div style={{ fontSize: 26, marginBottom: 4 }}>⬡</div>
          <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "monospace", color: "#e2e8f0", letterSpacing: "0.08em" }}>
            NETMAP
          </div>
          <div style={{ fontSize: 10, fontFamily: "monospace", color: "#334155", marginTop: 3 }}>
            Visual Topology Mapping Platform
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "24px 30px 20px" }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 9, fontFamily: "monospace", color: "#475569", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              required
              style={{
                width: "100%",
                background: "#0b1629",
                border: `0.5px solid ${error ? "#ef4444" : "#1e293b"}`,
                borderRadius: 5,
                padding: "9px 12px",
                fontSize: 11,
                fontFamily: "monospace",
                color: "#e2e8f0",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={e => { e.target.style.borderColor = "#4a9eff"; }}
              onBlur={e  => { e.target.style.borderColor = error ? "#ef4444" : "#1e293b"; }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 9, fontFamily: "monospace", color: "#475569", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
                style={{
                  width: "100%",
                  background: "#0b1629",
                  border: `0.5px solid ${error ? "#ef4444" : "#1e293b"}`,
                  borderRadius: 5,
                  padding: "9px 36px 9px 12px",
                  fontSize: 11,
                  fontFamily: "monospace",
                  color: "#e2e8f0",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
                onFocus={e => { e.target.style.borderColor = "#4a9eff"; }}
                onBlur={e  => { e.target.style.borderColor = error ? "#ef4444" : "#1e293b"; }}
              />
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                style={{
                  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 13, color: "#334155", padding: 0,
                }}
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: "rgba(239,68,68,0.08)",
              border: "0.5px solid rgba(239,68,68,0.3)",
              borderRadius: 4,
              padding: "7px 10px",
              marginBottom: 14,
              fontSize: 9,
              fontFamily: "monospace",
              color: "#ef4444",
            }}>
              ⚠ {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "#0b1629" : "rgba(74,158,255,0.12)",
              border: "0.5px solid " + (loading ? "#1e293b" : "#1e3a5f"),
              borderRadius: 5,
              padding: "10px",
              fontSize: 11,
              fontFamily: "monospace",
              fontWeight: 700,
              color: loading ? "#334155" : "#4a9eff",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.06em",
              transition: "all 0.15s",
            }}
          >
            {loading ? "AUTHENTICATING..." : "→ SIGN IN"}
          </button>
        </form>

        {/* Demo credentials */}
        <div style={{ padding: "0 30px 24px" }}>
          <div style={{ fontSize: 8, fontFamily: "monospace", color: "#1e293b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, textAlign: "center" }}>
            Demo Accounts
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {VALID_USERS.map(u => (
              <button
                key={u.username}
                type="button"
                onClick={() => fillDemo(u.username, u.password)}
                style={{
                  background: "#0a1628",
                  border: "0.5px solid #1e293b",
                  borderRadius: 4,
                  padding: "5px 10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 9, fontFamily: "monospace", color: "#64748b" }}>{u.username}</span>
                <span style={{ fontSize: 8, fontFamily: "monospace", color: "#334155" }}>{u.role}</span>
              </button>
            ))}
          </div>
          <div style={{ fontSize: 7, fontFamily: "monospace", color: "#1e293b", marginTop: 10, textAlign: "center" }}>
            Click a demo account to autofill credentials
          </div>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: "0.5px solid #1e293b",
          padding: "8px 30px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 7,
          fontFamily: "monospace",
          color: "#1e293b",
        }}>
          <span>© 2026 NetMap Systems</span>
          <span>v2.4.1</span>
        </div>
      </div>
    </div>
  );
}