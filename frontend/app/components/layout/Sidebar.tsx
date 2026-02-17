'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
    const { user } = useAuth();
    const pathname = usePathname();

    const links = {
        admin: [
            { href: '/dashboard/admin', label: 'Overview' },
            { href: '/dashboard/admin/users', label: 'Manage Users' },
            { href: '/dashboard/admin/projects', label: 'All Projects' },
            { href: '/dashboard/admin/evaluations', label: 'Evaluations' },
            { href: '/dashboard/admin/reports', label: 'Reports' },
            { href: '/dashboard/admin/system', label: 'System Tools' },
        ],
        student: [
            { href: '/dashboard/student', label: 'My Project' },
            { href: '/dashboard/student/submissions', label: 'Submissions' },
            { href: '/dashboard/student/reports', label: 'Reports' },
            { href: '/dashboard/student/system', label: 'System Tools' },
        ],
        supervisor: [
            { href: '/dashboard/supervisor', label: 'Overview' },
            { href: '/dashboard/supervisor/projects', label: 'Assigned Projects' },
        ],
        evaluator: [
            { href: '/dashboard/evaluator', label: 'Overview' },
            { href: '/dashboard/evaluator/reviews', label: 'Pending Reviews' },
        ],
    };

    const roleLinks = user ? links[user.role] || [] : [];

    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen">
            <div className="p-6">
                <h2 className="text-2xl font-bold">SPMS</h2>
                <p className="text-sm text-gray-400 mt-1 capitalize">{user?.role} Portal</p>
            </div>
            <nav className="mt-6">
                {roleLinks.map((link) => (
                    <Link 
                        key={link.href} 
                        href={link.href}
                        className={`block py-2.5 px-4 transition duration-200 hover:bg-gray-800 ${
                            pathname === link.href ? 'bg-gray-800 border-l-4 border-blue-500' : ''
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}