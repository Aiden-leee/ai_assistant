import { Request, Response } from 'express';
import * as appointmentService from './appointment.service';

/**
 * 예약 생성
 */
export const createAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, time, duration, notes, reason, userId, doctorId } = req.body;
    
    const result = await appointmentService.createAppointment({
      date: new Date(date),
      time,
      duration,
      notes,
      reason,
      userId,
      doctorId
    });
    
    res.status(201).json({
      success: true,
      message: '예약이 성공적으로 생성되었습니다.',
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || '예약 생성 중 오류가 발생했습니다.'
    });
  }
};

/**
 * 사용자의 예약 목록 조회
 */
export const getUserAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    
    const appointments = await appointmentService.readUserAppointments(userId);
    
    res.status(200).json({
      success: true,
      data: appointments
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || '예약 목록 조회 중 오류가 발생했습니다.'
    });
  }
};

/**
 * 의사의 예약 목록 조회
 */
export const getDoctorAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { doctorId } = req.params;
    
    const appointments = await appointmentService.readDoctorAppointments(doctorId);
    
    res.status(200).json({
      success: true,
      data: appointments
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || '예약 목록 조회 중 오류가 발생했습니다.'
    });
  }
};

/**
 * 특정 날짜의 예약 조회
 */
export const getAppointmentsByDate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date } = req.params;
    const { doctorId } = req.query;
    
    const appointments = await appointmentService.readAppointmentsByDate(
      new Date(date), 
      doctorId as string
    );
    
    res.status(200).json({
      success: true,
      data: appointments
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || '예약 조회 중 오류가 발생했습니다.'
    });
  }
};

/**
 * 예약 상세 조회
 */
export const getAppointmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const appointment = await appointmentService.readAppointmentById(id);
    
    if (!appointment) {
      res.status(404).json({
        success: false,
        message: '예약을 찾을 수 없습니다.'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || '예약 조회 중 오류가 발생했습니다.'
    });
  }
};

/**
 * 예약 정보 업데이트
 */
export const updateAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { date, time, duration, status, notes, reason } = req.body;
    
    const result = await appointmentService.modifyAppointment(id, {
      date: date ? new Date(date) : undefined,
      time,
      duration,
      status,
      notes,
      reason
    });
    
    if (!result) {
      res.status(404).json({
        success: false,
        message: '예약을 찾을 수 없습니다.'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: '예약이 성공적으로 업데이트되었습니다.',
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || '예약 업데이트 중 오류가 발생했습니다.'
    });
  }
};

/**
 * 예약 삭제
 */
export const deleteAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const success = await appointmentService.deleteAppointment(id);
    
    if (!success) {
      res.status(404).json({
        success: false,
        message: '예약을 찾을 수 없습니다.'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: '예약이 성공적으로 삭제되었습니다.'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || '예약 삭제 중 오류가 발생했습니다.'
    });
  }
};
