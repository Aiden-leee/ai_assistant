'use client';

import { createDoctor, getAllActiveDoctors, getAvailableDoctors, updateDoctor } from "@/lib/actions/doctors/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 모든 활성 의사 조회 (GET)
export function useGetDoctors() {
    const result = useQuery({
        queryKey: ["getAllActiveDoctors"],
        queryFn: getAllActiveDoctors,
    });

    return result;
}

// 의사 생성 (mutationFn:POST,PUT,DELETE)
export function useCreateDoctor() {
    // QueryClient 인스턴스 가져오기
    const queryClient = useQueryClient();
    const result = useMutation({
        mutationFn: createDoctor,
        // 성공 시 모든 의사 목록 갱신 ( 캐시 무효화 )
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllActiveDoctors"] });
        },
        onError: (error) => console.error("의사 생성 실패:", error),
    })
    return result;
}

// 의사 정보 업데이트 (PUT)
export function useUpdateDoctor() {
    const queryClient = useQueryClient();
    const result = useMutation({
        mutationFn: updateDoctor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllActiveDoctors"] });
        },
        onError: (error) => console.error("의사 정보 업데이트 실패:", error),
    })
    return result;
}

// 사용 가능한 의사 조회 (GET)
export function useAvailableDoctors() {
    const result = useQuery({
        queryKey: ["getAvailableDoctors"],
        queryFn: getAvailableDoctors,
    });
    return result;
}