'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import api from '../../../lib/axios';

export default function AdminProjects() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/projects')
            .then(res => {
                setProjects(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">All Projects (Admin View)</h1>
             <p className="text-gray-500 mb-4">Master list of all projects across the system.</p>
             
             <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {projects.map((project) => (
                        <li key={project.id} className="block hover:bg-gray-50 p-4 border-b">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium text-indigo-600">{project.title}</h3>
                                    <div className="mt-1 text-sm text-gray-500">
                                        Student: {project.student?.name} | Supervisor: {project.supervisor?.name || 'Unassigned'}
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                    ${project.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                    {project.status}
                                </span>
                            </div>
                        </li>
                    ))}
                    {projects.length === 0 && (
                        <li className="p-4 text-center text-gray-500">No projects found.</li>
                    )}
                </ul>
            </div>
        </DashboardLayout>
    );
}