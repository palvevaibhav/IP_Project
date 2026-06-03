import { useEffect, useState } from "react";

export default function Sidebar({ setSelectedLayer, setSelectedProtocols }) {
    const [open, setOpen] = useState(true);

    const layers = [
        { id: "L7", name: "L7 eNodeB / RAN", desc: "Radio access layer view" },
        { id: "L6", name: "L6 CSS Access", desc: "Customer service switching" },
        { id: "L5", name: "L5 Aggregation", desc: "Aggregation topology view" },
        { id: "L4", name: "L4 MPLS Core", desc: "Core transport network" },
        { id: "L3", name: "L3 PE / VPN Edge", desc: "Provider edge routing" },
        { id: "L2", name: "L2 BGP / RR", desc: "Provider edge routing" },
        { id: "L1", name: "L1 Services", desc: "Provider edge routing" },
    ];

    useEffect(() => {
        // Set default selected layer on mount
        setSelectedLayer(layers[0]);
    }, []);
    const protocols = ["IS-IS", "LDP", "BGP", "SR-MPLS", "CDP"];

    const handleProtocolToggle = (protocol) => {
        setSelectedProtocols((prev) => {
            if (prev.includes(protocol)) {
                return prev.filter((p) => p !== protocol);
            } else {
                return [...prev, protocol];
            }
        });
    };

    return (
        <div className="w-[240px] bg-white border-r p-4">
            <h2 className="font-bold text-blue-900 mb-4 text-capitalize">
                LAYERS
            </h2>
            <ul className="space-y-2 text-sm">
                {layers.map((layer) => (
                    <li
                        key={layer.name}
                        onClick={() => setSelectedLayer(layer)}
                        className="cursor-pointer text-sm text-gray-600 hover:text-blue-900 hover:bg-gray-100 rounded"
                    >
                        {layer.name}
                    </li>
                ))}
            </ul>

            {/* PROTOCOLS */}
            <div className="mt-6">
                <h3 className="font-semibold text-sm mb-2 text-capitalize">PROTOCOLS</h3>
                {protocols.map((p) => (
                    <div className="flex justify-between text-sm py-1" key={p}>
                        <span>{p}</span>
                        <label htmlFor={`toggle-${p}`} className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id={`toggle-${p}`} className="sr-only peer" onChange={() => handleProtocolToggle(p)} />

                            {/* track */}
                            <div className="
                                w-9 h-5 rounded-full
                                bg-gray-400
                                peer-checked:bg-blue-900
                                transition-colors duration-300
                            "></div>

                            {/* knob */}
                            <div className="
                                absolute left-0.5 top-0.5
                                w-4 h-4 bg-white rounded-full
                                transition-all duration-300
                                peer-checked:translate-x-4
                            "></div>
                        </label>
                    </div>
                ))}
            </div>

            {/* 🔵 LEFT - RUN HISTORY */}
            {/* 🔻 BOTTOM SECTION - RUN HISTORY (MOVED HERE) */}
            <div className="mt-6">
                <h3 className="font-semibold text-gray-700 text-capitalize">
                    RECENT RUNS
                </h3>
                <div className="space-y-2">
                    <div className="border-b">
                        <div className="text-green-600 font-semibold">Run #047</div>
                        <div className="text-gray-500">412 nodes • 2 min ago</div>
                    </div>

                    <div className="border-b">
                        <div className="text-orange-500">Run #046</div>
                        <div className="text-gray-400">398 nodes • 2 hr ago</div>
                    </div>

                    <div className="border-b">
                        <div className="text-red-500">Run #045</div>
                        <div className="text-gray-400">Failed • 6 hr ago</div>
                    </div>
                </div>

            </div>
        </div>
    );
}