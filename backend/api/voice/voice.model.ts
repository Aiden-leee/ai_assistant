import { sql } from '../../config/database';

export interface VoiceCall {
  id: string;
  userId: string;
  duration: number;
  status: 'COMPLETED' | 'FAILED';
  createdAt: Date;
}

export interface CreateVoiceCallData {
  userId: string;
  duration: number;
  status?: 'COMPLETED' | 'FAILED';
}

export interface VoiceMessageInput {
  role: 'assistant' | 'user';
  content: string;
  messageTime?: string;
}

/**
 * 음성 통화 기록 생성
 * TODO: 음성 통화 기록 생성 시 완료된 통화 기록만 생성
 */
export const insertVoiceCall = async (callData: CreateVoiceCallData): Promise<VoiceCall> => {
  const { userId, duration, status = 'COMPLETED' } = callData;
  
  const [call] = await sql`
    INSERT INTO voice_calls (user_id, duration, status)
    VALUES (${userId}, ${duration}, ${status})
    RETURNING id, user_id as "userId", duration, status, created_at as "createdAt"
  ` as [VoiceCall];
  
  return call;
};

/**
 * 사용자의 월별 통화 횟수 조회
 * TODO: 월별 통화 횟수 조회 시 완료된 통화 횟수만 조회
 */
export const selectMonthlyCallCount = async (userId: string, year: number, month: number): Promise<number> => {
  const result = await sql`
    SELECT COUNT(*)::int as count
    FROM voice_calls
    WHERE user_id = ${userId}
      AND EXTRACT(YEAR FROM created_at) = ${year}
      AND EXTRACT(MONTH FROM created_at) = ${month}
      AND status = 'COMPLETED'
  `;
  
  return result[0]?.count || 0;
};

/**
 * 사용자의 월별 통화 목록 조회
 * TODO: 월별 통화 목록 조회 시 완료된 통화 목록만 조회
 */
export const selectMonthlyVoiceCalls = async (userId: string, year: number, month: number): Promise<VoiceCall[]> => {
  const calls = await sql`
    SELECT id, user_id as "userId", duration, status, created_at as "createdAt"
    FROM voice_calls
    WHERE user_id = ${userId}
      AND EXTRACT(YEAR FROM created_at) = ${year}
      AND EXTRACT(MONTH FROM created_at) = ${month}
    ORDER BY created_at DESC
  ` as VoiceCall[];
  
  return calls;
};

/**
 * 사용자의 총 통화 횟수 조회
 * TODO: 총 통화 횟수 조회 시 완료된 통화 횟수만 조회
 */
export const selectUserCallCount = async (userId: string): Promise<number> => {
  const result = await sql`
    SELECT COUNT(*)::int as count
    FROM voice_calls
    WHERE user_id = ${userId}
      AND status = 'COMPLETED'
  `;
  
  return result[0]?.count || 0;
};

/**
 * 음성 통화 메시지 벌크 저장 (단일 INSERT)
 * JSONB 배열을 파라미터로 받아서 jsonb_array_elements로 행 변환 후 저장
 */
export const insertVoiceMessagesBulk = async (
  callId: string,
  messages: VoiceMessageInput[]
): Promise<void> => {
  if (!messages || messages.length === 0) return;
  const messagesJson = JSON.stringify(messages);
  await sql`
    WITH data AS (
      SELECT ${callId}::text AS call_id,
             jsonb_array_elements(${messagesJson}::jsonb) AS elem
    )
    INSERT INTO voice_messages (call_id, role, content, message_time)
    SELECT
      call_id,
      (elem->>'role')::text,
      (elem->>'content')::text,
      COALESCE((elem->>'messageTime')::timestamptz, NOW())
    FROM data
  `;
};

