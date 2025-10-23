import {
  insertAppointment as insertAppointmentModel,
  selectUserAppointments as selectUserAppointmentsModel,
  selectDoctorAppointments as selectDoctorAppointmentsModel,
  selectAppointmentsByDate as selectAppointmentsByDateModel,
  selectAppointmentById as selectAppointmentByIdModel,
  updateAppointment as updateAppointmentModel,
  deleteAppointment as removeAppointmentModel,
  CreateAppointmentData,
  UpdateAppointmentData
} from './appointment.model';

/**
 * 예약 생성 서비스
 */
export const createAppointment = async (appointmentData: CreateAppointmentData) => {
  // 예약 시간 중복 확인
  const existingAppointments = await selectAppointmentsByDateModel(
    appointmentData.date, 
    appointmentData.doctorId
  );
  
  const isTimeConflict = existingAppointments.some(apt => 
    apt.time === appointmentData.time && 
    apt.status === 'CONFIRMED'
  );
  
  if (isTimeConflict) {
    throw new Error('해당 시간에 이미 예약이 있습니다.');
  }
  
  return await insertAppointmentModel(appointmentData);
};

/**
 * 사용자 예약 목록 조회
 */
export const readUserAppointments = async (userId: string) => {
  return await selectUserAppointmentsModel(userId);
};

/**
 * 의사 예약 목록 조회
 */
export const readDoctorAppointments = async (doctorId: string) => {
  return await selectDoctorAppointmentsModel(doctorId);
};

/**
 * 특정 날짜의 예약 조회
 */
export const readAppointmentsByDate = async (date: Date, doctorId?: string) => {
  return await selectAppointmentsByDateModel(date, doctorId);
};

/**
 * 예약 상세 조회
 */
export const readAppointmentById = async (id: string) => {
  return await selectAppointmentByIdModel(id);
};

/**
 * 예약 정보 업데이트
 */
export const modifyAppointment = async (id: string, appointmentData: UpdateAppointmentData) => {
  // 예약 존재 확인
  const existingAppointment = await selectAppointmentByIdModel(id);
  if (!existingAppointment) {
    return null;
  }
  
  // 시간 변경 시 중복 확인
  if (appointmentData.date || appointmentData.time) {
    const checkDate = appointmentData.date || existingAppointment.date;
    const checkTime = appointmentData.time || existingAppointment.time;
    const doctorId = existingAppointment.doctorId;
    
    const existingAppointments = await selectAppointmentsByDateModel(checkDate, doctorId);
    const isTimeConflict = existingAppointments.some(apt => 
      apt.id !== id && 
      apt.time === checkTime && 
      apt.status === 'CONFIRMED'
    );
    
    if (isTimeConflict) {
      throw new Error('해당 시간에 이미 예약이 있습니다.');
    }
  }
  
  return await updateAppointmentModel(id, appointmentData);
};

/**
 * 예약 삭제
 */
export const deleteAppointment = async (id: string) => {
  return await removeAppointmentModel(id);
};

export const appointmentService = {
  createAppointment,
  readUserAppointments,
  readDoctorAppointments,
  readAppointmentsByDate,
  readAppointmentById,
  modifyAppointment,
  deleteAppointment
};
