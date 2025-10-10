// resources/js/Pages/Admin/Dashboard.jsx

import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <>
            <Head title="Admin Dashboard" />
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="bg-white p-8 rounded-lg shadow">
                <p className="text-lg">Selamat Datang di Panel Admin, <span className="font-bold">{auth.user.name}</span>!</p>
                <p className="mt-2 text-gray-600">Gunakan menu di sebelah kiri untuk mengelola konten website.</p>
            </div>
        </>
    );
}

// Terapkan layout admin
Dashboard.layout = page => <AdminLayout children={page} />;