'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Link from 'next/link';
import api from '../../lib/axios';

// Fallback Mock Data in case API fails
const MOCK_TASKS = [
    { id: 201, title: 'Smart Farming IoT', student: 'John Doe', stage: 'Proposal Defense', date: '2023-11-20', status: 'Pending' },
    { id: 202, title: 'Library Management System', student: 'Sarah Lee', stage: 'Mid-Term Review', date: '2023-11-22', status: 'Graded' },
    { id: 203, title: 'Blockchain E-Voting', student: 'Mike Ross', stage: 'Final Defense', date: '2023-11-25', status: 'Pending' },
];

export default function EvaluatorDashboard() {
    const [evaluations, setEvaluations] = useState<any[]>(MOCK_TASKS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
             try {
                // Fetch assigned evaluations from API
                // const response = await api.get('/evaluations/assigned');
                // setEvaluations(response.data);
                
                // Simulating network delay for now since endpoint might vary
                 setTimeout(() => {
                     setEvaluations(MOCK_TASKS);
                     setLoading(false);
                 }, 500);
             } catch (error) {
                 console.error("Failed to fetch evaluations", error);
                 setLoading(false);
             }
        };
        fetchData();
    }, []);

    if (loading) return <DashboardLayout><div>Loading dashboard...</div></DashboardLayout>;

    const pendingCount = evaluations.filter(t => t.status === 'Pending').length;
    const completedCount = evaluations.filter(t => t.status === 'Graded' || t.status === 'Completed').length;

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Evaluator Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                 <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Pending Evaluations</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{pendingCount}</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Completed Evaluations</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{completedCount}</p>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Assigned Evaluations</h3>
                    <Link href="/dashboard/evaluator/reviews" className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                        View All
                    </Link>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {evaluations.slice(0, 5).map((task) => (
                            <tr key={task.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.student}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.stage}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {task.status === 'Pending' ? (
                                        <Link 
                                            href={`/dashboard/evaluator/reviews/${task.id}`}
                                            className="bg-indigo-600 text-white px-3 py-1 rounded text-xs hover:bg-indigo-700 inline-block"
                                        >
                                            Evaluate
                                        </Link>
                                    ) : (
                                        <span className="text-green-600 font-semibold text-xs bg-green-100 px-2 py-1 rounded-full">Completed</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}