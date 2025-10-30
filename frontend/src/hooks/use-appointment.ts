'use client';

import { getAllAppointments, getBookedTimeSlots, getUserAppointments, postAppointment, updateAppointmentStatus } from "@/lib/actions/appointments/appointments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


// 모든 예약 가져오기
export function useGetAppointments() {
    const result = useQuery({
        queryKey: ["getAllAppointments"],
        queryFn: getAllAppointments,
    });

    return result;
}

// 예약 가능한 시간 슬롯 가져오기
export function useBookedTimeSlots(doctorId: string, date: string) {
    const result = useQuery({
        queryKey: ["getBookedTimeSlots", doctorId, date],
        queryFn: () => getBookedTimeSlots(doctorId, date),
        // 의사ID와 날짜가 있을 때만 쿼리 실행
        enabled: !!doctorId && !!date,
    });

    return result;
}

// 진료 예약 생성
export function useBookAppointment() {
    const queryClient = useQueryClient();

    const result = useMutation({
        mutationFn: postAppointment,
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["getUserAppointments"] });
            // 의사ID와 날짜가 있을 때만 쿼리 무효화
            if (variables?.doctorId && variables?.date) {
                queryClient.invalidateQueries({ queryKey: ["getBookedTimeSlots", variables.doctorId, variables.date] });
            } else {
                queryClient.invalidateQueries({ queryKey: ["getBookedTimeSlots"] });
            }
        },
        onError: (error) => {
            toast.error(error?.message || "진료 예약 생성 실패");
            console.error("진료 예약 생성 실패:", error)
        }
    });

    return result;
}

// 사용자의 예약 가져오기
export function useUserAppointment() {
    const result = useQuery({
        queryKey: ["getUserAppointments"],
        queryFn: getUserAppointments,
    });

    return result;
}

// 예약 상태 업데이트
export function useUpdateAppointmentStatus() {
    const queryClient = useQueryClient();
    const result = useMutation({
        mutationFn: updateAppointmentStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getUserAppointments"] });
            queryClient.invalidateQueries({ queryKey: ["getAllAppointments"] });
        },
        onError: (error) => {
            toast.error(error?.message || "예약 상태 업데이트 실패");
            console.error("예약 상태 업데이트 실패:", error)
        }
    });

    return result;
}