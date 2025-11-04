import { Router } from 'express';
import {
  createVoiceCall,
  getMonthlyCallCount,
  getMonthlyVoiceCalls,
  getUserCallCount
} from './voice.controller';

const voiceRouter = Router();

// 음성 통화 기록 생성
voiceRouter.post('/', createVoiceCall);

// 사용자의 월별 통화 횟수 조회
voiceRouter.get('/monthly-count/:clerkId', getMonthlyCallCount);

// 사용자의 월별 통화 목록 조회
voiceRouter.get('/monthly/:clerkId', getMonthlyVoiceCalls);

// 사용자의 총 통화 횟수 조회
voiceRouter.get('/total/:clerkId', getUserCallCount);

export default voiceRouter;

