import { useState, useCallback } from "react";

const NODE_TYPES = {
  cloud: { icon: "☁", color: "#4a9eff" },
  router: { icon: "⬡", color: "#ff6b35" },
  switch: { icon: "◈", color: "#00d4aa" },
  server: { icon: "▣", color: "#a78bfa" },
  firewall: { icon: "⬟", color: "#ef4444" },
  pc: { icon: "□", color: "#94a3b8" },
  aws: { icon: "⬡", color: "#ff9900" },
  k8s: { icon: "⎔", color: "#326ce5" },
  phone: { icon: "◯", color: "#94a3b8" },
  printer: { icon: "▦", color: "#94a3b8" },
  ap: { icon: "◉", color: "#22d3ee" },
  transit: { icon: "⬡", color: "#ff9900" },
};

const initialNodes = {
  internet: { id: "internet", label: "INTERNET", type: "cloud", ip: "", x: 310, y: 30, status: "up" },
  isp1: { id: "isp1", label: "ISP-1", type: "router", ip: "203.0.113.1", x: 220, y: 130, status: "warning" },
  fw01: { id: "fw01", label: "FW-01", type: "firewall", ip: "203.0.113.2", x: 220, y: 220, status: "up" },
  "core-rtr1": { id: "core-rtr1", label: "CORE-RTR-1", type: "router", ip: "10.0.0.1", x: 420, y: 105, status: "up" },
  "core-rtr2": { id: "core-rtr2", label: "CORE-RTR-2", type: "router", ip: "10.0.0.2", x: 560, y: 105, status: "up" },
  "dc-sw1": { id: "dc-sw1", label: "DC-SW-1", type: "switch", ip: "10.0.1.1", x: 420, y: 190, status: "up" },
  "dc-sw2": { id: "dc-sw2", label: "DC-SW-2", type: "switch", ip: "10.0.1.2", x: 560, y: 190, status: "up" },
  "app-srv1": { id: "app-srv1", label: "APP-SRV-01", type: "server", ip: "10.0.10.11", x: 390, y: 280, status: "up" },
  "app-srv2": { id: "app-srv2", label: "APP-SRV-02", type: "server", ip: "10.0.10.12", x: 490, y: 280, status: "up" },
  "db-srv1": { id: "db-srv1", label: "DB-SRV-01", type: "server", ip: "10.0.20.19", x: 590, y: 280, status: "up" },
  "web-cluster": { id: "web-cluster", label: "Web Cluster", type: "server", ip: "10.10.10.0/24", x: 680, y: 140, status: "up" },
  "app-cluster": { id: "app-cluster", label: "App Cluster", type: "server", ip: "10.10.20.0/24", x: 680, y: 175, status: "up" },
  "db-cluster": { id: "db-cluster", label: "DB Cluster", type: "server", ip: "10.30.0.0/24", x: 680, y: 210, status: "warning" },
  "dist-sw1": { id: "dist-sw1", label: "DIST-SW-1", type: "switch", ip: "10.1.1.1", x: 95, y: 310, status: "up" },
  "dist-sw2": { id: "dist-sw2", label: "DIST-SW-2", type: "switch", ip: "10.1.1.2", x: 185, y: 310, status: "up" },
  "acc-sw1": { id: "acc-sw1", label: "ACCESS-SW-1", type: "switch", ip: "10.1.10.1", x: 60, y: 390, status: "up" },
  "acc-sw2": { id: "acc-sw2", label: "ACCESS-SW-2", type: "switch", ip: "10.1.10.2", x: 185, y: 390, status: "up" },
  pc001: { id: "pc001", label: "PC-001", type: "pc", ip: "10.1.10.101", x: 20, y: 460, status: "up" },
  pc002: { id: "pc002", label: "PC-002", type: "pc", ip: "10.1.10.102", x: 65, y: 460, status: "up" },
  phone: { id: "phone", label: "IP-Phone", type: "phone", ip: "10.1.10.150", x: 115, y: 460, status: "up" },
  printer: { id: "printer", label: "Printer", type: "printer", ip: "10.1.15.200", x: 165, y: 460, status: "down" },
  ap01: { id: "ap01", label: "AP-01", type: "ap", ip: "10.1.10.50", x: 210, y: 460, status: "up" },
  "br-rtr1": { id: "br-rtr1", label: "BR-RTR-1", type: "router", ip: "10.20.1.1", x: 480, y: 320, status: "up" },
  "br-sw1": { id: "br-sw1", label: "BR-SW-1", type: "switch", ip: "10.2.1.1", x: 480, y: 390, status: "up" },
  "br-pc1": { id: "br-pc1", label: "PC-101", type: "pc", ip: "10.2.10.101", x: 430, y: 460, status: "up" },
  "br-pc2": { id: "br-pc2", label: "PC-102", type: "pc", ip: "10.2.10.102", x: 480, y: 460, status: "up" },
  "br-printer": { id: "br-printer", label: "Printer", type: "printer", ip: "10.2.15.200", x: 530, y: 460, status: "up" },
  aws: { id: "aws", label: "AWS", type: "aws", ip: "", x: 660, y: 295, status: "up" },
  transit: { id: "transit", label: "Transit Gateway", type: "transit", ip: "", x: 730, y: 350, status: "up" },
  vpc: { id: "vpc", label: "VPC", type: "cloud", ip: "10.100.0.0/16", x: 690, y: 390, status: "up" },
  "node1": { id: "node1", label: "Node-1", type: "k8s", ip: "10.200.1.1", x: 605, y: 455, status: "up" },
  "node2": { id: "node2", label: "Node-2", type: "k8s", ip: "10.200.1.2", x: 660, y: 455, status: "up" },
  services: { id: "services", label: "Services", type: "k8s", ip: "10.200.0.0/16", x: 720, y: 455, status: "up" },
};

