'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import api from '../../../lib/axios';

export default function StudentSubmissions() {
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmissions = async () => {
             try {
                 // First get the project
                 const projectRes = await api.get('/projects');
                 if (projectRes.data && projectRes.data.length > 0) {
                     const projectId = projectRes.data[0].id;
                     // Then get submissions for that project
                     const subRes = await api.get(`/projects/${projectId}/submissions`);
                     setSubmissions(subRes.data);
                 }
             } catch (error) {
                 console.error(error);
             } finally {
                 setLoading(false);
             }
        };
        fetchSubmissions();
    }, []);

    if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Submissions</h1>
                <Link href="/dashboard/student/proposal" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                    New Proposal / Submission
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {submissions.map((sub) => (
                        <li key={sub.id} className="block hover:bg-gray-50">
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-indigo-600 truncate">{sub.title}</p>
                                    <div className="ml-2 flex-shrink-0 flex">
                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {sub.type}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                    <div className="sm:flex">
                                        <p className="flex items-center text-sm text-gray-500">
                                            Submitted on {new Date(sub.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                    {submissions.length === 0 && (
                        <li className="px-4 py-8 text-center text-gray-500">
                            No submissions found. Start by creating a new proposal.
                        </li>
                    )}
                </ul>
            </div>
        </DashboardLayout>
    );
}