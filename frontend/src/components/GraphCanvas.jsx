import { useEffect, useRef, useCallback } from "react";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import { graph, nodes } from "../data/elements";

cytoscape.use(dagre);

function edgeColor(protocol) {
  switch (protocol) {
    case "ISIS": return "#22c55e";
    case "BGP":  return "#3b82f6";
    case "LDP":  return "#f59e0b";
    default:     return "#94a3b8";
  }
}

const cyStyles = [
  {
    selector: "node",
    style: {
      label: "data(label)",
      "background-color": "data(color)",
      color: "#ffffff",
      width:  "mapData(depth,0,7,24,12)",
      height: "mapData(depth,0,7,24,12)",
      "font-size": "mapData(depth,0,7,9,6)",
      "font-family": '"JetBrains Mono", monospace',
      "font-weight": 600,
      "text-wrap": "ellipsis",
      "text-max-width": "15px",
      "text-valign": "center",
      "text-halign": "center",
      "border-width": 1.5,
      "border-color": "rgba(255,255,255,0.15)",
      "shadow-blur": 12,
      "shadow-color": "data(color)",
      "shadow-opacity": 0.4,
    },
  },
  {
    selector: "edge",
    style: {
      "curve-style": "bezier",
      "line-color": edgeColor("ISIS"),
      width: 1.5,
    },
  },
  {
    selector: "node:selected",
    style: { "border-width": 1, "border-color": "#5209f1" },
  },
  {
    selector: ".hover",
    style: { "border-width": 3, "border-color": "#ffffff" },
  },
  {
    selector: ".search-highlight",
    style: {
      "border-width": 5,
      "border-color": "#facc15",
      "background-color": "#ef4444",
      "z-index": 9999,
    },
  },
];

const btnStyle = {
  width: 36,
  height: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
  border: "1px solid rgba(99,179,237,0.25)",
  background: "rgba(8,13,20,0.85)",
  color: "#63b3ed",
  fontSize: 18,
  cursor: "pointer",
  backdropFilter: "blur(6px)",
  transition: "background 0.15s",
};

const btnSmStyle = {
  ...btnStyle,
  fontSize: 11,
  fontFamily: '"JetBrains Mono", monospace',
  fontWeight: 600,
  letterSpacing: 0.5,
  width: 36,
  height: 28,
};

export default function GraphCanvas({
  elements,
  searchQuery,
  selectedItem,
  setSelectedItem,
  setInspectorOpen
}) {
  const containerRef = useRef(null);
  const cyRef        = useRef(null);
  const expandedRef  = useRef(new Set());

  // Only root nodes from elements (no source = not an edge, depth 0 = root)
  // Adjust the root filter below if your root nodes use a different field
  const rootElements = elements.filter(
    (el) => !el.data.source && (el.data.depth === 0 || el.data.parent == null)
  );

  const runLayout = useCallback(() => {
    cyRef.current?.layout({
      name: "dagre",
      rankDir: "TB",
      animate: true,
      fit: true,
      padding: 40,
      nodeSep: 80,
      rankSep: 120,
    }).run();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      // ✅ Start with only root nodes, not all elements
      elements: rootElements,
      style: cyStyles,
      layout: { name: "preset" },
      wheelSensitivity: 0.3,
    });

    cyRef.current = cy;

    const handleTap = (evt) => {
      const node   = evt.target;
      const nodeId = node.id();

      setSelectedItem(node.data());

      if (expandedRef.current.has(nodeId)) return;
      expandedRef.current.add(nodeId);

      const children = graph[nodeId];
      if (!children) return;

      children.forEach((child) => {
        const childNode = nodes[child.target];
        if (!childNode) return;

        if (cy.$id(child.target).length === 0) {
          cy.add({ data: { ...childNode, id: child.target } });
        }

        const edgeId = `${nodeId}-${child.target}`;
        if (cy.$id(edgeId).length === 0) {
          cy.add({ data: { id: edgeId, source: nodeId, target: child.target } });
        }
      });
      setInspectorOpen(true); // Close inspector
      runLayout();
    };

    const handleMouseOver = (evt) => {
      evt.target.addClass("hover");
      document.body.style.cursor = "pointer";
    };

    const handleMouseOut = (evt) => {
      evt.target.removeClass("hover");
      document.body.style.cursor = "default";
    };

    cy.on("tap", "node", handleTap);
    cy.on("mouseover", "node", handleMouseOver);
    cy.on("mouseout", "node", handleMouseOut);

    runLayout();

    return () => {
      cy.destroy();
      cyRef.current = null;
      document.body.style.cursor = "default";
    };
  }, []);  // ← empty deps: init once only

  // Search highlight
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    cy.nodes().removeClass("search-highlight");
    if (!searchQuery?.trim()) return;

    const matches = cy.nodes().filter((n) =>
      n.data("hostname")?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matches.length) {
      matches.addClass("search-highlight");
      cy.animate({ center: { eles: matches }, zoom: 1.5, duration: 500 });
      setSelectedItem(matches[0].data());
    }
  }, [searchQuery]);

  // ── Controls ──────────────────────────────────────────────────────────────
  const zoomIn = () => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.zoom({ level: cy.zoom() * 1.2, renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 } });
  };

  const zoomOut = () => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.zoom({ level: cy.zoom() * 0.8, renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 } });
  };

  const fitGraph = () => cyRef.current?.fit(undefined, 50);

  const resetGraph = () => {
    const cy = cyRef.current;
    if (!cy) return;

    expandedRef.current.clear();
    cy.elements().remove();

    // ✅ Re-add only root nodes
    cy.add(rootElements);

    setSelectedItem(null);
    runLayout();
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      {/* ── Controls — bottom right ── */}
      <div style={{
        position: "absolute",
        bottom: 20,
        right: 16,
        // zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        padding: 8,
        borderRadius: 12,
        background: "rgba(255, 255, 255, 0.8)",
        border: "1px solid rgba(141, 141, 141, 0.15)",
        backdropFilter: "blur(8px)",
      }}>
        <button style={btnStyle} onClick={zoomIn}  title="Zoom in">+</button>
        <button style={btnStyle} onClick={zoomOut} title="Zoom out">−</button>

        <div style={{ width: 24, height: 1, background: "rgba(99,179,237,0.2)", margin: "2px 0" }} />

        <button style={btnSmStyle} onClick={fitGraph}   title="Fit all">FIT</button>
        <button style={btnSmStyle} onClick={resetGraph} title="Reset to root" 
          onMouseEnter={e => e.target.style.background = "rgba(99,179,237,0.15)"}
          onMouseLeave={e => e.target.style.background = "rgba(8,13,20,0.85)"}
        >RST</button>
      </div>
    </div>
  );
}