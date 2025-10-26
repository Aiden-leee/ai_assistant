import React from 'react'
import { Card, CardContent } from '../ui/card';
import { Calendar, Clock, UserCheck, Users } from 'lucide-react';

interface AdminStatsProps {
    totalDoctors: number;
    activeDoctors: number;
    totalAppointments: number;
    completedAppointments: number;
}

interface AdminStatsCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
}

function AdminStatsCard({ title, value, icon }: AdminStatsCardProps) {
    return (
        <Card className="border-2 hover:border-primary/30 transition-all duration-300">
            <CardContent className='p-6'>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                        {icon}
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{value}</div>
                        <div className="text-sm text-muted-foreground">{title}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function AdminStats({
    totalDoctors,
    activeDoctors,
    totalAppointments,
    completedAppointments
}: AdminStatsProps) {

    return (
        <div className="grid md:grid-cols-4 gap-6 mb-12">
            <AdminStatsCard title="총 의사" value={totalDoctors} icon={<Users className='size-6' />} />
            <AdminStatsCard title="활성화 의사" value={activeDoctors} icon={<UserCheck className='size-6' />} />
            <AdminStatsCard title="총 예약" value={totalAppointments} icon={<Calendar className='size-6' />} />
            <AdminStatsCard title="완료 예약" value={completedAppointments} icon={<Clock className='size-6' />} />
        </div>
    )
}



export default AdminStats