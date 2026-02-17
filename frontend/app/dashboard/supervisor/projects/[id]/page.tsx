'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useParams } from 'next/navigation';

// Mock data to simulate fetching a single project details + submissions
const MOCK_PROJECT_DETAILS = {
    id: 101,
    title: 'Smart Farming IoT',
    description: 'An IoT based solution for monitoring soil moisture and automating irrigation.',
    student: { name: 'John Doe', email: 'john@student.edu' },
    status: 'In Progress',
    submissions: [
        { id: 1, title: 'Project Proposal', date: '2023-10-01', file: 'proposal.pdf', status: 'Approved', feedback: 'Good start.' },
        { id: 2, title: 'Chapter 1: Intro', date: '2023-10-15', file: 'ch1_v1.pdf', status: 'Revision Requested', feedback: 'Needs more references.' },
        { id: 3, title: 'Chapter 1: Intro (v2)', date: '2023-10-20', file: 'ch1_v2.pdf', status: 'Pending Review', feedback: '' }
    ]
};

export default function SupervisorProjectManage() {
    const params = useParams();
    const projectId = params.id;
    // In a real app, use projectId to fetch data via API
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');
    const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setProject(MOCK_PROJECT_DETAILS);
            setLoading(false);
        }, 800);
    }, [projectId]);

    const handleSendMessage = () => {
        if (!message) return;
        alert(`Message sent to ${project.student.name}: ${message}`);
        setMessage('');
    };

    const handleSubmitReview = (submissionId: number, status: string) => {
        if (!feedback) {
            alert('Please provide feedback first.');
            return;
        }
        alert(`Submission #${submissionId} marked as ${status} with feedback: ${feedback}`);
        // Update local state to reflect change
        const updatedSubmissions = project.submissions.map((sub: any) => 
            sub.id === submissionId ? { ...sub, status, feedback } : sub
        );
        setProject({ ...project, submissions: updatedSubmissions });
        setFeedback('');
        setSelectedSubmission(null);
    };

    if (loading) return <DashboardLayout><div className="p-6">Loading project details...</div></DashboardLayout>;
    if (!project) return <DashboardLayout><div className="p-6">Project not found.</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="mb-6 flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
                    <p className="text-sm text-gray-500 mt-1">Student: <span className="font-medium text-gray-900">{project.student.name}</span> ({project.student.email})</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold 
                    ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {project.status}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Submissions & Reviews */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Student Submissions</h3>
                        </div>
                        <ul className="divide-y divide-gray-200">
                            {project.submissions.map((sub: any) => (
                                <li key={sub.id} className="p-6 hover:bg-gray-50">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="text-md font-medium text-indigo-600">{sub.title}</h4>
                                            <p className="text-xs text-gray-500">Submitted on {sub.date}</p>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium 
                                            ${sub.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                                              sub.status === 'Revision Requested' ? 'bg-red-100 text-red-800' : 
                                              'bg-yellow-100 text-yellow-800'}`}>
                                            {sub.status}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                                        <span>📄 {sub.file}</span>
                                        <button className="text-indigo-600 hover:underline text-xs">Download</button>
                                    </div>

                                    {/* Action Area */}
                                    {sub.status === 'Pending Review' || selectedSubmission === sub.id ? (
                                        <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
                                            <h5 className="text-sm font-medium text-gray-900 mb-2">Provide Feedback</h5>
                                            <textarea
                                                className="w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border mb-3"
                                                rows={3}
                                                placeholder="Enter your comments here..."
                                                value={selectedSubmission === sub.id ? feedback : ''}
                                                onChange={(e) => {
                                                    setSelectedSubmission(sub.id);
                                                    setFeedback(e.target.value);
                                                }}
                                            ></textarea>
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => handleSubmitReview(sub.id, 'Approved')}
                                                    className="bg-green-600 text-white px-3 py-1.5 rounded text-xs hover:bg-green-700"
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    onClick={() => handleSubmitReview(sub.id, 'Revision Requested')}
                                                    className="bg-red-600 text-white px-3 py-1.5 rounded text-xs hover:bg-red-700"
                                                >
                                                    Request Revision
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mt-2 text-sm bg-gray-50 p-3 rounded text-gray-700 italic border border-gray-100">
                                            " {sub.feedback || 'No feedback provided yet.'} "
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Column: Communication */}
                <div className="space-y-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Message Student</h3>
                        <textarea 
                            rows={4}
                            className="w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border mb-4"
                            placeholder={`Send a notification to ${project.student.name}...`}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button 
                            onClick={handleSendMessage}
                            disabled={!message}
                            className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                        >
                            Send Notification
                        </button>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Project Quick Actions</h3>
                        <ul className="space-y-2">
                            <li>
                                <button className="w-full text-left text-sm text-gray-700 hover:bg-gray-50 p-2 rounded block">
                                    Download All Files (Zip)
                                </button>
                            </li>
                            <li>
                                <button className="w-full text-left text-sm text-gray-700 hover:bg-gray-50 p-2 rounded block">
                                    View Project History
                                </button>
                            </li>
                            <li>
                                <button className="w-full text-left text-sm text-red-600 hover:bg-red-50 p-2 rounded block">
                                    Report Issue to Admin
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}