import { useBookedTimeSlots } from '@/hooks/use-appointment';
import { APPOINTMENT_TYPES, getAvailableTimeSlots, getNext5Days } from '@/lib/utils';
import React from 'react'
import { Button } from '../ui/button';
import { ChevronLeftIcon, ClockIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface TimeSelectionStepProps {
    selectedDentistId: string;
    selectedDate: string;
    selectedTime: string;
    selectedType: string;
    onBack: () => void;
    onContinue: () => void;
    onDateChange: (date: string) => void;
    onTimeChange: (time: string) => void;
    onTypeChange: (type: string) => void;
}

function TimeSelectionStep({
    selectedDentistId,
    selectedDate,
    selectedTime,
    selectedType,
    onBack,
    onContinue,
    onDateChange,
    onTimeChange,
    onTypeChange,
}: TimeSelectionStepProps) {
    const { data: bookedTimeSlots = [] as string[] } = useBookedTimeSlots(selectedDentistId, selectedDate);

    const availableDates = getNext5Days();
    const availableTimeSlots = getAvailableTimeSlots();

    // 날짜 선택 핸들러
    const handleDateSelect = (date: string) => {
        onDateChange(date);
        onTimeChange('');
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" onClick={onBack}>
                    <ChevronLeftIcon className="w-4 h-4 mr-1" />뒤로
                </Button>

                <h2 className="text-2xl font-semibold">날짜 및 시간 선택</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* 예약 유형 선택 */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">예약 유형</h3>
                    <div className="space-y-3">
                        {APPOINTMENT_TYPES.map((type) => (
                            <Card
                                key={type.id}
                                className={`cursor-pointer transition-all hover:shadow-sm ${selectedType === type.id ? "ring-2 ring-primary" : ""
                                    }`}
                                onClick={() => onTypeChange(type.id)}
                            >
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-medium">{type.name}</h4>
                                            <p className="text-sm text-muted-foreground">{type.duration}</p>
                                        </div>
                                        <span className="font-semibold text-primary">{type.price}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* 날짜 선택 & 시간 선택 */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">가능한 날짜</h3>

                    {/* 날짜 선택 */}
                    <div className="grid grid-cols-2 gap-3">
                        {availableDates.map((date) => (
                            <Button
                                key={date}
                                variant={selectedDate === date ? "default" : "outline"}
                                onClick={() => handleDateSelect(date)}
                                className="h-auto p-3"
                            >
                                <div className="text-center">
                                    <div className="font-medium">
                                        {new Date(date).toLocaleDateString("ko-KR", {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </div>
                                </div>
                            </Button>
                        ))}
                    </div>

                    {/* 시간 선택 (날짜가 선택된 경우에만 표시) */}
                    {selectedDate && (
                        <div className="space-y-3">
                            <h4 className="font-medium">가능한 시간</h4>
                            <div className="grid grid-cols-3 gap-2">
                                {availableTimeSlots.map((time: string) => {
                                    // 예약된 시간인지 확인
                                    const isBooked = bookedTimeSlots.includes(time);
                                    return (
                                        <Button
                                            key={time}
                                            variant={selectedTime === time ? "default" : "outline"}
                                            onClick={() => !isBooked && onTimeChange(time)}
                                            size="sm"
                                            disabled={isBooked}
                                            className={isBooked ? "opacity-50 cursor-not-allowed" : ""}
                                        >
                                            <ClockIcon className="w-3 h-3 mr-1" />
                                            {time}
                                            {isBooked && " (예약됨)"}
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 예약 정보 확인 버튼 */}
            {selectedType && selectedDate && selectedTime && (
                <div className="flex justify-end">
                    <Button onClick={onContinue}>예약 정보 확인</Button>
                </div>
            )}
        </div>
    )
}

export default TimeSelectionStep