const links = [
  { from: "internet", to: "isp1", type: "wan" },
  { from: "internet", to: "core-rtr1", type: "100g" },
  { from: "isp1", to: "fw01", type: "1g" },
  { from: "fw01", to: "dc-sw1", type: "1g" },
  { from: "core-rtr1", to: "core-rtr2", type: "100g" },
  { from: "core-rtr1", to: "dc-sw1", type: "10g" },
  { from: "core-rtr2", to: "dc-sw2", type: "10g" },
  { from: "dc-sw1", to: "dc-sw2", type: "10g" },
  { from: "dc-sw1", to: "app-srv1", type: "1g" },
  { from: "dc-sw1", to: "app-srv2", type: "1g" },
  { from: "dc-sw2", to: "db-srv1", type: "1g" },
  { from: "dc-sw2", to: "web-cluster", type: "10g" },
  { from: "dc-sw2", to: "app-cluster", type: "10g" },
  { from: "dc-sw2", to: "db-cluster", type: "10g" },
  { from: "fw01", to: "dist-sw1", type: "1g" },
  { from: "dist-sw1", to: "dist-sw2", type: "1g" },
  { from: "dist-sw1", to: "acc-sw1", type: "1g" },
  { from: "dist-sw2", to: "acc-sw2", type: "1g" },
  { from: "acc-sw1", to: "pc001", type: "1g" },
  { from: "acc-sw1", to: "pc002", type: "1g" },
  { from: "acc-sw1", to: "phone", type: "1g" },
  { from: "acc-sw2", to: "printer", type: "1g" },
  { from: "acc-sw2", to: "ap01", type: "1g" },
  { from: "core-rtr2", to: "br-rtr1", type: "wan" },
  { from: "br-rtr1", to: "br-sw1", type: "1g" },
  { from: "br-sw1", to: "br-pc1", type: "1g" },
  { from: "br-sw1", to: "br-pc2", type: "1g" },
  { from: "br-sw1", to: "br-printer", type: "1g" },
  { from: "aws", to: "transit", type: "cloud" },
  { from: "transit", to: "vpc", type: "cloud" },
  { from: "vpc", to: "node1", type: "cloud" },
  { from: "vpc", to: "node2", type: "cloud" },
  { from: "vpc", to: "services", type: "cloud" },
  { from: "br-rtr1", to: "aws", type: "cloud" },
];

const ALERTS = [
  { msg: "FW-01 High CPU Usage", time: "2m ago", sev: "warn" },
  { msg: "Link Down: BR-RTR-1 Gi0/1", time: "1m ago", sev: "err" },
  { msg: "High Memory: APP-SRV-02", time: "5m ago", sev: "warn" },
  { msg: "Packet Loss: ISP-1", time: "15m ago", sev: "err" },
];

const JOBS = [
  { name: "Daily Network Scan", status: "Completed" },
  { name: "DC Topology Scan", status: "Completed" },
  { name: "AWS Discovery", status: "Running" },
  { name: "Branch Office Scan", status: "Scheduled" },
];

