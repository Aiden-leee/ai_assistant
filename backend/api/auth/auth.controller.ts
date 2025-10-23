import { Request, Response } from 'express';
import * as authService from './auth.service';


/**
 * 사용자 등록
 */
export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { clerkId, email, firstName, lastName, phone } = req.body;
    
    const result = await authService.createUser({
      clerkId,
      email,
      firstName,
      lastName,
      phone
    });
    
    res.status(201).json({
      success: true,
      message: '사용자가 성공적으로 등록되었습니다.',
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || '사용자 등록 중 오류가 발생했습니다.'
    });
  }
};

/**
 * 사용자 정보 조회
 */
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { clerkId } = req.params;
    
    const user = await authService.readUserByClerkId(clerkId);
    
    if (!user) {
      res.status(404).json({
        success: false,
        message: '사용자를 찾을 수 없습니다.'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || '사용자 정보 조회 중 오류가 발생했습니다.'
    });
  }
};

/**
 * 사용자 정보 업데이트
 */
export const putUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { clerkId } = req.params;
    const { firstName, lastName, phone } = req.body;
    
    const result = await authService.modifyUserProfile(clerkId, {
      firstName,
      lastName,
      phone
    });
    
    if (!result) {
      res.status(404).json({
        success: false,
        message: '사용자를 찾을 수 없습니다.'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: '사용자 정보가 성공적으로 업데이트되었습니다.',
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || '사용자 정보 업데이트 중 오류가 발생했습니다.'
    });
  }
};

/**
 * 사용자 삭제
 */
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { clerkId } = req.params;
    
    const success = await authService.removeUser(clerkId);
    
    if (!success) {
      res.status(404).json({
        success: false,
        message: '사용자를 찾을 수 없습니다.'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: '사용자가 성공적으로 삭제되었습니다.'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || '사용자 삭제 중 오류가 발생했습니다.'
    });
  }
};
