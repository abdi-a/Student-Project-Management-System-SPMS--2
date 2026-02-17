'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const MOCK_REVIEWS = [
    { id: 201, title: 'Smart Farming IoT', student: 'John Doe', stage: 'Proposal Defense', status: 'Pending' },
    { id: 203, title: 'Blockchain Voting', student: 'Mike Ross', stage: 'Final Defense', status: 'Pending' },
];

export default function EvaluatorReviews() {
    const [reviews, setReviews] = useState(MOCK_REVIEWS);

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">Pending Reviews</h1>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {reviews.map((review) => (
                        <li key={review.id} className="block hover:bg-gray-50">
                            <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-medium text-indigo-600 truncate">{review.title}</h3>
                                    <div className="mt-2 flex">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <p>Student: {review.student}</p> 
                                            <span className="mx-2">•</span>
                                            <p>Stage: {review.stage}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-5 flex-shrink-0">
                                    <button className="bg-indigo-600 px-4 py-2 rounded text-white text-sm hover:bg-indigo-700">
                                        Grade Now
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                    {reviews.length === 0 && (
                        <li className="px-4 py-4 text-center text-gray-500">No pending reviews.</li>
                    )}
                </ul>
            </div>
        </DashboardLayout>
    );
}