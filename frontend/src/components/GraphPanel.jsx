import { useMemo, useState } from "react";
import GraphCanvas from "./GraphCanvas";
import Inspector from "./Inspector";
import { nodes, edges } from "../data/elements";
function getRole(name) {
    const roles = [
        "CCR",
        "CSR",
        "IAR",
        "AAR",
        "URR",
        "CRR",
        "IRR",
        "ICR",
        "ISR",
        "VRR",
        "EUR",
    ];

    return (
        roles.find((role) => name.includes(role)) ||
        "UNKNOWN"
    );
}

function getColor(role) {
    const colors = {
        CCR: "#dc2626",
        CSR: "#2563eb",
        IAR: "#0891b2",
        AAR: "#ca8a04",
        URR: "#10b981",
        CRR: "#f97316",
        IRR: "#8b5cf6",
        ICR: "#ec4899",
        ISR: "#14b8a6",
        VRR: "#64748b",
        EUR: "#e11d48",
        UNKNOWN: "#94a3b8",
    };

    return colors[role];
}

export default function GraphPanel({
    selectedLayer,
    selectedProtocols,
}) {
    const [selectedNode, setSelectedNode] =
        useState(null);

    const expandedNodes = useMemo(
        () => new Set(),
        []
    );

    const seedNode = "MUMBRLB1IAR001";

    const [visualizedElements, setVisualizedElements] =
        useState([
            {
                data: {
                    "id": seedNode,
                    "label": seedNode,
                    "hostname": seedNode,
                    "platform": "Cisco ISR4451",
                    "loopbackIP": "10.1.1.9",
                    "status": "UP",
                    role: getRole(seedNode),
                    depth: 0,
                    color: getColor(
                        getRole(seedNode)
                    ),
                },
            },
        ]);

   const handleExpand = (node) => {
    if (!node) return;

    const nodeId = node.id || node.data?.id;

    if (!nodeId) return;

    if (expandedNodes.has(nodeId)) {
        return;
    }

    expandedNodes.add(nodeId);

    const connectedLinks = edges.filter(
        (link) =>
            link.source === nodeId ||
            link.target === nodeId
    );

    if (!connectedLinks.length) {
        return;
    }

    setVisualizedElements((prev) => {
        const existingIds = new Set(
            prev.map((e) => e.data.id)
        );

        const nodesToAdd = [];
        const edgesToAdd = [];

        // ------------------------------------
        // STEP 1: Add neighbour nodes
        // ------------------------------------
        connectedLinks.forEach((link) => {
            const neighbourId =
                link.source === nodeId
                    ? link.target
                    : link.source;

            if (existingIds.has(neighbourId)) {
                return;
            }

            const neighbourNode =
                nodes[neighbourId];

            if (!neighbourNode) {
                console.warn(
                    `Node not found: ${neighbourId}`
                );
                return;
            }

            nodesToAdd.push({
                data: {
                    ...neighbourNode,
                    id:
                        neighbourNode.id ||
                        neighbourId,
                    depth:
                        (node.depth ?? 0) + 1,
                    color: getColor(
                        neighbourNode.role
                    ),
                },
            });

            existingIds.add(neighbourId);
        });

        // ------------------------------------
        // STEP 2: Add edges
        // ------------------------------------
        connectedLinks.forEach((link) => {
            const edgeId =
                `${link.source}_${link.target}_${link.interface}`;

            if (existingIds.has(edgeId)) {
                return;
            }

            const sourceExists =
                existingIds.has(link.source);

            const targetExists =
                existingIds.has(link.target);

            if (
                !sourceExists ||
                !targetExists
            ) {
                return;
            }

            edgesToAdd.push({
                data: {
                    id: edgeId,
                    source: link.source,
                    target: link.target,
                    label: link.interface,
                },
            });

            existingIds.add(edgeId);
        });

        return [
            ...prev,
            ...nodesToAdd,
            ...edgesToAdd,
        ];
    });
};

    return (
        <>
            <div className="flex-1">
                <div className="h-full flex flex-col bg-white border">

                    <div className="h-12 border-b flex items-center justify-between px-4">
                        <div className="font-semibold text-gray-800">
                            {selectedLayer.name}
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                            <span className="px-2 py-1 rounded-full bg-green-100 text-green-700">
                                live
                            </span>

                            <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-500">
                                {selectedProtocols.join(
                                    " • "
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 bg-gray-50 relative">
                        <div className="absolute inset-0">
                            <GraphCanvas
                                elements={
                                    visualizedElements
                                }
                                selectedItem={
                                    selectedNode
                                }
                                setSelectedItem={
                                    setSelectedNode
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            {selectedNode && (
                <div className="w-[360px] border-l bg-white">
                    <Inspector
                        selectedNode={
                            selectedNode
                        }
                        handleExpand={
                            handleExpand
                        }
                    />
                </div>
            )}
        </>
    );
}