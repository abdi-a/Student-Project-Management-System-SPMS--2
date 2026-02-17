'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const MOCK_PROJECTS = [
    { id: 101, title: 'Smart Farming IoT', student: 'John Doe', status: 'In Progress' },
    { id: 102, title: 'E-Commerce AI', student: 'Jane Smith', status: 'Pending Review' },
    { id: 103, title: 'Blockchain Voting', student: 'Mike Ross', status: 'Completed' },
];

export default function SupervisorProjects() {
    const [projects, setProjects] = useState(MOCK_PROJECTS);
    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All' 
        ? projects 
        : projects.filter(p => p.status === filter);

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
                    <option value="In Progress">In Progress</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Completed">Completed</option>
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
                                            ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                              project.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {project.status}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2 text-sm text-gray-500 sm:mt-0">
                                    <p>Student: {project.student}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </DashboardLayout>
    );
}