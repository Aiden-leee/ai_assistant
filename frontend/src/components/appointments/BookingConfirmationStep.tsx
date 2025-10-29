import { APPOINTMENT_TYPES } from '@/lib/utils';
import React from 'react'
import { Button } from '../ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import DoctorInfo from './DoctorInfo';

interface BookingConfirmationStepProps {
    selectedDentistId: string;
    selectedDate: string;
    selectedTime: string;
    selectedType: string;
    isBooking: boolean;
    onBack: () => void;
    onConfirm: () => void;
    onModify: () => void;
}

function BookingConfirmationStep({
    selectedDentistId,
    selectedDate,
    selectedTime,
    selectedType,
    isBooking,
    onBack,
    onConfirm,
    onModify,
}: BookingConfirmationStepProps) {
    const appointmentType = APPOINTMENT_TYPES.find((t) => t.id === selectedType);

    return (
        <div className="space-y-6">
            {/* Header with back button */}
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" onClick={onBack}>
                    <ChevronLeftIcon className="w-4 h-4 mr-1" />뒤로
                </Button>
                <h2 className="text-2xl font-semibold">예약 정보 확인</h2>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>예약 요약</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* doctor info */}
                    <DoctorInfo doctorId={selectedDentistId} />

                    {/* appointment details */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                            <p className="text-sm text-muted-foreground">예약 유형</p>
                            <p className="font-medium">{appointmentType?.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">진료 시간</p>
                            <p className="font-medium">{appointmentType?.duration}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">날짜</p>
                            <p className="font-medium">
                                {new Date(selectedDate).toLocaleDateString("ko-KR", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">시간</p>
                            <p className="font-medium">{selectedTime}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">위치</p>
                            <p className="font-medium">치과 센터</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">비용</p>
                            <p className="font-medium text-primary">{appointmentType?.price}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 예약 수정 및 예약 확인 버튼 */}
            <div className="flex gap-4">
                <Button variant="outline" onClick={onModify}>
                    예약 수정
                </Button>
                <Button onClick={onConfirm} className="bg-primary" disabled={isBooking}>
                    {isBooking ? "예약 중..." : "예약 확인"}
                </Button>
            </div>
        </div>
    )
}

export default BookingConfirmationStep