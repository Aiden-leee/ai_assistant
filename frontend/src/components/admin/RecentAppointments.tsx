import { Appointment } from '@/app/admin/AdminDashboard.client';
import { useGetAppointments, useUpdateAppointmentStatus } from '@/hooks/use-appointment';
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar } from 'lucide-react';

function RecentAppointments() {
    const { data: appointments = [] } = useGetAppointments();
    const updateAppointmentStatus = useUpdateAppointmentStatus();

    // 예약 상태 토글
    const handleToggleAppointmentStatus = (appointmentId: string) => {
        // 예약 찾기
        const appointment = appointments.find((apt: Appointment) => apt.id === appointmentId);

        // 예약 상태 토글
        const newStatus = appointment?.status === "CONFIRMED" ? "COMPLETED" : "CONFIRMED";

        // 예약 상태 업데이트
        updateAppointmentStatus.mutate({
            id: appointmentId,
            status: newStatus,
        });
    }

    // 예약 상태 배지 가져오기
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "CONFIRMED":
                return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">확인</Badge>;
            case "COMPLETED":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">완료</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    최근 예약
                </CardTitle>
                <CardDescription>모든 환자의 예약을 모니터링하고 관리합니다.</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>환자</TableHead>
                                <TableHead>의사</TableHead>
                                <TableHead>날짜 & 시간</TableHead>
                                <TableHead>진료</TableHead>
                                <TableHead>상태</TableHead>
                                <TableHead className="text-right">활동</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {appointments.map((appointment: any) => (
                                <TableRow key={appointment.id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{appointment.patientName}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {appointment.patientEmail}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{appointment.doctorName}</TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">
                                                {new Date(appointment.date).toLocaleDateString()}
                                            </div>
                                            <div className="text-sm text-muted-foreground">{appointment.time}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{appointment.reason}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleToggleAppointmentStatus(appointment.id)}
                                            className="h-6 px-2"
                                        >
                                            {getStatusBadge(appointment.status)}
                                        </Button>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="text-xs text-muted-foreground">클릭하여 상태를 변경합니다</div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}

export default RecentAppointments