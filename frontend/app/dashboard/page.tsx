'use client';

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push('/login');
            } else {
                switch (user.role) {
                    case 'admin':
                        router.push('/dashboard/admin');
                        break;
                    case 'student':
                        router.push('/dashboard/student');
                        break;
                    case 'supervisor':
                        router.push('/dashboard/supervisor');
                        break;
                    case 'evaluator':
                        router.push('/dashboard/evaluator');
                        break;
                    default:
                        router.push('/login'); // Or a generic unauthorized page
                }
            }
        }
    }, [user, isLoading, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <p className="text-gray-500">Redirecting to your dashboard...</p>
        </div>
    );
}