const LINK_COLORS = { "100g": "#00d4aa", "10g": "#4a9eff", "1g": "#475569", wan: "#f59e0b", cloud: "#8b5cf6" };
const STATUS_COLOR = { up: "#22c55e", warning: "#f59e0b", down: "#ef4444", unknown: "#64748b" };
const JOB_COLOR = { Completed: "#22c55e", Running: "#4a9eff", Scheduled: "#64748b" };

const SECTIONS = ["Dashboard", "All Devices", "IP Ranges", "Discovery Jobs"];
const TOPO_VIEWS = ["Topology Map", "Layer 2 Map", "Layer 3 Map", "Logical Topology", "Application Topology"];
const MON_VIEWS = ["Alerts", "Events", "Performance"];
const INV_VIEWS = ["Devices", "Interfaces", "Software", "Services"];
const SETTINGS_VIEWS = ["Credentials", "Policies", "Integrations"];

function NodeBox({ node, selected, onClick }) {
  const nt = NODE_TYPES[node.type] || NODE_TYPES.pc;
  const isSmall = ["pc", "phone", "printer"].includes(node.type);
  const w = isSmall ? 52 : 80;
  const h = isSmall ? 36 : 46;
  const sc = STATUS_COLOR[node.status];

  return (
    <g
      transform={`translate(${node.x},${node.y})`}
      style={{ cursor: "pointer" }}
      onClick={() => onClick(node)}
    >
      <rect
        x={-w / 2} y={-h / 2} width={w} height={h} rx={5}
        fill={selected ? "#1e3a5f" : "#0f172a"}
        stroke={selected ? "#4a9eff" : nt.color}
        strokeWidth={selected ? 1.5 : 0.7}
        opacity={0.95}
      />
      <circle cx={w / 2 - 6} cy={-h / 2 + 6} r={3} fill={sc} />
      <text
        x={0} y={isSmall ? -6 : -8}
        textAnchor="middle" dominantBaseline="middle"
        fontSize={isSmall ? 13 : 15} fill={nt.color}
      >{nt.icon}</text>
      <text
        x={0} y={isSmall ? 10 : 12}
        textAnchor="middle" dominantBaseline="middle"
        fontSize={isSmall ? 7 : 8}
        fontFamily="'JetBrains Mono', monospace"
        fill="#94a3b8"
      >{node.label}</text>
      {node.ip && !isSmall && (
        <text
          x={0} y={22}
          textAnchor="middle" dominantBaseline="middle"
          fontSize={6.5}
          fontFamily="'JetBrains Mono', monospace"
          fill="#475569"
        >{node.ip}</text>
      )}
    </g>
  );
}

