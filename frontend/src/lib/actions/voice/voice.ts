'use server';

import { apiBase } from "@/lib/constants";
import { auth } from "@clerk/nextjs/server";

/**
 * 사용자의 월별 통화 횟수 조회
 */
export async function getMonthlyCallCount(clerkId?: string, year?: number, month?: number) {
    try {
        const { userId } = await auth();
        const targetClerkId = clerkId || userId;
        
        if (!targetClerkId) {
            return { count: 0, year: new Date().getFullYear(), month: new Date().getMonth() + 1 };
        }

        // 현재 년월 사용 
        const currentYear = year || new Date().getFullYear();
        const currentMonth = month || new Date().getMonth() + 1;

        const resp = await fetch(
            `${apiBase}/api/voice/monthly-count/${targetClerkId}?year=${currentYear}&month=${currentMonth}`,
            { cache: 'no-store' }
        );
        
        const data = await resp.json();
        
        if (!resp.ok || !data.success) {
            throw new Error(data.message || '월별 통화 횟수 조회에 실패했습니다.');
        }
        
        return data.data as { count: number; year: number; month: number };
    } catch (error) {
        console.error('Error getMonthlyCallCount:', error);
        return { count: 0, year: new Date().getFullYear(), month: new Date().getMonth() + 1 };
    }
}

/**
 * 음성 통화 기록 생성
 */
export type VoiceTranscriptMessage = {
    role: 'assistant' | 'user'
    content: string
    messageTime?: string
}

export async function createVoiceCall(
    clerkId: string,
    duration: number,
    status: 'COMPLETED' | 'FAILED' = 'COMPLETED',
    messages?: VoiceTranscriptMessage[]
) {
    try {
        const resp = await fetch(`${apiBase}/api/voice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clerkId,
                duration,
                status,
                messages,
            }),
            cache: 'no-store'
        });

        const data = await resp.json();
        
        if (!resp.ok || !data.success) {
            throw new Error(data.message || '음성 통화 기록 생성에 실패했습니다.');
        }
        
        return data.data;
    } catch (error) {
        console.error('Error createVoiceCall:', error);
        throw error;
    }
}

