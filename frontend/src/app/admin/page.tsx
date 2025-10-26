import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import AdminDashboardClient from './AdminDashboard.client';

async function AdminPage() {
    const user = await currentUser();

    // 로그인 안되어 있으면 홈으로 리다이렉트
    if (!user) redirect('/');

    // 관리자 이메일
    const adminEmail = process.env.ADMIN_EMAIL;
    // 사용자 이메일
    const userEmail = user?.emailAddresses[0].emailAddress;

    // 관리자 이메일이 아니면 홈으로 리다이렉트
    if (!adminEmail || userEmail !== adminEmail) redirect('/dashboard');
    return (
        <AdminDashboardClient />
    )
}

export default AdminPage