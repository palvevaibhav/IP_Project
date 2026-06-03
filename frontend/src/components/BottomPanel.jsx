export default function BottomPanel() {
  return (
    <div className="h-16 border-t bg-white flex items-center justify-between px-4 text-xs">
      {/* 🟢 CENTER - METRICS */}
      <div className="hidden md:flex items-center gap-6 text-gray-600">

        <span>Nodes: <b>412</b></span>
        <span>Edges: <b>1043</b></span>
        <span>IS adj: <b>387</b></span>
        <span>BGP peers: <b>23</b></span>
        <span>VRFs: <b>156</b></span>

      </div>

      {/* 🔴 RIGHT - LAST RUN */}
      <div className="text-gray-500">
        Last run: <span className="font-medium">2 min ago – Run #047</span>
      </div>
    </div>
  );
}