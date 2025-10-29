'use server';

import { apiBase } from "@/lib/constants";
import { auth } from "@clerk/nextjs/server";


// 예약 데이터 변환
function transformAppointment(appointment: any) {
    const userFirstName = appointment?.user?.firstName ?? appointment?.["user.firstName"] ?? "";
    const userLastName = appointment?.user?.lastName ?? appointment?.["user.lastName"] ?? "";
    const userEmail = appointment?.user?.email ?? appointment?.["user.email"] ?? undefined;
    const doctorName = appointment?.doctor?.name ?? appointment?.["doctor.name"] ?? undefined;
    const doctorImageUrl = appointment?.doctor?.imageUrl ?? appointment?.["doctor.imageUrl"] ?? null;

    return {
        ...appointment,
        // 정규화된 필드들
        patientName: `${userFirstName} ${userLastName}`.trim(),
        patientEmail: userEmail,
        doctorName,
        doctorImageUrl,
        date: new Date(appointment.date).toISOString().split('T')[0],
    }
}

// 모든 예약 가져오기
export async function getAllAppointments() {
    try {
        const appointments = await fetch(`${apiBase}/api/appointments`);
        const data = await appointments.json();
        if (data.success) {
            return data.data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Error getAllAppointments:", error);
        throw error;
    }
}

// 사용자 예약 가져오기
export async function getUserAppointments() {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const userResp = await fetch(`${apiBase}/api/auth/profile/${userId}`);
        if (!userResp.ok) throw new Error("사용자 정보를 찾을 수 없습니다.");
        const user = await userResp.json();
        if (!user) throw new Error("사용자 ID가 없습니다.");

        // user id를 사용하여 예약 목록 조회
        const appointments = await fetch(`${apiBase}/api/appointments/user/${userId}`);
        const resp = await appointments.json();

        console.log("getUserAppointments resp", resp);
        if (!resp.success) throw new Error(resp.message || "Failed to fetch appointments");
        return resp.data.map(transformAppointment);
    } catch (error) {
        console.error("Error getUserAppointments:", error);
        throw error;
    }
}

// 사용자의 예약 가져오기
export async function getUserAppointmentStats() {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const user = await fetch(`${apiBase}/api/auth/profile/${userId}`);

        if (!user.ok) throw new Error("User not found");

        const appointments = await fetch(`${apiBase}/api/appointments/user/${userId}/stats`);
        const resp = await appointments.json();

        console.log("data", resp);
        return resp.data as { totalAppointments: number, completedAppointments: number };
    } catch (error) {
        console.error("Error getUserAppointmentStats:", error);
        throw error;
    }
}

// 특정 의사/날짜의 예약된 시간대 조회
export async function getBookedTimeSlots(doctorId: string, date: string) {
    try {
        const resp = await fetch(`${apiBase}/api/appointments/booked-times?doctorId=${encodeURIComponent(doctorId)}&date=${encodeURIComponent(date)}`);
        const data = await resp.json();
        if (!resp.ok || !data.success) {
            throw new Error(data.message || 'Failed to fetch booked time slots');
        }
        return data.data as string[];
    } catch (error) {
        console.error('Error getBookedTimeSlots:', error);
        throw error;
    }
}

interface AppointmentInput {
    doctorId: string
    date: string,
    time: string,
    reason: string,
}

// 진료 예약 생성
// 로그인된 사용자가 의사, 날짜, 시간 정보를 선택해 새로운 예약을 등록
export async function postAppointment(input: AppointmentInput) {
    try {

        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        if(!input.doctorId || !input.date || !input.time) {
            throw new Error("의사, 날짜, 시간은 필수 입력 항목입니다.");
        }

        // 사용자 정보 조회
        const user = await fetch(`${apiBase}/api/auth/profile/${userId}`);
        if(!user.ok) throw new Error("User not found");

        const inputData = {
            ...input,
            userId: userId,
            doctorId: input.doctorId,
            date: input.date,
            time: input.time,
            reason: input.reason || "일반 상담",
            status: "CONFIRMED",
        }


        const resp = await fetch(`${apiBase}/api/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Charset': 'utf-8',
            },
            body: JSON.stringify(inputData),
        });
        const data = await resp.json();
        if (!resp.ok || !data.success) {
            throw new Error(data.message || '예약 실패: 예약 정보를 확인해주세요.');
        }
        return transformAppointment(data.data);
    } catch (error) {
        console.error('Error postAppointment:', error);
        throw error;
    }
}