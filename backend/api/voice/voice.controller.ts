import type { Request, Response, NextFunction } from 'express';
import { voiceService } from './voice.service';
import { selectUserByClerkId } from '../auth/auth.model';

/**
 * 음성 통화 기록 생성
 */
export const createVoiceCall = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { clerkId, duration, status, messages } = req.body;

    if (!clerkId || duration === undefined) {
      throw new Error('clerkId와 duration은 필수입니다.');
    }

    // Clerk ID로 사용자 조회
    const user = await selectUserByClerkId(clerkId);
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    const call = await voiceService.createVoiceCall({
      userId: user.id,
      duration,
      status: status || 'COMPLETED',
      messages,
    });

    res.status(201).json({ 
      success: true,
      message: '음성 통화 기록이 성공적으로 생성되었습니다.',
      data: call
    });
  } catch (error: any) {
    console.error('Error createVoiceCall:', error);
    next(error);
  }
};

/**
 * 사용자의 월별 통화 횟수 조회
 */
export const getMonthlyCallCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { clerkId } = req.params;
    const { year, month } = req.query;

    if (!clerkId) {
      res.status(400).json({
        success: false,
        message: 'clerkId는 필수입니다.'
      });
      return;
    }

    // Clerk ID로 사용자 조회
    const user = await selectUserByClerkId(clerkId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: '사용자를 찾을 수 없습니다.'
      });
      return;
    }

    // 현재 년월 사용 (쿼리 파라미터가 없으면)
    const currentYear = year ? parseInt(year as string) : new Date().getFullYear();
    const currentMonth = month ? parseInt(month as string) : new Date().getMonth() + 1;

    const count = await voiceService.getMonthlyCallCount(user.id, currentYear, currentMonth);

    res.status(200).json({
      success: true,
      message: '월별 통화 횟수 조회 성공',
      data: {
        count,
        year: currentYear,
        month: currentMonth
      }
    });
  } catch (error: any) {
    next(error);
  }
};

/**
 * 사용자의 월별 통화 목록 조회
 */
export const getMonthlyVoiceCalls = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { clerkId } = req.params;
    const { year, month } = req.query;

    if (!clerkId) {
      res.status(400).json({
        success: false,
        message: 'clerkId는 필수입니다.'
      });
      return;
    }

    // Clerk ID로 사용자 조회
    const user = await selectUserByClerkId(clerkId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: '사용자를 찾을 수 없습니다.'
      });
      return;
    }

    // 현재 년월 사용 (쿼리 파라미터가 없으면)
    const currentYear = year ? parseInt(year as string) : new Date().getFullYear();
    const currentMonth = month ? parseInt(month as string) : new Date().getMonth() + 1;

    const calls = await voiceService.getMonthlyVoiceCalls(user.id, currentYear, currentMonth);

    res.status(200).json({
      success: true,
      message: '월별 통화 목록 조회 성공',
      data: calls
    });
  } catch (error: any) {
    next(error);
  }
};

/**
 * 사용자의 총 통화 횟수 조회
 */
export const getUserCallCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { clerkId } = req.params;

    if (!clerkId) {
      res.status(400).json({
        success: false,
        message: 'clerkId는 필수입니다.'
      });
      return;
    }

    // Clerk ID로 사용자 조회
    const user = await selectUserByClerkId(clerkId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: '사용자를 찾을 수 없습니다.'
      });
      return;
    }

    const count = await voiceService.getUserCallCount(user.id);

    res.status(200).json({
      success: true,
      message: '총 통화 횟수 조회 성공',
      data: { count }
    });
  } catch (error: any) {
    next(error);
  }
};

