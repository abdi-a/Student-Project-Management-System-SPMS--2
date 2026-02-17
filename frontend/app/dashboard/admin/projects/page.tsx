'use client';

import DashboardLayout from '../../../components/layout/DashboardLayout';

export default function AdminProjects() {
    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">All Projects (Admin View)</h1>
             <p className="text-gray-500">Master list of all projects across the system.</p>
             {/* TODO: Implement datatable for projects */}
        </DashboardLayout>
    );
}