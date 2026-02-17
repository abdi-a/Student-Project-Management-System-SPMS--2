'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

export default function AdminReports() {
    const [reportType, setReportType] = useState('project_status');
    const [generating, setGenerating] = useState(false);

    const handleDownload = (format: 'pdf' | 'csv') => {
        setGenerating(true);
        setTimeout(() => {
            alert(`Downloading ${format.toUpperCase()} report... (Mock)`);
            setGenerating(false);
        }, 1500);
    };

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">System Reports</h1>
            
            <div className="bg-white shadow sm:rounded-lg p-6 max-w-2xl mx-auto">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Report Type</label>
                    <select 
                        value={reportType} 
                        onChange={(e) => setReportType(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="project_status">Project Status Summary</option>
                        <option value="evaluations">Evaluation Results</option>
                        <option value="user_activity">User Activity Log</option>
                        <option value="supervisor_load">Supervisor Workload</option>
                    </select>
                </div>

                <div className="flex gap-4 justify-end">
                    <button
                        onClick={() => handleDownload('csv')}
                        disabled={generating}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Export CSV
                    </button>
                    <button
                        onClick={() => handleDownload('pdf')}
                        disabled={generating}
                        className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {generating ? 'Generating...' : 'Export PDF'}
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Draft Reports</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center text-gray-500">
                    No recent reports generated.
                </div>
            </div>
        </DashboardLayout>
    );
}