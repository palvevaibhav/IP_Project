import { Link } from "react-router-dom";
import InfoIcon from "../icons/InfoIcon";

function InspectorRow({ label, value }) {
    return (
        <div className="px-4 py-3">
            <div className="text-xs text-gray-500">
                {label}
            </div>

            <div className="font-medium">
                {value || "-"}
            </div>
        </div>
    );
}

export default function Inspector({ selectedNode, handleExpand }) {
    return (
        <div className="space-y-4 relative inset-0">
            <h2 className="p-4 font-bold text-blue-900 flex items-center border-b">
                <button
                    onClick={() => alert("Inspector info clicked")}
                    className="hover:bg-blue-100 p-1 rounded transition"
                >
                    <InfoIcon className="w-5 h-5 text-blue-700 cursor-pointer" />
                </button>
                Inspector
            </h2><div className="divide-y">
                <InspectorRow
                    label="Hostname"
                    value={selectedNode.hostname}
                />

                <InspectorRow
                    label="Loopback IP"
                    value={selectedNode.loopbackIP}
                />

                <InspectorRow
                    label="Platform"
                    value={selectedNode.platform}
                />

                <InspectorRow
                    label="ISIS Level"
                    value={selectedNode.isisLevel}
                />

                <InspectorRow
                    label="Node SID"
                    value={selectedNode.nodeSid}
                />

                <InspectorRow
                    label="Status"
                    value={selectedNode.status}
                />
            </div>

            {/* </div> */}

            <div className="space-y-2 pt-4">
                <button className="w-full border rounded py-1 text-sm" onClick={() => handleExpand(selectedNode)}>
                    Inspect neighbours
                </button>
                <button className="w-full border rounded py-1 text-sm" onClick={() => alert("VPN overlay clicked")}>
                    VPN overlay
                </button>
                <Link to="/admin/shortest-path" className="w-full block text-center border rounded py-1 text-sm">
                    Shortest path
                </Link>
            </div>
        </div>
    );
}