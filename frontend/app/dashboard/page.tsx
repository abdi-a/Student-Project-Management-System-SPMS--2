'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import api from '../lib/axios';
import CreateProjectModal from '../components/CreateProjectModal';

export default function Dashboard() {
    const { user, logout, isLoading } = useAuth();
    const [projects, setProjects] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
        if (user) {
            fetchProjects();
        }
    }, [user, isLoading, router]);

    const fetchProjects = async () => {
        try {
            const response = await api.get('/projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Failed to fetch projects', error);
        }
    };

    const handleProjectCreated = (newProject: any) => {
        setProjects([...projects, newProject]);
    };

    if (isLoading || !user) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">SPMS Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">Welcome, {user.name} ({user.role})</span>
                    <button onClick={logout} className="text-red-600 hover:text-red-800 font-medium">Logout</button>
                </div>
            </nav>

            <main className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
                    {user.role === 'student' && (
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            New Proposal
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project: any) => (
                        <div 
                            key={project.id} 
                            onClick={() => router.push(`/projects/${project.id}`)}
                            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition cursor-pointer"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                            <div className="flex justify-between items-center text-sm">
                                <span className={`px-2 py-1 rounded ${
                                    project.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                </span>
                                <span className="text-gray-500">
                                    {project.supervisor ? `Supervisor: ${project.supervisor.name}` : 'No Supervisor'}
                                </span>
                            </div>
                        </div>
                    ))}
                    {projects.length === 0 && (
                        <p className="text-gray-500 italic col-span-full text-center py-8">No projects found.</p>
                    )}
                </div>

                {isModalOpen && (
                    <CreateProjectModal 
                        isOpen={isModalOpen} 
                        onClose={() => setIsModalOpen(false)} 
                        onProjectCreated={handleProjectCreated} 
                    />
                )}
            </main>
        </div>
    );
}
