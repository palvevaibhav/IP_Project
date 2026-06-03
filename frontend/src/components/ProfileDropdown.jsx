import { useState } from "react";

export default function ProfileDropdown() {
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("auth");
        window.location.href = "/";
    }
    return (
        <div className="relative">

            {/* PROFILE BUTTON */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100"
            >

                {/* Avatar */}
                <img
                    src="https://i.pravatar.cc/40"
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                />

                {/* Name */}
                <div className="text-left leading-tight">
                    <p className="text-sm font-semibold text-gray-800">
                        John Doe
                    </p>
                </div>

                {/* Arrow */}
                <span className="text-gray-500 text-xs">
                    ▾
                </span>

            </button>

            {/* DROPDOWN */}
            {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">

                    <div className="p-3 border-b">
                        <p className="text-sm font-semibold">John Doe</p>
                        <p className="text-xs text-gray-500">john@company.com</p>
                    </div>

                    <ul className="text-sm">

                        <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                            Profile
                        </li>

                        <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                            Settings
                        </li>

                        <li className="px-3 py-2 hover:bg-red-50 text-red-600 cursor-pointer" onClick={handleLogout}>
                            Logout
                        </li>

                    </ul>

                </div>
            )}

        </div>
    );
}