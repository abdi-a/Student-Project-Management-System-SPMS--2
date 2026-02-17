'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Link from 'next/link';

// Mock data for initial display
const MOCK_PROJECT = {
    title: 'Student Project Management System',
    description: 'A comprehensive system to manage student final year projects.',
    status: 'In Progress',
    supervisor: 'Dr. Smith',
    deadline: '2023-12-15'
};

const MOCK_TASKS = [
    { id: 1, title: 'Submit Proposal', status: 'Completed', deadline: '2023-10-01' },
    { id: 2, title: 'Chapter 1 Draft', status: 'Pending', deadline: '2023-10-15' },
    { id: 3, title: 'Database Design', status: 'In Progress', deadline: '2023-10-30' },
];

export default function StudentDashboard() {
    const [project, setProject] = useState<any>(MOCK_PROJECT); // Replace with API call later

    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Project Status Card */}
                <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">My Project</h2>
                    {project ? (
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">Supervisor: {project.supervisor}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                                    ${project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                    {project.status}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                            <span className="text-xs text-gray-500">45% Complete</span>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500 mb-4">You have not been assigned a project yet.</p>
                            <Link href="/dashboard/student/proposals" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                                Submit Proposal
                            </Link>
                        </div>
                    )}
                </div>

                {/* Deadlines Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Deadlines</h2>
                    {project && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-red-50 rounded border-l-4 border-red-500">
                                <div>
                                    <p className="text-sm font-medium text-red-800">Final Submission</p>
                                    <p className="text-xs text-red-600">{project.deadline}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Tasks / Milestones */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Milestones</h3>
                </div>
                <ul className="divide-y divide-gray-200">
                    {MOCK_TASKS.map((task) => (
                        <li key={task.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                            <div className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    checked={task.status === 'Completed'} 
                                    readOnly 
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <div className="ml-3">
                                    <p className={`text-sm font-medium ${task.status === 'Completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                                        {task.title}
                                    </p>
                                    <p className="text-xs text-gray-500">Due: {task.deadline}</p>
                                </div>
                            </div>
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                  task.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                                {task.status}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </DashboardLayout>
    );
}