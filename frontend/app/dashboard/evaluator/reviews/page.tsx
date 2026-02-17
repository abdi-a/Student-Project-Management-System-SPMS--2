'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import api from '../../../lib/axios';
import Link from 'next/link';

export default function EvaluatorReviews() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
             try {
                const response = await api.get('/submissions');
                setReviews(response.data);
             } catch (error) {
                 console.error(error);
             } finally {
                 setLoading(false);
             }
        }
        fetchReviews();
    }, []);

    if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">Pending Reviews</h1>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {reviews.map((review) => (
                        <li key={review.id} className="block hover:bg-gray-50">
                            <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-medium text-indigo-600 truncate">
                                        {review.title} <span className="text-gray-400 text-sm">({review.project?.title})</span>
                                    </h3>
                                    <div className="mt-2 flex">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <p>Student: {review.student?.name}</p> 
                                            <span className="mx-2">•</span>
                                            <p>Type: {review.type}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-5 flex-shrink-0">
                                    <Link 
                                        href={`/dashboard/evaluator/reviews/${review.id}`}
                                        className="bg-indigo-600 px-4 py-2 rounded text-white text-sm hover:bg-indigo-700 inline-block"
                                    >
                                        Grade Now
                                    </Link>
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