'use server';

import { apiBase } from "@/lib/constants";

export async function getAllAppointments() {
    try {
        const appointments = await fetch(`${apiBase}/api/appointments`);
        const data = await appointments.json();
        if( data.success ) {
            return data.data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Error getAllAppointments:", error);
        throw error;
    }
}