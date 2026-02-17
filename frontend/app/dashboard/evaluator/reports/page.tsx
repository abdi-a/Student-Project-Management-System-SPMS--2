'use client';

import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

// Mock Data
const EVALUATION_HISTORY = [
    { id: 201, title: 'Smart Farming IoT', student: 'John Doe', stage: 'Proposal Defense', score: 85, date: '2023-11-20', status: 'Graded' },
    { id: 202, title: 'Library Management System', student: 'Sarah Lee', stage: 'Mid-Term Review', score: 78, date: '2023-11-22', status: 'Graded' },
    { id: 203, title: 'Blockchain Voting', student: 'Mike Ross', stage: 'Final Defense', score: 92, date: '2023-11-25', status: 'Graded' },
];

export default function EvaluatorReports() {
    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Evaluation History</h1>

            <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Past Evaluations</h3>
                    <button className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">Download Record</button>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {EVALUATION_HISTORY.map((record) => (
                            <tr key={record.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.student}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.stage}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{record.score}/100</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}