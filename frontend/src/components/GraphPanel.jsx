import { useMemo, useState } from "react";
import GraphCanvas from "./GraphCanvas";
import Inspector from "./Inspector";
import { nodes, edges } from "../data/elements";

function getRole(name) {
  const roles = ["CCR","CSR","IAR","AAR","URR","CRR","IRR","ICR","ISR","VRR","EUR"];
  return roles.find((role) => name.includes(role)) || "UNKNOWN";
}

function getColor(role) {
  const colors = {
    CCR: "#dc2626", CSR: "#2563eb", IAR: "#0891b2", AAR: "#ca8a04",
    URR: "#10b981", CRR: "#f97316", IRR: "#8b5cf6", ICR: "#ec4899",
    ISR: "#14b8a6", VRR: "#64748b", EUR: "#e11d48", UNKNOWN: "#94a3b8",
  };
  return colors[role];
}

export default function GraphPanel({ selectedLayer, selectedProtocols, searchQuery }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [inspectorOpen, setInspectorOpen] = useState(false);

  const seedNode = "MUMBRLB1CSR001";

  const [visualizedElements, setVisualizedElements] = useState([
    {
      data: {
        id: seedNode,
        label: seedNode,
        hostname: seedNode,
        platform: "Cisco ISR4451",
        loopbackIP: "10.1.1.9",
        status: "UP",
        role: getRole(seedNode),
        depth: 0,
        color: getColor(getRole(seedNode)),
      },
    },
  ]);

  // Toggle: clicking same node closes, clicking new node opens
  const handleSelectNode = (nodeData) => {
    if (selectedNode?.id === nodeData?.id && inspectorOpen) {
      setInspectorOpen(false);
    } else {
      setSelectedNode(nodeData);
      setInspectorOpen(true);
    }
  };

  return (
    <>
      <div className="flex-1 min-w-0">
        <div className="h-full flex flex-col bg-white border">

          {/* Header */}
          <div className="h-12 border-b flex items-center justify-between px-4 shrink-0">
            <div className="font-semibold text-gray-800">{selectedLayer.name}</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-1 rounded-full bg-green-100 text-green-700">live</span>
              <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-500">
                {selectedProtocols.join(" • ")}
              </span>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-gray-50 relative">
            <div className="absolute inset-0">
              <GraphCanvas
                elements={visualizedElements}
                selectedItem={selectedNode}
                setSelectedItem={handleSelectNode}
                searchQuery={searchQuery}
                setInspectorOpen={setInspectorOpen}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Inspector — slide in/out */}
      <div
        style={{
          width: inspectorOpen ? 360 : 0,
          overflow: "hidden",
          transition: "width 0.2s ease",
          flexShrink: 0,
        }}
        className="border-l bg-white"
      >
        { selectedNode && (
          <div style={{ width: 360 }}>
            {/* Close button */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="text-sm font-semibold text-gray-700">
                {selectedNode.hostname || selectedNode.id}
              </span>
              <button
                onClick={() => setInspectorOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <Inspector
              selectedNode={selectedNode}
              handleExpand={() => alert("Expand:", selectedNode)}
            />
          </div>
        )}
      </div>
    </>
  );
}