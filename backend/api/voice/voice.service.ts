import {
  insertVoiceCall,
  selectMonthlyCallCount,
  selectMonthlyVoiceCalls,
  selectUserCallCount,
  CreateVoiceCallData,
  VoiceCall,
  insertVoiceMessagesBulk,
  type VoiceMessageInput,
} from './voice.model';

/**
 * 음성 통화 기록 생성
 * TODO: 음성 통화 기록 생성 시 완료된 통화 기록만 생성
 */
export const createVoiceCall = async (
  callData: CreateVoiceCallData & { messages?: VoiceMessageInput[] }
): Promise<VoiceCall> => {
  const call = await insertVoiceCall(callData);
  if (callData.messages && callData.messages.length > 0) {
    try {
      await insertVoiceMessagesBulk(call.id, callData.messages);
    } catch (err) {
      // 메시지 저장 실패는 통화 저장을 막지 않음
      // eslint-disable-next-line no-console
      console.error('Failed bulk insert voice messages:', err);
    }
  }
  return call;
};

/**
 * 사용자의 월별 통화 횟수 조회
 * TODO: 월별 통화 횟수 조회 시 완료된 통화 횟수만 조회
 */
export const getMonthlyCallCount = async (userId: string, year: number, month: number): Promise<number> => {
  return await selectMonthlyCallCount(userId, year, month);
};

/**
 * 사용자의 월별 통화 목록 조회
 * TODO: 월별 통화 목록 조회 시 완료된 통화 목록만 조회
 */
export const getMonthlyVoiceCalls = async (userId: string, year: number, month: number): Promise<VoiceCall[]> => {
  return await selectMonthlyVoiceCalls(userId, year, month);
};

/**
 * 사용자의 총 통화 횟수 조회
 * TODO: 총 통화 횟수 조회 시 완료된 통화 횟수만 조회
 */
export const getUserCallCount = async (userId: string): Promise<number> => {
  return await selectUserCallCount(userId);
};

export const voiceService = {
  createVoiceCall,
  getMonthlyCallCount,
  getMonthlyVoiceCalls,
  getUserCallCount
};

