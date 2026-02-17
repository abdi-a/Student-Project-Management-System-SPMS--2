'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

export default function StudentSystemTools() {
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);

    const handleSendMessage = () => {
        if (!message) return;
        setSending(true);
        // Simulate sending to support/supervisor
        setTimeout(() => {
            alert('Message sent to support/supervisor!');
            setMessage('');
            setSending(false);
        }, 1000);
    };

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">System Tools & Support</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* System Status (Read-Only) */}
                <div className="bg-white shadow sm:rounded-lg p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">System Status</h3>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-3 w-3 rounded-full bg-green-500"></span>
                        <span className="text-sm text-gray-700">Submission Portal: Online</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-3 w-3 rounded-full bg-green-500"></span>
                        <span className="text-sm text-gray-700">Evaluation System: Online</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-3 w-3 rounded-full bg-green-500"></span>
                        <span className="text-sm text-gray-700">Database Connection: Stable</span>
                    </div>
                    <div className="border-t pt-4 mt-4">
                        <p className="text-xs text-gray-500">Last maintenance: 2 days ago</p>
                    </div>
                </div>

                {/* Contact Support / Supervisor */}
                <div className="bg-white shadow sm:rounded-lg p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Contact Support / Supervisor</h3>
                    <p className="text-sm text-gray-500 mb-4">Send a message if you encounter technical issues or need help.</p>
                    <textarea 
                        rows={3} 
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        placeholder="Describe your issue or request..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="mt-4 flex justify-end">
                        <button 
                            onClick={handleSendMessage}
                            disabled={sending || !message}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {sending ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}