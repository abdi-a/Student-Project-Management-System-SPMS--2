'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import api from '../../lib/axios';

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        api.get('/dashboard/stats')
            .then(res => setStats(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!stats) return <DashboardLayout>Loading...</DashboardLayout>;

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-8">Admin Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Students" value={stats.total_students} color="blue" />
                <StatCard title="Total Supervisors" value={stats.total_supervisors} color="green" />
                <StatCard title="Total Evaluators" value={stats.total_evaluators} color="yellow" />
                <StatCard title="Total Projects" value={stats.total_projects} color="indigo" />
            </div>

            <h2 className="text-xl font-bold mb-4">Project Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Pending" value={stats.pending_projects} color="yellow" />
                <StatCard title="In Progress" value={stats.in_progress_projects} color="blue" />
                <StatCard title="Completed" value={stats.completed_projects} color="green" />
            </div>
        </DashboardLayout>
    );
}