import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import DiscoveryModal from "./DiscoveryModal";
import SearchTop from "./SearchTop";

export default function Header({ openDiscovery, setOpenDiscovery, setSearchQuery }) {
    const [notifications] = useState(3);
    return (
        <div className="h-14 bg-white border-b flex items-center justify-between px-4">

            {/* LEFT */}
            <div className="font-bold text-blue-900">
                Jio Discover <span className="text-gray-400 text-sm">v1.0</span>
            </div>

            {/* SEARCH */}
            <SearchTop setSearchQuery={setSearchQuery} />

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3">
                {/* 🔔 NOTIFICATION BELL */}
                <button className="relative p-2 rounded hover:bg-gray-100 transition">

                    <svg
                        className="w-5 h-5 text-gray-700"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V11c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 10-3 0v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                    </svg>

                    {/* BADGE */}
                    {notifications > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                            {notifications}
                        </span>
                    )}

                </button>

                <button 
                    className="bg-blue-900 text-white px-3 py-1 rounded text-sm flex items-center gap-2"
                    onClick={() => setOpenDiscovery(!openDiscovery)}
                >
                    <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    Run discovery
                </button>

                {/* Profile */}
                <ProfileDropdown />
            </div>
        </div>
    );
}