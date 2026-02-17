'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import api from '../../../lib/axios';

interface Project {
    id: number;
    title: string;
    student: { name: string };
    supervisor?: { name: string };
    status: string;
    evaluator_id?: number;
}

interface User {
    id: number;
    name: string;
    role: string;
}

export default function AdminEvaluations() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [evaluators, setEvaluators] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [projectsRes, usersRes] = await Promise.all([
                api.get('/projects'),
                api.get('/users?role=evaluator')
            ]);
            setProjects(projectsRes.data);
            setEvaluators(usersRes.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAssignEvaluator = async (projectId: number, evaluatorId: string) => {
        if (!evaluatorId) return;
        try {
            // Assuming API supports updating evaluator_id on project
            // Or use a dedicated endpoint like /projects/{id}/assign-evaluator
            // For now, using standard update
            await api.put(`/projects/${projectId}`, { evaluator_id: evaluatorId });
            alert('Evaluator assigned successfully');
            fetchData();
        } catch (error) {
            console.error(error);
            alert('Failed to assign evaluator');
        }
    };

    if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">Evaluation Management</h1>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Project Assignments</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Assign evaluators to student projects.</p>
                </div>
                <ul className="divide-y divide-gray-200">
                    {projects.map((project) => (
                        <li key={project.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                            <div>
                                <p className="text-sm font-medium text-indigo-600 truncate">{project.title}</p>
                                <p className="text-sm text-gray-500">Student: {project.student?.name}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${project.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {project.status}
                                </span>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm text-gray-600">Evaluator:</label>
                                    <select 
                                        className="border rounded text-sm p-1"
                                        value={project.evaluator_id || ''}
                                        onChange={(e) => handleAssignEvaluator(project.id, e.target.value)}
                                    >
                                        <option value="">Select Evaluator</option>
                                        {evaluators.map(ev => (
                                            <option key={ev.id} value={ev.id}>{ev.name}</option>
                                        ))}
                                    </select>
                                </div>
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