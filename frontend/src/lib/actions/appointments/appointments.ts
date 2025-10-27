'use server';

import { apiBase } from "@/lib/constants";
import { auth } from "@clerk/nextjs/server";

function transformAppointment(appointment: any) {
    return {
        ...appointment,
        patientName: `${appointment.user?.firstName || ""} ${appointment.user?.lastName || ""}`.trim(),
        patientEmail: appointment.user.email,
        doctorName: appointment.doctor.name,
        doctorImageUrl: appointment.doctor.imageUrl || "",
        date: appointment.date.toISOString().split('T')[0],
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
        if (!userResp.ok) throw new Error("User not found");
        const user = await userResp.json();
        if (!user) throw new Error("User id missing");

        // user id를 사용하여 예약 목록 조회
        const appointments = await fetch(`${apiBase}/api/appointments/user/${userId}`);
        const resp = await appointments.json();
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