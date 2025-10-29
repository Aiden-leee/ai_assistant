'use client';

import BookingConfirmationStep from "@/components/appointments/BookingConfirmationStep";
import DoctorSelectionStep from "@/components/appointments/DoctorSelectionStep";
import ProgressSteps from "@/components/appointments/ProgressSteps";
import TimeSelectionStep from "@/components/appointments/TimeSelectionStep";
import Navbar from "@/components/commons/Navbar";
import { useBookAppointment, useUserAppointment } from "@/hooks/use-appointment";
import { APPOINTMENT_TYPES } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

function AppointmentsPage() {
    const [selectedDentistId, setSelectedDentistId] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [currentStep, setCurrentStep] = useState(1); // 1: 병원 선택, 2: 날짜 및 시간 선택, 3: 예약 정보 확인
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [bookedAppointment, setBookedAppointment] = useState<any>(null);

    // 예약 생성 뮤테이션
    const bookAppointmentMutation = useBookAppointment();

    // 사용자의 예약 목록 조회
    const { data: userAppointments = [] } = useUserAppointment();

    // 치과 선택 핸들러
    const handleSelectDentist = (dentistId: string) => {
        setSelectedDentistId(dentistId);

        // 날짜, 시간, 유형 초기화
        setSelectedDate('');
        setSelectedTime('');
        setSelectedType('');
    }

    // 예약 확인 핸들러
    const handleBookAppointment = async () => {
        if (!selectedDentistId || !selectedDate || !selectedTime) {
            toast.error("의사, 날짜, 시간을 선택해주세요.");
            return;
        }

        // 예약 유형 조회
        const appointmentType = APPOINTMENT_TYPES.find((t) => t.id === selectedType);

        // 
        bookAppointmentMutation.mutate(
            {
                doctorId: selectedDentistId,
                date: selectedDate,
                time: selectedTime,
                reason: appointmentType?.name || "",
            },
            {
                onSuccess: async (appointment) => {
                    setBookedAppointment(appointment);

                    // 예약 성공 모달 표시
                    setShowConfirmationModal(true);

                    // 형식 초기화
                    setSelectedDentistId(null);
                    setSelectedDate('');
                    setSelectedTime('');
                    setSelectedType('');
                    setCurrentStep(1);
                },
                onError: (error) => {
                    toast.error("예약 실패: 잠시후 다시 시도해주세요.");
                    console.error("예약 실패:", error);
                }
            }
        );
    }

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
                {/* header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">예약하기</h1>
                    <p className="text-muted-foreground">귀하 지역의 검증된 치과의사를 찾아 예약하세요</p>
                </div>

                <ProgressSteps currentStep={currentStep} />


                {/* 의사 선택 단계 */}
                {currentStep === 1 && (
                    <DoctorSelectionStep
                        selectedDentistId={selectedDentistId}
                        onSelectDentist={handleSelectDentist}
                        onContinue={() => setCurrentStep(2)}
                    />
                )}

                {/* 날짜 선택 단계 */}
                {currentStep === 2 && selectedDentistId && (
                    <TimeSelectionStep
                        selectedDentistId={selectedDentistId}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        selectedType={selectedType}
                        onBack={() => setCurrentStep(1)}
                        onContinue={() => setCurrentStep(3)}
                        onDateChange={setSelectedDate}
                        onTimeChange={setSelectedTime}
                        onTypeChange={setSelectedType}
                    />
                )}

                {/* 예약 정보 확인 단계 */}
                {currentStep === 3 && selectedDentistId && (
                    <BookingConfirmationStep
                        selectedDentistId={selectedDentistId}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        selectedType={selectedType}
                        isBooking={bookAppointmentMutation.isPending}
                        onBack={() => setCurrentStep(2)}
                        onModify={() => setCurrentStep(2)}
                        onConfirm={handleBookAppointment}
                    />
                )}

            </div>

            {/* 현재 유저의 예약 목록 표시 */}
            {userAppointments.length > 0 && (
                <div className="mb-8 max-w-7xl mx-auto px-6 py-8">
                    <h2 className="text-xl font-semibold mb-4">나의 예약 목록</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {userAppointments.map((appointment: any) => (
                            <div key={appointment.id} className="bg-card border rounded-lg p-4 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center">
                                        {appointment.doctorImageUrl ? (
                                            <Image
                                                src={appointment.doctorImageUrl}
                                                alt={appointment.doctorName}
                                                width={40}
                                                height={40}
                                                className="size-10 rounded-full"
                                            />
                                        ) : null}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{appointment.doctorName}</p>
                                        <p className="text-muted-foreground text-xs">{appointment.reason}</p>
                                    </div>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <p className="text-muted-foreground">
                                        📅 {format(new Date(appointment.date), "MMM d, yyyy")}
                                    </p>
                                    <p className="text-muted-foreground">🕐 {appointment.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default AppointmentsPage