'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Link from 'next/link';
import api from '../../lib/axios';

export default function SupervisorDashboard() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
             try {
                 // In a real scenario, we might have a dedicated dashboard endpoint
                 // For now, we can fetch all projects assigned to the supervisor
                 const response = await api.get('/projects'); 
                 setProjects(response.data);
             } catch (error) {
                 console.error("Failed to fetch dashboard data", error);
             } finally {
                 setLoading(false);
             }
        };
        fetchDashboardData();
    }, []);

    if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>;

    // Calculate stats
    const totalStudents = projects.length;
    const pendingReviews = projects.filter(p => p.status === 'pending' || p.status === 'Pending Review').length;
    const completedProjects = projects.filter(p => p.status === 'completed' || p.status === 'Completed').length;

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Supervisor Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Stats Cards */}
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Students</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{totalStudents}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Projects Under Review</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{pendingReviews}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Completed Projects</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{completedProjects}</p>
                </div>
            </div>

            {/* Project List */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Assigned Projects & Students</h3>
                    <Link href="/dashboard/supervisor/projects" className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                        View All
                    </Link>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {projects.slice(0, 5).map((project) => (
                            <tr key={project.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.student ? project.student.name : 'Unknown'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${project.status === 'completed' || project.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                          project.status === 'pending' || project.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                                        {project.status.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {project.nextMilestone || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                                    <Link href={`/dashboard/supervisor/projects/${project.id}`} className="text-indigo-600 hover:text-indigo-900">
                                        Supervise
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}