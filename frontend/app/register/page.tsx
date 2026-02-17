'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/axios';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'student',
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/register', formData);
            router.push('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input name="name" type="text" onChange={handleChange} required className="w-full px-3 py-2 border rounded text-black" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input name="email" type="email" onChange={handleChange} required className="w-full px-3 py-2 border rounded text-black" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select name="role" onChange={handleChange} className="w-full px-3 py-2 border rounded text-black">
                            <option value="student">Student</option>
                            <option value="supervisor">Supervisor</option>
                            <option value="evaluator">Evaluator</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input name="password" type="password" onChange={handleChange} required className="w-full px-3 py-2 border rounded text-black" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input name="password_confirmation" type="password" onChange={handleChange} required className="w-full px-3 py-2 border rounded text-black" />
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Register</button>
                </form>
                <div className="mt-4 text-center">
                    <a href="/login" className="text-sm text-blue-600 hover:underline">Already have an account? Login</a>
                </div>
            </div>
        </div>
    );
}
