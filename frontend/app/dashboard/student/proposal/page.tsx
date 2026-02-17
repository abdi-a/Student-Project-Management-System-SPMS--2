'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import api from '../../../lib/axios';
import { useRouter } from 'next/navigation';

export default function SubmitProposal() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [supervisorId, setSupervisorId] = useState('');
    const [loading, setLoading] = useState(false);
    const [supervisors, setSupervisors] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchSupervisors = async () => {
            try {
                const response = await api.get('/users?role=supervisor');
                setSupervisors(response.data);
            } catch (error) {
                console.error("Failed to fetch supervisors", error);
            }
        };
        fetchSupervisors();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/projects', { 
                title, 
                description, 
                supervisor_id: supervisorId 
            });
            alert('Proposal submitted successfully!');
            router.push('/dashboard/student');
        } catch (error) {
            console.error(error);
            alert('Failed to submit proposal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">Submit Project Proposal</h1>
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Project Title</label>
                        <input 
                            type="text" 
                            required 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea 
                            required 
                            rows={5}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Preferred Supervisor</label>
                        <select 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={supervisorId}
                            onChange={(e) => setSupervisorId(e.target.value)}
                            required
                        >
                            <option value="">Select a Supervisor</option>
                            {supervisors.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {loading ? 'Submitting...' : 'Submit Proposal'}
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}