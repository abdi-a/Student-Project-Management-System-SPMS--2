'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

export default function EvaluatorSystemTools() {
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [notifications, setNotifications] = useState(true);

    const handleSendMessage = () => {
        if (!message) return;
        setSending(true);
        setTimeout(() => {
            alert('Panel Availability Request sent!');
            setMessage('');
            setSending(false);
        }, 1000);
    };

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">Evaluator System Tools</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Evaluator Preferences */}
                <div className="bg-white shadow sm:rounded-lg p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Evaluation Preferences</h3>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-700">Receive Evaluation Invites</span>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input 
                                type="checkbox" 
                                checked={notifications} 
                                onChange={() => setNotifications(!notifications)}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                     <p className="text-xs text-gray-500 mb-2">
                        Turn this on to receive automatic notifications when new student projects are ready for evaluation.
                    </p>
                    <div className="border-t pt-4 mt-2">
                         <button className="text-sm text-indigo-600 hover:text-indigo-900">Manage Expertise Areas</button>
                    </div>
                </div>

                {/* Panel Support */}
                <div className="bg-white shadow sm:rounded-lg p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Panel Support & Availability</h3>
                    <p className="text-sm text-gray-500 mb-4">Notify the coordinator about your availability for upcoming defenses.</p>
                    <textarea 
                        rows={3} 
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        placeholder="I am available for defense panels on..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="mt-4 flex justify-end">
                        <button 
                            onClick={handleSendMessage}
                            disabled={sending || !message}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {sending ? 'Sending...' : 'Send Update'}
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}