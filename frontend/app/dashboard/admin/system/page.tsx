'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

export default function SystemTools() {
    const [notificationMessage, setNotificationMessage] = useState('');
    const [sending, setSending] = useState(false);

    const handleSendNotification = () => {
        if (!notificationMessage) return;
        setSending(true);
        // Simulate API call
        setTimeout(() => {
            alert('Notification sent explicitly to all users.');
            setNotificationMessage('');
            setSending(false);
        }, 1000);
    };

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">System Administration</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* System Health */}
                <div className="bg-white shadow sm:rounded-lg p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">System Health</h3>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-3 w-3 rounded-full bg-green-500"></span>
                        <span className="text-sm text-gray-700">Database Connection: OK</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-3 w-3 rounded-full bg-green-500"></span>
                        <span className="text-sm text-gray-700">API Service: OK</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-3 w-3 rounded-full bg-green-500"></span>
                        <span className="text-sm text-gray-700">Cache System: OK</span>
                    </div>
                    <div className="border-t pt-4 mt-4">
                        <p className="text-xs text-gray-500">Last backup: 2 hours ago</p>
                        <button className="mt-2 text-indigo-600 text-sm hover:underline">Run Manual Backup</button>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white shadow sm:rounded-lg p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Broadcast Notification</h3>
                    <textarea 
                        rows={3} 
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        placeholder="Enter message to send to all users..."
                        value={notificationMessage}
                        onChange={(e) => setNotificationMessage(e.target.value)}
                    />
                    <div className="mt-4 flex justify-end">
                        <button 
                            onClick={handleSendNotification}
                            disabled={sending || !notificationMessage}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {sending ? 'Sending...' : 'Send Broadcast'}
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}