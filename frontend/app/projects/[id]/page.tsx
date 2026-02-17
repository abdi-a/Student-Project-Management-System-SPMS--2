'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../lib/axios';

export default function ProjectDetailsPage() {
    const { id } = useParams();
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [project, setProject] = useState<any>(null);
    const [loadingProject, setLoadingProject] = useState(true);
    
    // Submission state
    const [file, setFile] = useState<File | null>(null);
    const [submissionType, setSubmissionType] = useState('proposal');
    const [submissionComments, setSubmissionComments] = useState('');
    const [submissionError, setSubmissionError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Evaluation state
    const [evalScore, setEvalScore] = useState<number>(0);
    const [evalFeedback, setEvalFeedback] = useState('');
    const [activeSubmissionId, setActiveSubmissionId] = useState<number | null>(null);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        } else if (user && id) {
            fetchProject();
        }
    }, [user, isLoading, id, router]);

    const fetchProject = async () => {
        try {
            const response = await api.get(`/projects/${id}`);
            setProject(response.data);
        } catch (error) {
            console.error('Failed to fetch project', error);
        } finally {
            setLoadingProject(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmission = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setSubmissionError('Please select a file');
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('title', `${submissionType} for ${project.title}`);
        formData.append('file', file);
        formData.append('type', submissionType);
        formData.append('comments', submissionComments);

        try {
            await api.post(`/projects/${id}/submissions`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFile(null);
            setSubmissionComments('');
            fetchProject(); // Refresh to show new submission
        } catch (error: any) {
            setSubmissionError(error.response?.data?.message || 'Upload failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEvaluation = async (submissionId: number) => {
        try {
            await api.post(`/submissions/${submissionId}/evaluations`, {
                score: evalScore,
                feedback: evalFeedback,
                status: 'graded'
            });
            setActiveSubmissionId(null);
            fetchProject();
        } catch (error) {
            console.error('Evaluation failed', error);
        }
    };

    if (loadingProject || !user) return <div>Loading...</div>;
    if (!project) return <div>Project not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <button onClick={() => router.back()} className="mb-4 text-blue-600 hover:underline">&larr; Back to Dashboard</button>
            
            <div className="bg-white shadow rounded-lg p-6 mb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded text-sm font-semibold capitalize
                        ${project.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100'}`}>
                        {project.status.replace('_', ' ')}
                    </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600 border-t pt-4">
                    <div>
                        <span className="font-semibold block">Student:</span> 
                        {project.student?.name} ({project.student?.email})
                    </div>
                    <div>
                        <span className="font-semibold block">Supervisor:</span> 
                        {project.supervisor?.name || 'Not Assigned'}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Submissions List */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Project Submissions</h2>
                    <div className="space-y-4">
                        {project.submissions && project.submissions.length > 0 ? (
                            project.submissions.map((sub: any) => (
                                <div key={sub.id} className="border rounded p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-gray-900 capitalize">{sub.type.replace('_', ' ')}</h3>
                                        <span className="text-xs text-gray-500">{new Date(sub.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">Comments: {sub.comments || 'None'}</p>
                                    <div className="flex gap-2 mb-4">
                                        <a href={`http://localhost:8000/storage/${sub.file_path}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                                            Download File
                                        </a>
                                    </div>

                                    {/* Evaluations Limit Display */}
                                    {sub.evaluations && sub.evaluations.length > 0 && (
                                        <div className="bg-gray-50 p-3 rounded text-sm">
                                            <p className="font-semibold">Evaluations:</p>
                                            {sub.evaluations.map((ev: any) => (
                                                <div key={ev.id} className="mt-1 pl-2 border-l-2 border-blue-200">
                                                    <p>Score: {ev.score}/100</p>
                                                    <p className="text-gray-600 italic">"{ev.feedback}"</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Evaluation Form for Supervisor/Evaluator */}
                                    {(user.role === 'supervisor' || user.role === 'evaluator') && !activeSubmissionId && (
                                        <button 
                                            onClick={() => setActiveSubmissionId(sub.id)}
                                            className="mt-2 text-sm bg-indigo-600 text-white px-3 py-1 rounded"
                                        >
                                            Evaluate
                                        </button>
                                    )}

                                    {activeSubmissionId === sub.id && (
                                        <div className="mt-4 p-4 bg-gray-100 rounded">
                                            <h4 className="font-semibold mb-2">Submit Evaluation</h4>
                                            <input 
                                                type="number" 
                                                placeholder="Score (0-100)"
                                                value={evalScore}
                                                onChange={(e) => setEvalScore(Number(e.target.value))}
                                                className="w-full p-2 mb-2 border rounded"
                                            />
                                            <textarea 
                                                placeholder="Feedback"
                                                value={evalFeedback}
                                                onChange={(e) => setEvalFeedback(e.target.value)}
                                                className="w-full p-2 mb-2 border rounded"
                                            ></textarea>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEvaluation(sub.id)} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Submit</button>
                                                <button onClick={() => setActiveSubmissionId(null)} className="bg-gray-400 text-white px-3 py-1 rounded text-sm">Cancel</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic">No submissions yet.</p>
                        )}
                    </div>
                </div>

                {/* Submission Form (Only for Student) */}
                {user.role === 'student' && (
                    <div className="bg-white shadow rounded-lg p-6 h-fit">
                        <h2 className="text-xl font-bold mb-4">New Submission</h2>
                        {submissionError && <p className="text-red-500 mb-2 text-sm">{submissionError}</p>}
                        <form onSubmit={handleSubmission}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Submission Type</label>
                                <select 
                                    className="w-full border rounded p-2"
                                    value={submissionType}
                                    onChange={(e) => setSubmissionType(e.target.value)}
                                >
                                    <option value="proposal">Proposal</option>
                                    <option value="progress_report">Progress Report</option>
                                    <option value="final_report">Final Report</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                                <input type="file" onChange={handleFileChange} className="w-full" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
                                <textarea 
                                    className="w-full border rounded p-2"
                                    value={submissionComments}
                                    onChange={(e) => setSubmissionComments(e.target.value)}
                                    rows={3}
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Uploading...' : 'Submit Work'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
