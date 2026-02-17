'use client';

import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4">
                <span className="text-gray-600">{user?.name}</span>
                <button 
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}