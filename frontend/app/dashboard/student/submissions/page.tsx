'use client';

import Link from 'next/link';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const MOCK_SUBMISSIONS = [
    { id: 1, title: 'Smart Farming IoT', status: 'Approved', date: '2023-09-15' },
    { id: 2, title: 'Library System', status: 'Rejected', date: '2023-09-01' },
];

export default function StudentSubmissions() {
    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Submissions</h1>
                <Link href="/dashboard/student/proposal" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                    New Proposal
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {MOCK_SUBMISSIONS.map((sub) => (
                        <li key={sub.id} className="block hover:bg-gray-50">
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-indigo-600 truncate">{sub.title}</p>
                                    <div className="ml-2 flex-shrink-0 flex">
                                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${sub.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                                              sub.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {sub.status}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                    <div className="sm:flex">
                                        <p className="flex items-center text-sm text-gray-500">
                                            Submitted on {sub.date}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                    {MOCK_SUBMISSIONS.length === 0 && (
                        <li className="px-4 py-8 text-center text-gray-500">
                            No submissions found. Start by creating a new proposal.
                        </li>
                    )}
                </ul>
            </div>
        </DashboardLayout>
    );
}