function TopologyCanvas({ nodes, selected, onSelect }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(null);
  const [zoom, setZoom] = useState(0.98);

  const handleMouseDown = (e) => {
    if (e.target.tagName === "svg" || e.target.tagName === "rect" && !e.target.closest("g[data-node]")) {
      setDragging({ startX: e.clientX - offset.x, startY: e.clientY - offset.y });
    }
  };
  const handleMouseMove = useCallback((e) => {
    if (!dragging) return;
    setOffset({ x: e.clientX - dragging.startX, y: e.clientY - dragging.startY });
  }, [dragging]);
  const handleMouseUp = () => setDragging(null);
  const handleWheel = (e) => {
    e.preventDefault();
    setZoom(z => Math.max(0.4, Math.min(2.5, z - e.deltaY * 0.001)));
  };

  const getPos = (id) => {
    const n = nodes[id];
    return n ? { x: n.x, y: n.y } : { x: 0, y: 0 };
  };

  return (
    <div style={{ flex: 1, background: "#030712", overflow: "hidden", position: "relative" }}>
      {/* Legend */}
      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 10, display: "flex", gap: 12, background: "rgba(15,23,42,0.9)", border: "0.5px solid #1e293b", borderRadius: 6, padding: "6px 12px", fontSize: 10, fontFamily: "monospace", color: "#64748b" }}>
        {Object.entries(LINK_COLORS).map(([k, v]) => (
          <span key={k} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ display: "inline-block", width: 18, height: 2, background: v, borderRadius: 1 }} />
            {k.toUpperCase()}
          </span>
        ))}
      </div>
      {/* Status Legend */}
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10, display: "flex", gap: 10, background: "rgba(15,23,42,0.9)", border: "0.5px solid #1e293b", borderRadius: 6, padding: "6px 12px", fontSize: 10, fontFamily: "monospace", color: "#64748b" }}>
        {Object.entries(STATUS_COLOR).map(([k, v]) => (
          <span key={k} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: v }} />
            {k.charAt(0).toUpperCase() + k.slice(1)}
          </span>
        ))}
      </div>
      <svg
        width="100%" height="100%"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ cursor: dragging ? "grabbing" : "grab" }}
      >
        <g transform={`translate(${offset.x + 20}, ${offset.y + 50}) scale(${zoom})`}>
          {/* Background zones */}
          <rect x={360} y={60} width={370} height={260} rx={8} fill="none" stroke="#1e3a5f" strokeWidth={0.8} strokeDasharray="6,4" />
          <text x={370} y={56} fontSize={9} fill="#334155" fontFamily="monospace">DATA CENTER</text>
          <rect x={0} y={270} width={260} height={230} rx={8} fill="none" stroke="#14532d" strokeWidth={0.8} strokeDasharray="6,4" />
          <text x={10} y={266} fontSize={9} fill="#166534" fontFamily="monospace">OFFICE NETWORK</text>
          <rect x={380} y={285} width={200} height={200} rx={8} fill="none" stroke="#3b1d7a" strokeWidth={0.8} strokeDasharray="6,4" />
          <text x={390} y={281} fontSize={9} fill="#4c1d95" fontFamily="monospace">BRANCH OFFICE</text>
          <rect x={600} y={270} width={180} height={230} rx={8} fill="none" stroke="#4d2600" strokeWidth={0.8} strokeDasharray="6,4" />
          <text x={610} y={266} fontSize={9} fill="#92400e" fontFamily="monospace">CLOUD ENVIRONMENT</text>
          <rect x={580} y={420} width={180} height={75} rx={6} fill="none" stroke="#1e3a5f" strokeWidth={0.8} strokeDasharray="6,4" />
          <text x={590} y={416} fontSize={9} fill="#1e3a5f" fontFamily="monospace">KUBERNETES CLUSTER</text>
          <rect x={630} y={120} width={110} height={120} rx={6} fill="none" stroke="#2e1065" strokeWidth={0.8} strokeDasharray="4,4" />
          <text x={640} y={116} fontSize={9} fill="#4c1d95" fontFamily="monospace">SERVERS</text>

          {/* Links */}
          {links.map((lk, i) => {
            const a = getPos(lk.from), b = getPos(lk.to);
            const c = LINK_COLORS[lk.type] || "#475569";
            const dashed = lk.type === "wan" || lk.type === "cloud";
            return (
              <line
                key={i}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={c} strokeWidth={lk.type === "100g" ? 1.5 : 0.8}
                strokeDasharray={dashed ? "5,4" : undefined}
                opacity={0.65}
              />
            );
          })}
          {/* Nodes */}
          {Object.values(nodes).map(node => (
            <NodeBox
              key={node.id}
              node={node}
              selected={selected?.id === node.id}
              onClick={onSelect}
            />
          ))}
        </g>
      </svg>
      <div style={{ position: "absolute", bottom: 10, right: 10, display: "flex", gap: 4 }}>
        {["−", "○", "+"].map((b, i) => (
          <button key={i} onClick={() => {
            if (i === 0) setZoom(z => Math.max(0.4, z - 0.15));
            if (i === 1) { setZoom(0.98); setOffset({ x: 0, y: 0 }); }
            if (i === 2) setZoom(z => Math.min(2.5, z + 0.15));
          }} style={{ width: 26, height: 26, background: "#0f172a", border: "0.5px solid #1e293b", borderRadius: 4, color: "#64748b", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {b}
          </button>
        ))}
        <span style={{ background: "#0f172a", border: "0.5px solid #1e293b", borderRadius: 4, padding: "3px 8px", color: "#475569", fontSize: 10, fontFamily: "monospace", display: "flex", alignItems: "center" }}>
          {Math.round(zoom * 100)}%
        </span>
      </div>
    </div>
  );
}

