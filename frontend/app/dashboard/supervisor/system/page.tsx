'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

export default function SupervisorSystemTools() {
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [availability, setAvailability] = useState('Available');

    const handleSendMessage = () => {
        if (!message) return;
        setSending(true);
        setTimeout(() => {
            alert('Request sent to System Admin!');
            setMessage('');
            setSending(false);
        }, 1000);
    };

    const handleAvailabilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAvailability(e.target.value);
        alert(`Availability status updated to: ${e.target.value}`);
    };

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">Supervisor System Tools</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Supervisor Settings */}
                <div className="bg-white shadow sm:rounded-lg p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Profile & Settings</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Availability Status</label>
                        <select 
                            value={availability}
                            onChange={handleAvailabilityChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                        >
                            <option>Available</option>
                            <option>Busy</option>
                            <option>Away</option>
                            <option>Do Not Disturb</option>
                        </select>
                        <p className="mt-2 text-xs text-gray-500">This status is visible to students looking for consultation.</p>
                    </div>
                    <div className="border-t pt-4">
                        <button className="text-sm text-indigo-600 hover:text-indigo-900">Update Profile Information</button>
                    </div>
                </div>

                {/* Contact Admin */}
                <div className="bg-white shadow sm:rounded-lg p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Contact System Administrator</h3>
                    <p className="text-sm text-gray-500 mb-4">Report system issues or request access changes.</p>
                    <textarea 
                        rows={3} 
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        placeholder="Describe your request..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="mt-4 flex justify-end">
                        <button 
                            onClick={handleSendMessage}
                            disabled={sending || !message}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {sending ? 'Sending...' : 'Send Request'}
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}