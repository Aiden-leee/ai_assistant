'use client';

import { getAllAppointments } from "@/lib/actions/appointments/appointments";
import { useQuery } from "@tanstack/react-query";


export function useGetAppointments() {
    const result = useQuery({
        queryKey: ["getAllAppointments"],
        queryFn: getAllAppointments,
    });

    return result;
}