import React, { useState } from "react";

export default function DiscoveryModal({ open, setOpen }) {
    const [maxWorkers, setMaxWorkers] = useState(20);
    const [runTimeout, setRunTimeout] = useState(120);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            {/* Modal */}
            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <h2 className="text-lg font-bold text-blue-900 flex items-center gap-1">
                                <svg
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                New discovery run
                            </h2>

                            <button
                                onClick={() => setOpen(false)}
                                className="text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-6">
                            {/* Run Label */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Run label (optional)
                                </label>

                                <input
                                    type="text"
                                    defaultValue="Mumbai core — May 2026"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Seed IPs */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Seed IPs <span className="text-red-500">*</span>
                                </label>

                                <textarea
                                    rows={4}
                                    defaultValue={`10.1.1.1
10.1.1.2
10.1.1.abc`}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                                />

                                <p className="text-xs text-gray-500 mt-2">
                                    Loopback /32 IPs only. IS-IS router-IDs preferred as seeds.
                                </p>

                                <p className="text-sm text-red-500 mt-2">
                                    ⚠ 10.1.1.abc is not a valid IP address
                                </p>

                                {/* Tags */}
                                <div className="flex gap-2 flex-wrap mt-3">
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                        ✔ 10.1.1.1
                                    </span>

                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                        ✔ 10.1.1.2
                                    </span>

                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                                        ✖ 10.1.1.abc
                                    </span>
                                </div>
                            </div>

                            {/* Max Workers */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Max workers
                                    </label>

                                    <span className="text-sm font-semibold text-gray-800">
                                        {maxWorkers}
                                    </span>
                                </div>

                                <input
                                    type="range"
                                    min="1"
                                    max="50"
                                    value={maxWorkers}
                                    onChange={(e) => setMaxWorkers(parseInt(e.target.value))}
                                    className="w-full"
                                />

                                <p className="text-xs text-gray-500 mt-1">
                                    Concurrent SSH sessions
                                </p>
                            </div>

                            {/* Run Timeout */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Run timeout
                                    </label>

                                    <span className="text-sm font-semibold text-gray-800">
                                        {runTimeout} min
                                    </span>
                                </div>

                                <input
                                    type="range"
                                    min="10"
                                    max="240"
                                    value={runTimeout}
                                    onChange={(e) => setRunTimeout(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            {/* Switches */}
                            <div className="space-y-4">
                                <Toggle label="Follow BGP peers into walk queue" enabled />
                                <Toggle label="Follow IS-IS inter-area (L2) neighbours" enabled />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 rounded-sm border border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button className="bg-blue-800 hover:bg-blue-900 text-white text-sm px-5 py-1.5 rounded-sm font-medium btn-small">
                                ▶ Start discovery
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* Toggle Switch Component */
function Toggle({ label, enabled }) {
    const [isOn, setIsOn] = useState(enabled);

    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{label}</span>

            <button
                onClick={() => setIsOn(!isOn)}
                className={`w-12 h-6 rounded-full flex items-center px-1 transition ${isOn ? "bg-blue-600" : "bg-gray-300"
                    }`}
            >
                <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${isOn ? "translate-x-6" : "translate-x-0"
                        }`}
                />
            </button>
        </div>
    );
}