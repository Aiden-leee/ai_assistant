import { NextFunction, Request, Response } from 'express';
import * as appointmentService from './appointment.service';
import * as authService from '../auth/auth.service';

/**
 * 전체 예약 목록 조회
 */
export const getAllAppointments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const appointments = await appointmentService.readAllAppointments();
    console.log("appointments", appointments);
    res.status(200).json({
      success: true,
      message: '예약 목록 조회 성공',
      data: appointments
    });
  } catch (error: any) {
    next(error);
  }
};

/**
 * 예약 생성
 */
export const createAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { date, time, duration, notes, reason, userId, doctorId } = req.body;
    
    if (!doctorId || !date || !time) {
      throw new Error('doctorId, date, time 은 필수입니다.');
    }

    console.log("createAppointment", req.body);

    // userId(Clerk ID) 를 내부 사용자 ID로 매핑
    if (!userId) throw new Error('로그인이 필요합니다.');

    const user = await authService.readUserByClerkId(userId);
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    const result = await appointmentService.createAppointment({
      date: new Date(date),
      time,
      duration,
      notes,
      reason: reason || '일반 상담',
      userId: user.id,
      doctorId
    });

    res.status(201).json({
      success: true,
      message: '예약이 성공적으로 생성되었습니다.',
      data: result
    });
  } catch (error: any) {
    next(error);
  }
};

/**
 * 사용자의 예약 목록 조회
 */
export const getUserAppointments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;

    const appointments = await appointmentService.readUserAppointments(userId);

    console.log("getUserAppointments", appointments);
    res.status(200).json({
      success: true,
      message: '사용자의 예약 목록 조회 성공',
      data: appointments
    });
  } catch (error: any) {
    next(error);
  }
};

/**
 * 사용자의 예약 통계 조회
 */
export const getUserAppointmentStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;
    const stats = await appointmentService.readUserAppointmentStats(userId);
    res.status(200).json({
      success: true,
      message: '사용자의 예약 통계 조회 성공',
      data: stats
    });
  } catch (error: any) {
    next(error);
  }
}

/**
 * 의사의 예약 목록 조회
 */
export const getDoctorAppointments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { doctorId } = req.params;

    const appointments = await appointmentService.readDoctorAppointments(doctorId);

    res.status(200).json({
      success: true,
      message: '의사의 예약 목록 조회 성공',
      data: appointments
    });
  } catch (error: any) {
    next(error);
  }
};

/**
 * 특정 날짜의 예약 조회
 */
export const getAppointmentsByDate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { date } = req.params;
    const { doctorId } = req.query;

    const appointments = await appointmentService.readAppointmentsByDate(
      new Date(date),
      doctorId as string
    );

    res.status(200).json({
      success: true,
      message: '특정 날짜의 예약 조회 성공',
      data: appointments
    });
  } catch (error: any) {
    next(error);
  }
};

/**
 * 예약 상세 조회
 */
export const getAppointmentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const appointment = await appointmentService.readAppointmentById(id);

    if (!appointment) {
      throw new Error('예약을 찾을 수 없습니다.');
    }

    res.status(200).json({
      success: true,
      message: '예약 상세 조회 성공',
      data: appointment
    });
  } catch (error: any) {
    next(error);
  }
};

/**
 * 예약 정보 업데이트
 */
export const updateAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
      throw new Error('예약을 찾을 수 없습니다.');
    }

    res.status(200).json({
      success: true,
      message: '예약이 성공적으로 업데이트되었습니다.',
      data: result
    });
  } catch (error: any) {
    next(error);
  }
};

/**
 * 예약 삭제
 */
export const deleteAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const success = await appointmentService.deleteAppointment(id);

    if (!success) {
      throw new Error('예약을 찾을 수 없습니다.');
    }

    res.status(200).json({
      success: true,
      message: '예약이 성공적으로 삭제되었습니다.',
      data: success
    });
  } catch (error: any) {
    next(error);
  }
};

/**
 * 특정 의사/날짜의 예약된 시간대 조회
 */
export const getBookedTimeSlots = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { doctorId, date } = req.query as { doctorId?: string; date?: string };

    if (!doctorId || !date) {
      throw new Error('doctorId와 date(query)가 필요합니다.');
    }

    const slots = await appointmentService.readBookedTimeSlots(doctorId, new Date(date));

    res.status(200).json({
      success: true,
      message: '예약된 시간대 조회 성공',
      data: slots
    });
  } catch (error: any) {
    next(error);
  }
};