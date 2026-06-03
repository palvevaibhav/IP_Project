import { useState } from "react";

const hops = [
  {
    id: 1,
    hostname: "PE-MUM-01",
    loopbackIp: "10.1.1.1",
    role: "PE",
    metric: "SRC",
  },
  {
    id: 2,
    hostname: "P-CORE-01",
    loopbackIp: "10.0.3.1",
    role: "P Core",
    metric: "+10",
  },
  {
    id: 3,
    hostname: "AG1-MUM",
    loopbackIp: "10.0.2.1",
    role: "AGG",
    metric: "+10",
  },
  {
    id: 4,
    hostname: "PE-CHN-01",
    loopbackIp: "10.1.1.9",
    role: "PE",
    metric: "DST",
  },
];

export default function ShortestPathTool() {
  const [algorithm, setAlgorithm] = useState("ISIS");

  return (
    <div className="h-screen bg-gray-100 p-4">
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden h-full flex flex-col">
        {/* ================================= */}
        {/* TOP BANNER */}
        {/* ================================= */}
        <div className="flex items-center justify-between border-b bg-blue-50 px-4 py-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-blue-700 font-semibold">
                ↗ Path:
              </span>

              <span className="font-semibold text-gray-800">
                PE-MUM-01
              </span>

              <span className="text-gray-400">→</span>

              <span className="font-semibold text-gray-800">
                PE-CHN-01
              </span>
            </div>

            {/* ALGORITHM SELECTOR */}
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="border rounded px-2 py-1 text-sm bg-white"
            >
              <option value="ISIS">
                IS-IS metric
              </option>

              <option value="SR">
                SR label stack
              </option>
            </select>
          </div>

          {/* CLEAR BUTTON */}
          <button className="text-sm border rounded px-3 py-1 bg-white hover:bg-gray-50">
            Clear path
          </button>
        </div>

        {/* ================================= */}
        {/* MAIN CONTENT */}
        {/* ================================= */}
        <div className="flex flex-1 overflow-hidden">
          {/* ================================= */}
          {/* GRAPH CANVAS */}
          {/* ================================= */}
          <div className="flex-1 relative bg-gray-50">
            {/* SIMULATED TOPOLOGY */}
            <div className="absolute inset-0">
              {/* Non-path nodes */}
              <Node
                label="PE-MUM-01"
                top="14%"
                left="10%"
                dimmed
              />

              <Node
                label="PE-DEL-01"
                top="14%"
                right="18%"
                dimmed
              />

              <Node
                label="P-CORE-02"
                top="45%"
                left="15%"
                dimmed
              />

              {/* Highlighted Path Nodes */}
              <HighlightedNode
                label="P-CORE-01"
                top="42%"
                left="42%"
              />

              <HighlightedNode
                label="AG1-MUM"
                top="68%"
                left="42%"
              />

              {/* CONNECTING LINES */}
              <svg className="absolute inset-0 w-full h-full">
                {/* Non-highlighted edges */}
                <line
                  x1="18%"
                  y1="22%"
                  x2="46%"
                  y2="48%"
                  stroke="#D1D5DB"
                  strokeWidth="2"
                />

                <line
                  x1="70%"
                  y1="22%"
                  x2="48%"
                  y2="48%"
                  stroke="#D1D5DB"
                  strokeWidth="2"
                />

                <line
                  x1="20%"
                  y1="52%"
                  x2="46%"
                  y2="76%"
                  stroke="#D1D5DB"
                  strokeWidth="2"
                />

                {/* Highlighted path */}
                <line
                  x1="48%"
                  y1="54%"
                  x2="48%"
                  y2="74%"
                  stroke="#F59E0B"
                  strokeWidth="4"
                />

                {/* Metric Label */}
                <text
                  x="50%"
                  y="64%"
                  fill="#D97706"
                  fontSize="12"
                  fontWeight="600"
                >
                  metric 10
                </text>
              </svg>
            </div>
          </div>

          {/* ================================= */}
          {/* RESULT PANE */}
          {/* ================================= */}
          <div className="w-80 border-l bg-white flex flex-col">
            {/* Header */}
            <div className="border-b px-4 py-3 bg-gray-50">
              <h2 className="font-semibold text-gray-800">
                ↗ Path hops
              </h2>
            </div>

            {/* Hop List */}
            <div className="flex-1 overflow-y-auto">
              {hops.map((hop) => (
                <div
                  key={hop.id}
                  className="flex items-start justify-between gap-3 border-b px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex gap-3">
                    {/* Number Circle */}
                    <div className="w-7 h-7 rounded-full bg-blue-900 text-white text-xs flex items-center justify-center font-semibold">
                      {hop.id}
                    </div>

                    {/* Hop Info */}
                    <div>
                      <div className="font-semibold text-sm text-gray-800">
                        {hop.hostname}
                      </div>

                      <div className="text-xs text-gray-500">
                        {hop.loopbackIp} · {hop.role}
                      </div>
                    </div>
                  </div>

                  {/* Metric */}
                  <div className="text-green-600 font-semibold text-sm">
                    {hop.metric}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t bg-gray-50 p-4 space-y-3">
              <SummaryRow
                label="Total metric"
                value="20"
              />

              <SummaryRow
                label="Hop count"
                value="4"
              />

              <SummaryRow
                label="SR labels"
                value="17001→17005"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================= */
/* NODE COMPONENT */
/* ================================= */

function Node({
  label,
  top,
  left,
  right,
  dimmed = false,
}) {
  return (
    <div
      className={`absolute px-4 py-3 rounded-md border text-sm font-semibold shadow-sm bg-white border-gray-300 ${
        dimmed ? "opacity-30" : ""
      }`}
      style={{
        top,
        left,
        right,
      }}
    >
      {label}
    </div>
  );
}

/* ================================= */
/* HIGHLIGHTED NODE */
/* ================================= */

function HighlightedNode({
  label,
  top,
  left,
}) {
  return (
    <div
      className="absolute px-4 py-3 rounded-md border-4 border-yellow-400 bg-indigo-500 text-white text-sm font-bold shadow-lg"
      style={{
        top,
        left,
      }}
    >
      {label}
    </div>
  );
}

/* ================================= */
/* SUMMARY ROW */
/* ================================= */

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500">
        {label}
      </span>

      <span className="font-semibold text-gray-800">
        {value}
      </span>
    </div>
  );
}