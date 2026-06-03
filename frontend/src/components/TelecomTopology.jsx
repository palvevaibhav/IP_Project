import React, { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";

const layerConfigs = {
  L7: {
    title: "L7 eNodeB / RAN",
    layout: "grid",

    nodes: [
      {
        data: {
          id: "ran1",
          label: "MUM-EBPS-01",
          type: "RAN Gateway",
        },
      },

      {
        data: {
          id: "ran2",
          label: "MUM-EBPS-02",
          type: "RAN Gateway",
        },
      },
    ],

    edges: [
      {
        data: {
          id: "e1",
          source: "ran1",
          target: "ran2",
        },
      },
    ],
  },
};

export default function TelecomTopology() {
  const cyRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const config = layerConfigs.L7;
    const cy = cytoscape({
      container: document.getElementById("cy"),
      elements: [
        ...config.nodes,
        ...config.edges,
      ],

      style: [
        // NODES
        {
          selector: "node",
          style: {
            label: "data(label)",
            "text-valign": "center",
            "text-halign": "center",
            width: 140,
            height: 45,
            shape: "roundrectangle",
            "background-color": "#ffffff",
            "border-width": 2,
            "border-color": "#2563eb",
            color: "#0f172a",
            "font-size": 11,
            "font-weight": "bold",
          },
        },

        // EDGES
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#94a3b8",
            "target-arrow-color": "#94a3b8",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
          },
        },

        // SELECTED
        {
          selector: ":selected",
          style: {
            "border-width": 4,
            "border-color": "#ef4444",
          },
        },

        // NEIGHBOUR NODES
        {
          selector: ".neighbour",
          style: {
            "border-color": "#16a34a",
            "background-color": "#f0fdf4",
          },
        },

        // PROTOCOL EDGES
        {
          selector: ".isis",
          style: {
            width: 4,
            "line-color": "#16a34a",
            label: "IS-IS UP",
            color: "#16a34a",
            "font-size": 10,
          },
        },
      ],

      layout: {
        name: "grid",
        animate: true,
      },
    });

    // NODE CLICK
    cy.on("tap", "node", (evt) => {
      const node = evt.target;
      setSelectedNode(node.data());
    });

    cyRef.current = cy;
    return () => {
      cy.destroy();
    };

  }, []);

  // =========================
  // EXPAND NEIGHBOURS
  // =========================

  const expandNeighbours = () => {

    if (!selectedNode) return;
    const cy = cyRef.current;
    const nodeId = selectedNode.id;
    // Prevent duplicate expansion
    if (cy.$(`#${nodeId}-agg`).length > 0) {
      return;
    }

    // =========================
    // NEW NODES
    // =========================

    const newElements = [

      // Aggregation Router
      {
        data: {
          id: `${nodeId}-agg`,
          label: "MUM-AGG-01",
          type: "Aggregation",
        },

        classes: "neighbour",
      },

      // AAA
      {
        data: {
          id: `${nodeId}-aaa`,
          label: "AAA",
          type: "Authentication",
        },

        classes: "neighbour",
      },

      // IMS
      {
        data: {
          id: `${nodeId}-ims`,
          label: "IMS",
          type: "Voice Core",
        },

        classes: "neighbour",
      },

      // VPN
      {
        data: {
          id: `${nodeId}-vpn`,
          label: "VRF-CORP",
          type: "VPN",
        },

        classes: "neighbour",
      },

      // =========================
      // EDGES
      // =========================

      {
        data: {
          id: `${nodeId}-e1`,
          source: nodeId,
          target: `${nodeId}-agg`,
        },

        classes: "isis",
      },

      {
        data: {
          id: `${nodeId}-e2`,
          source: nodeId,
          target: `${nodeId}-aaa`,
        },
      },

      {
        data: {
          id: `${nodeId}-e3`,
          source: nodeId,
          target: `${nodeId}-ims`,
        },
      },

      {
        data: {
          id: `${nodeId}-e4`,
          source: nodeId,
          target: `${nodeId}-vpn`,
        },
      },
    ];

    console.log("New elements to add:", newElements);
    // ADD TO GRAPH
    cy.add(newElements);

    // AUTO LAYOUT
    cy.layout({
      name: "cose",
      animate: true,

      animationDuration: 1000,

      fit: true,

      padding: 50,
    }).run();
  };

  return (

    <div className="h-screen flex bg-slate-100">

      {/* LEFT */}
      <div className="w-72 bg-white border-r p-5">

        <h1 className="text-2xl font-bold mb-6">
          Layers
        </h1>

        <button
          className="w-full bg-blue-600 text-white rounded-xl px-4 py-3"
        >
          L7 eNodeB / RAN
        </button>

      </div>

      {/* CENTER */}
      <div className="flex-1 relative">

        <div className="absolute top-4 left-4 z-10 bg-white rounded-xl shadow px-4 py-2">

          <h2 className="font-bold">
            L7 eNodeB / RAN
          </h2>

        </div>

        <div id="cy" className="w-full h-full" />

      </div>

      {/* RIGHT */}
      <div className="w-80 bg-white border-l p-5">

        <h2 className="text-2xl font-bold mb-6">
          Inspector
        </h2>

        {!selectedNode ? (

          <div className="text-slate-400">
            Select a node
          </div>

        ) : (

          <div className="space-y-5">

            <div>

              <p className="text-sm text-slate-500">
                Hostname
              </p>

              <p className="font-bold">
                {selectedNode.label}
              </p>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Type
              </p>

              <p className="font-bold">
                {selectedNode.type}
              </p>

            </div>

            <button
              onClick={expandNeighbours}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
            >
              Inspect Neighbours
            </button>

          </div>

        )}

      </div>

    </div>
  );
}