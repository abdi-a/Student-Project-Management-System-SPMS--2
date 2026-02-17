'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

import api from '../../../lib/axios';
import { useEffect } from 'react';

export default function SupervisorProjects() {
    const [projects, setProjects] = useState<any[]>([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');
                setProjects(response.data);
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = filter === 'All' 
        ? projects 
        : projects.filter(p => p.status === filter);

    if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Assigned Projects</h1>
                <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-sm"
                >
                    <option value="All">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {filteredProjects.map((project) => (
                        <li key={project.id}>
                            <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="text-sm font-medium text-indigo-600 truncate">{project.title}</div>
                                    <div className="ml-2 flex-shrink-0 flex">
                                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${project.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                              project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {project.status.replace('_', ' ')}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2 text-sm text-gray-500 sm:mt-0 flex gap-4 items-center">
                                    <p>Student: {project.student ? project.student.name : 'Unknown'}</p>
                                    <a href={`/dashboard/supervisor/projects/${project.id}`} className="text-indigo-600 hover:text-indigo-900 font-medium">Manage &rarr;</a>
                                </div>
                            </div>
                        </li>
                    ))}
                    {filteredProjects.length === 0 && (
                        <li className="px-4 py-8 text-center text-gray-500">No projects found.</li>
                    )}
                </ul>
            </div>
        </DashboardLayout>
    );
}