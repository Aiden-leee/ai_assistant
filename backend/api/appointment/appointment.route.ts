import { Router } from 'express';
import {
  createAppointment,
  getAllAppointments,
  getUserAppointments,
  getAppointmentsByDate,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
} from './appointment.controller';

const appointmentRouter = Router();

// 예약 생성
appointmentRouter.post('/', createAppointment);

// 전체 예약 목록 조회
appointmentRouter.get('/', getAllAppointments);

// 사용자의 예약 목록 조회
appointmentRouter.get('/user/:userId', getUserAppointments);

// 특정 날짜의 예약 조회
appointmentRouter.get('/date/:date', getAppointmentsByDate);

// 예약 상세 조회
appointmentRouter.get('/:id', getAppointmentById);

// 예약 정보 업데이트
appointmentRouter.put('/:id', updateAppointment);

// 예약 삭제
appointmentRouter.delete('/:id', deleteAppointment);


export { appointmentRouter };
