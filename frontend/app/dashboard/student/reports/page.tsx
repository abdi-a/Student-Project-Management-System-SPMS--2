'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import api from '../../../lib/axios';

interface Project {
    id: number;
    title: string;
    description: string;
    status: string;
    supervisor?: { name: string };
    created_at: string;
}

export default function StudentReports() {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
             try {
                 const res = await api.get('/projects');
                 if (res.data && res.data.length > 0) {
                     setProject(res.data[0]);
                 }
             } catch (error) {
                 console.error(error);
             } finally {
                 setLoading(false);
             }
        };
        fetchProject();
    }, []);

    const handleExport = (format: 'pdf' | 'csv') => {
        if (!project) return;
        setGenerating(true);
        setTimeout(() => {
            alert(`Exporting ${format.toUpperCase()} report for project "${project.title}"... (Mock)`);
            setGenerating(false);
        }, 1500);
    };

    if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>;

    if (!project) {
        return (
            <DashboardLayout>
                <div className="text-center py-10">
                    <h2 className="text-xl font-bold text-gray-700">No Project Found</h2>
                    <p className="text-gray-500 mt-2">Submit a proposal to generate reports.</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">My Project Reports</h1>
            
            <div className="bg-white shadow sm:rounded-lg p-6 max-w-2xl mx-auto">
                <div className="mb-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Project Summary</h3>
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                        <p><strong>Title:</strong> {project.title}</p>
                        <p><strong>Supervisor:</strong> {project.supervisor?.name || 'Not Assigned'}</p>
                        <p><strong>Status:</strong> <span className="capitalize">{project.status.replace('_', ' ')}</span></p>
                        <p><strong>Date Added:</strong> {new Date(project.created_at).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Export Options</h4>
                    <div className="flex gap-4">
                        <button
                            onClick={() => handleExport('csv')}
                            disabled={generating}
                            className="flex-1 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Download CSV
                        </button>
                        <button
                            onClick={() => handleExport('pdf')}
                            disabled={generating}
                            className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {generating ? 'Generating...' : 'Download PDF Report'}
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-4 text-center">
                        Includes project details, submission history, and evaluation feedback.
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
}