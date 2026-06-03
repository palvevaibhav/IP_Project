import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

cytoscape.use(dagre);

export default function GraphCanvas({
  selectedItem,
  setSelectedItem,
  elements,
}) {
  const containerRef = useRef(null);
  const cyRef = useRef(null);

  useEffect(() => {
    const cy = cytoscape({
      container: containerRef.current,
      elements: [],
      style: [
        {
          selector: "node",
          style: {
            label: "data(label)",
            "background-color": "data(color)",
            color: "#fff",
            width: 60,
            height: 60,
            "font-size": 10,
            "text-wrap": "wrap",
            "text-max-width": 120,
            "text-valign": "center",
            "text-halign": "center",
            "border-width": 2,
            "border-color": "#fff",
          },
        },

        {
          selector: "edge",
          style: {
            label: "data(label)",
            width: 2,
            "curve-style": "bezier",
            "target-arrow-shape": "triangle",
            "font-size": 8,
            "text-background-color": "#fff",
            "text-background-opacity": 1,
            "text-background-padding": 2,
          },
        },

        {
          selector: ":selected",
          style: {
            "border-width": 4,
          },
        },
      ],
    });

    cy.on("tap", "node", (evt) => {
      setSelectedItem(evt.target.data());
    });

    cyRef.current = cy;

    return () => cy.destroy();
  }, []);

  useEffect(() => {
    const cy = cyRef.current;

    if (!cy) return;

    const existingIds = new Set(
      cy.elements().map((e) => e.id())
    );

    const toAdd = elements.filter(
      (el) =>
        el.data?.id &&
        !existingIds.has(el.data.id)
    );

    if (!toAdd.length) return;

    cy.add(toAdd);

    cy.layout({
      name: "dagre",
      rankDir: "TB",
      animate: true,
      fit: true,
      nodeSep: 80,
      rankSep: 180,
      padding: 50,
    }).run();
  }, [elements]);

  return (
    <div className="h-full w-full">
      <div
        ref={containerRef}
        className="h-full w-full"
      />
    </div>
  );
}