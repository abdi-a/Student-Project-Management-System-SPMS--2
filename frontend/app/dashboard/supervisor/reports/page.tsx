'use client';

import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

// Mock Data
const SUPERVISOR_REPORTS = [
    { id: 101, title: 'Smart Farming IoT', student: 'John Doe', status: 'In Progress', progress: 60, lastUpdate: '2023-11-15' },
    { id: 102, title: 'E-Commerce AI', student: 'Jane Smith', status: 'Pending Review', progress: 40, lastUpdate: '2023-11-18' },
    { id: 103, title: 'Blockchain Voting', student: 'Mike Ross', status: 'Completed', progress: 100, lastUpdate: '2023-11-10' },
];

export default function SupervisorReports() {
    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Supervision Reports</h1>

            <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Student Progress Overview</h3>
                    <button className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">Export PDF</button>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {SUPERVISOR_REPORTS.map((report) => (
                            <tr key={report.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.student}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        report.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                        report.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {report.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${report.progress}%` }}></div>
                                    </div>
                                    <span className="text-xs mt-1 inline-block">{report.progress}%</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.lastUpdate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}