function NodeDetails({ node }) {
  if (!node) return (
    <div style={{ padding: 16, color: "#334155", fontSize: 11, fontFamily: "monospace", textAlign: "center", marginTop: 40 }}>
      Click a node to view details
    </div>
  );
  const nt = NODE_TYPES[node.type] || NODE_TYPES.pc;
  const sc = STATUS_COLOR[node.status];
  const details = {
    "IP Address": node.ip || "—",
    "Vendor": node.type === "router" ? "Cisco" : node.type === "switch" ? "Arista" : node.type === "server" ? "Dell" : "—",
    "Model": node.type === "router" ? "ISR 4401" : node.type === "switch" ? "DCS-7050" : "—",
    "OS Version": node.type === "router" ? "IOS XE 17.3.1" : node.type === "switch" ? "EOS 4.27" : "—",
    "Uptime": "154d 4h 32m",
    "Role": node.type === "router" ? "Core Router" : node.type === "firewall" ? "Edge FW" : "Network",
    "Interfaces": "12",
    "Last Discovery": "2 mins ago",
  };
  return (
    <div style={{ padding: "10px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 20, color: nt.color }}>{nt.icon}</span>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{node.label}</div>
          <span style={{ background: sc + "22", border: `0.5px solid ${sc}`, borderRadius: 3, padding: "1px 6px", fontSize: 9, fontFamily: "monospace", color: sc }}>
            ● {node.status.toUpperCase()}
          </span>
        </div>
      </div>
      <div style={{ borderTop: "0.5px solid #1e293b", paddingTop: 10 }}>
        {Object.entries(details).map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, gap: 8 }}>
            <span style={{ fontSize: 9, fontFamily: "monospace", color: "#475569" }}>{k}</span>
            <span style={{ fontSize: 9, fontFamily: "monospace", color: "#94a3b8", textAlign: "right" }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sidebar({ active, setActive }) {
  const Section = ({ title, items, icon }) => (
    <div style={{ marginBottom: 8 }}>
      <div style={{ padding: "4px 10px", fontSize: 8, fontFamily: "monospace", color: "#334155", letterSpacing: "0.1em", textTransform: "uppercase" }}>{title}</div>
      {items.map(item => (
        <div key={item} onClick={() => setActive(item)}
          style={{ padding: "5px 14px", fontSize: 10, fontFamily: "monospace", cursor: "pointer", color: active === item ? "#4a9eff" : "#64748b", background: active === item ? "rgba(74,158,255,0.08)" : "transparent", borderLeft: active === item ? "2px solid #4a9eff" : "2px solid transparent", transition: "all 0.15s" }}>
          {item}
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ width: 160, background: "#070e1a", borderRight: "0.5px solid #1e293b", overflowY: "auto", flexShrink: 0 }}>
      <Section title="Discovery" items={SECTIONS} />
      <Section title="Topology" items={TOPO_VIEWS} />
      <Section title="Monitoring" items={MON_VIEWS} />
      <Section title="Inventory" items={INV_VIEWS} />
      <Section title="Settings" items={SETTINGS_VIEWS} />
    </div>
  );
}

function StatusBar({ nodes }) {
  const counts = Object.values(nodes).reduce((acc, n) => { acc[n.status] = (acc[n.status] || 0) + 1; return acc; }, {});
  const devTotal = Object.keys(nodes).length;
  const linkTotal = links.length;
  return (
    <div style={{ background: "#070e1a", borderTop: "0.5px solid #1e293b", display: "flex", padding: "8px 0" }}>
      {/* Summary */}
      <div style={{ flex: 1, borderRight: "0.5px solid #1e293b", padding: "0 16px" }}>
        <div style={{ fontSize: 9, fontFamily: "monospace", color: "#334155", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Topology Summary</div>
        <div style={{ display: "flex", gap: 20 }}>
          {[["Devices", devTotal, "⬡"], ["Interfaces", 192, "◈"], ["Links", linkTotal, "—"], ["Segments", 12, "▣"]].map(([l, v, ic]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "monospace", color: "#e2e8f0", lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 8, fontFamily: "monospace", color: "#475569", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Device Status */}
      <div style={{ flex: 1, borderRight: "0.5px solid #1e293b", padding: "0 16px" }}>
        <div style={{ fontSize: 9, fontFamily: "monospace", color: "#334155", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Device Status</div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ position: "relative", width: 50, height: 50 }}>
            <svg viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)", width: 50, height: 50 }}>
              <circle cx="18" cy="18" r="14" fill="none" stroke="#1e293b" strokeWidth="4" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray={`${(counts.up || 0) / devTotal * 88} 88`} strokeLinecap="round" />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontFamily: "monospace", color: "#22c55e" }}>{Math.round((counts.up || 0) / devTotal * 100)}%</div>
          </div>
          <div>
            {[["Up", counts.up || 0, "#22c55e"], ["Warning", counts.warning || 0, "#f59e0b"], ["Down", counts.down || 0, "#ef4444"], ["Unknown", counts.unknown || 0, "#64748b"]].map(([l, v, c]) => (
              <div key={l} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 2 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: c, flexShrink: 0 }} />
                <span style={{ fontSize: 9, fontFamily: "monospace", color: "#64748b", width: 42 }}>{l}</span>
                <span style={{ fontSize: 9, fontFamily: "monospace", color: "#94a3b8" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Link Status */}
      <div style={{ flex: 1, borderRight: "0.5px solid #1e293b", padding: "0 16px" }}>
        <div style={{ fontSize: 9, fontFamily: "monospace", color: "#334155", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Link Status</div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ position: "relative", width: 50, height: 50 }}>
            <svg viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)", width: 50, height: 50 }}>
              <circle cx="18" cy="18" r="14" fill="none" stroke="#1e293b" strokeWidth="4" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="84 88" strokeLinecap="round" />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontFamily: "monospace", color: "#22c55e" }}>96%</div>
          </div>
          <div>
            {[["Up", Math.round(linkTotal * 0.96), "#22c55e"], ["Warning", 2, "#f59e0b"], ["Down", 1, "#ef4444"], ["Unknown", 1, "#64748b"]].map(([l, v, c]) => (
              <div key={l} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 2 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: c, flexShrink: 0 }} />
                <span style={{ fontSize: 9, fontFamily: "monospace", color: "#64748b", width: 42 }}>{l}</span>
                <span style={{ fontSize: 9, fontFamily: "monospace", color: "#94a3b8" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Alerts */}
      <div style={{ flex: 1.2, borderRight: "0.5px solid #1e293b", padding: "0 16px", overflowY: "auto", maxHeight: 90 }}>
        <div style={{ fontSize: 9, fontFamily: "monospace", color: "#334155", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Top Alerts</div>
        {ALERTS.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 6, marginBottom: 4, alignItems: "flex-start" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: a.sev === "err" ? "#ef4444" : "#f59e0b", flexShrink: 0, marginTop: 3 }} />
            <span style={{ fontSize: 9, fontFamily: "monospace", color: "#94a3b8", flex: 1, lineHeight: 1.3 }}>{a.msg}</span>
            <span style={{ fontSize: 8, fontFamily: "monospace", color: "#334155", flexShrink: 0 }}>{a.time}</span>
          </div>
        ))}
      </div>
      {/* Discovery Jobs */}
      <div style={{ flex: 1, padding: "0 16px" }}>
        <div style={{ fontSize: 9, fontFamily: "monospace", color: "#334155", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Discovery Jobs</div>
        {JOBS.map((j, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, gap: 8 }}>
            <span style={{ fontSize: 9, fontFamily: "monospace", color: "#64748b", flex: 1 }}>{j.name}</span>
            <span style={{ fontSize: 9, fontFamily: "monospace", color: JOB_COLOR[j.status] }}>{j.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [nodes] = useState(initialNodes);
  const [selected, setSelected] = useState(nodes["core-rtr1"]);
  const [activeNav, setActiveNav] = useState("Topology Map");
  const [search, setSearch] = useState("");

  const filteredNodes = search
    ? Object.values(nodes).filter(n => n.label.toLowerCase().includes(search.toLowerCase()) || n.ip.includes(search))
    : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#030712", color: "#e2e8f0", fontFamily: "system-ui, sans-serif", overflow: "hidden" }}>
      {/* Top Bar */}
      <div style={{ background: "#070e1a", borderBottom: "0.5px solid #1e293b", padding: "0 16px", display: "flex", alignItems: "center", gap: 16, height: 44, flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: "#e2e8f0", letterSpacing: "0.04em" }}>VISUAL TOPOLOGY MAPPING</div>
          <div style={{ fontSize: 8, fontFamily: "monospace", color: "#334155" }}>End-to-End Network Topology</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button style={{ background: "#0f172a", border: "0.5px solid #1e293b", borderRadius: 4, padding: "3px 10px", fontSize: 9, fontFamily: "monospace", color: "#64748b", cursor: "pointer" }}>Auto Layout</button>
          <div style={{ position: "relative" }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Topology..."
              style={{ background: "#0f172a", border: "0.5px solid #1e293b", borderRadius: 4, padding: "4px 10px", fontSize: 9, fontFamily: "monospace", color: "#94a3b8", width: 160, outline: "none" }}
            />
            {filteredNodes && (
              <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#0f172a", border: "0.5px solid #1e293b", borderRadius: 4, zIndex: 100, maxHeight: 180, overflowY: "auto" }}>
                {filteredNodes.map(n => (
                  <div key={n.id} onClick={() => { setSelected(n); setSearch(""); }} style={{ padding: "5px 10px", cursor: "pointer", fontSize: 9, fontFamily: "monospace", color: "#64748b", borderBottom: "0.5px solid #1e293b" }}>
                    <span style={{ color: "#94a3b8" }}>{n.label}</span> <span style={{ color: "#334155" }}>{n.ip}</span>
                  </div>
                ))}
                {filteredNodes.length === 0 && <div style={{ padding: "5px 10px", fontSize: 9, fontFamily: "monospace", color: "#334155" }}>No results</div>}
              </div>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {[["🔔", "2"], ["⚙", ""], ["👤 admin", ""]].map(([ic, badge], i) => (
            <div key={i} style={{ position: "relative", cursor: "pointer" }}>
              <span style={{ fontSize: i < 2 ? 14 : 11, fontFamily: "monospace", color: "#475569", padding: "2px 6px", background: "#0f172a", borderRadius: 4, border: "0.5px solid #1e293b" }}>{ic}</span>
              {badge && <span style={{ position: "absolute", top: -4, right: -4, background: "#ef4444", borderRadius: "50%", width: 12, height: 12, fontSize: 7, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "monospace" }}>{badge}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Main Area */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <Sidebar active={activeNav} setActive={setActiveNav} />
        <TopologyCanvas nodes={nodes} selected={selected} onSelect={setSelected} />
        {/* Right Panel */}
        <div style={{ width: 200, background: "#070e1a", borderLeft: "0.5px solid #1e293b", display: "flex", flexDirection: "column", overflow: "hidden", flexShrink: 0 }}>
          <div style={{ padding: "8px 14px", borderBottom: "0.5px solid #1e293b", fontSize: 9, fontFamily: "monospace", color: "#334155", textTransform: "uppercase", letterSpacing: "0.08em" }}>Node Details</div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <NodeDetails node={selected} />
          </div>
          {/* Link Legend */}
          <div style={{ borderTop: "0.5px solid #1e293b", padding: "8px 14px" }}>
            <div style={{ fontSize: 9, fontFamily: "monospace", color: "#334155", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Link Legend</div>
            {Object.entries(LINK_COLORS).map(([k, v]) => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <svg width="24" height="2"><line x1="0" y1="1" x2="24" y2="1" stroke={v} strokeWidth={k === "100g" ? 2 : 1} strokeDasharray={k === "wan" || k === "cloud" ? "4,3" : undefined} /></svg>
                <span style={{ fontSize: 9, fontFamily: "monospace", color: "#64748b" }}>{k.toUpperCase()} Link</span>
              </div>
            ))}
          </div>
          {/* Topology Views */}
          <div style={{ borderTop: "0.5px solid #1e293b", padding: "8px 14px" }}>
            <div style={{ fontSize: 9, fontFamily: "monospace", color: "#334155", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Topology Views</div>
            {["Physical Topology", "Logical Topology", "Layer 2 Topology", "Layer 3 Topology", "Application Topology"].map((v, i) => (
              <div key={v} onClick={() => setActiveNav(v.replace(" Topology", " Map").replace("Physical Map", "Topology Map"))}
                style={{ padding: "3px 6px", marginBottom: 3, background: i === 0 ? "rgba(74,158,255,0.08)" : "#0a1628", border: `0.5px solid ${i === 0 ? "#1e3a5f" : "#0f172a"}`, borderRadius: 3, cursor: "pointer", fontSize: 9, fontFamily: "monospace", color: i === 0 ? "#4a9eff" : "#475569" }}>
                {v}
              </div>
            ))}
          </div>
        </div>
      </div>

      <StatusBar nodes={nodes} />
    </div>
  );
};

module.export = App;