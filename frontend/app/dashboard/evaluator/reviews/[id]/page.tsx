'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useParams, useRouter } from 'next/navigation';

export default function GradingPage() {
    const params = useParams();
    const router = useRouter();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    
    // Grading Form State
    const [score, setScore] = useState<number | ''>('');
    const [comments, setComments] = useState('');
    const [decision, setDecision] = useState('Pending');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // Mock API call to fetch project details based on ID
        const fetchProjectDetails = () => {
             // In real app: const data = await api.get(`/evaluations/${params.id}`);
             setTimeout(() => {
                 setProject({
                     id: params.id,
                     title: 'Smart Farming IoT System',
                     student: 'John Doe',
                     abstract: 'This project aims to automate irrigation using soil moisture sensors and cloud data analysis.',
                     files: [
                         { name: 'Project_Proposal.pdf', url: '#' },
                         { name: 'System_Architecture.png', url: '#' }
                     ],
                     rubric: [
                         { criterion: 'Originality', max: 20 },
                         { criterion: 'Technical Depth', max: 30 },
                         { criterion: 'Implementation', max: 30 },
                         { criterion: 'Documentation', max: 20 }
                     ]
                 });
                 setLoading(false);
             }, 800);
        };
        fetchProjectDetails();
    }, [params.id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        
        // Mock Submission
        setTimeout(() => {
            alert(`Evaluation Submitted!\nScore: ${score}\nDecision: ${decision}`);
            setSubmitting(false);
            router.push('/dashboard/evaluator/reviews'); // Go back to list
        }, 1500);
    };

    if (loading) return <DashboardLayout><div className="p-6">Loading project details...</div></DashboardLayout>;
    if (!project) return <DashboardLayout><div className="p-6">Project not found.</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <button onClick={() => router.back()} className="text-sm text-indigo-600 hover:text-indigo-800 mb-2">&larr; Back to Pending Reviews</button>
                    <h1 className="text-2xl font-bold text-gray-900">Evaluate Project: {project.title}</h1>
                    <p className="text-gray-500">Student: {project.student}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Left Column: Project Details */}
                    <div className="space-y-6">
                        <div className="bg-white shadow sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Project Overview</h3>
                            <p className="text-gray-700 mb-4">{project.abstract}</p>
                            
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Submitted Files:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                {project.files.map((file: any, idx: number) => (
                                    <li key={idx}>
                                        <a href={file.url} className="text-indigo-600 hover:underline text-sm">{file.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                         <div className="bg-white shadow sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Grading Rubric</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {project.rubric.map((item: any, idx: number) => (
                                    <li key={idx} className="flex justify-between">
                                        <span>{item.criterion}</span>
                                        <span className="font-semibold">{item.max} pts</span>
                                    </li>
                                ))}
                                <li className="pt-2 border-t flex justify-between font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>100 pts</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Grading Form */}
                    <div className="bg-white shadow sm:rounded-lg p-6 h-fit">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Evaluation Form</h3>
                        <form onSubmit={handleSubmit}>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Score (0-100)</label>
                                <input 
                                    type="number" 
                                    min="0" max="100"
                                    required
                                    value={score}
                                    onChange={(e) => setScore(Number(e.target.value))}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Feedback & Comments</label>
                                <textarea 
                                    rows={5}
                                    required
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    placeholder="Provide detailed feedback for the student..."
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border"
                                ></textarea>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Final Decision</label>
                                <select 
                                    value={decision}
                                    onChange={(e) => setDecision(e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border bg-white"
                                >
                                    <option value="Pending">Select Decision...</option>
                                    <option value="Approved">Approve</option>
                                    <option value="Minor Revisions">Minor Revisions Needed</option>
                                    <option value="Major Revisions">Major Revisions Needed</option>
                                    <option value="Rejected">Reject</option>
                                </select>
                            </div>

                            <div className="flex justify-end">
                                <button 
                                    type="submit" 
                                    disabled={submitting || decision === 'Pending'}
                                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                >
                                    {submitting ? 'Submitting...' : 'Submit Evaluation'}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}