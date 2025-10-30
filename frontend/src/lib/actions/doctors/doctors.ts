'use server';

import { apiBase } from "@/lib/constants";
import { generateAvatar } from "@/lib/utils/utils";
import { revalidatePath } from "next/cache";

export interface CreateDoctor {
    name: string;
    email: string;
    phone: string;
    speciality: string;
    gender: 'MALE' | 'FEMALE';
    isActive: boolean;
}

export interface updateDoctorInput extends Partial<CreateDoctor> {
    id: string;
}

// 모든 의사 조회
export async function getAllDoctors() {
    try {
        const doctors = await fetch(`${apiBase}/api/doctors/all`);
        const data = await doctors.json();
        console.log("doctors", data);

        if (!data.success) {
            throw new Error(data.message);
        }

        return data.data;

    } catch (error) {
        console.error("Error getAllDoctors:", error);
        throw error;
    }
}

// 의사 생성
export async function createDoctor(inputData: CreateDoctor) {
    try {
        if (!inputData.name || !inputData.email) throw new Error("이름과 이메일은 필수 입력 항목입니다.");
        const parsedData = {
            ...inputData,
            imageUrl: generateAvatar(inputData.name, inputData.gender),
        }
        const resp = await fetch(`${apiBase}/api/doctors/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parsedData),
        });
        const data = await resp.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        revalidatePath("/admin");
        return data.data;

    } catch (error: any) {
        console.error("Error createDoctor:", error);
        throw error;
    }
}

// 의사 정보 업데이트
export async function updateDoctor(inputData: updateDoctorInput) {
    try {
        if (!inputData.name || !inputData.email) throw new Error("이름과 이메일은 필수 입력 항목입니다.");

        const resp = await fetch(`${apiBase}/api/doctors/${inputData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputData),
        });
        const data = await resp.json();
        if (!data.success) {
            throw new Error(data.message);
        }
    } catch (error: any) {
        console.error("Error updateDoctor:", error);
        throw error;
    }
}

// 사용 가능한 의사 조회
export async function getAvailableDoctors() {
    try {
        const doctors = await fetch(`${apiBase}/api/doctors/available`);
        const data = await doctors.json();

        if (!data.success) throw new Error(data.message);
        return data.data ?? [];
    } catch (error: any) {
        console.error("Error getAvailableDoctors:", error);
        throw error;
    }
}

// 의사 삭제
export async function deleteDoctor(id: string) {
    console.log("deleteDoctor", id);
    try {
        const resp = await fetch(`${apiBase}/api/doctors/${id}`, {
            method: "DELETE",
        });
        const data = await resp.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data.data;
    } catch (error: any) {
        console.error("Error deleteDoctor:", error);
        throw error;
    }
}