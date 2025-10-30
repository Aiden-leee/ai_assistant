import { sql } from '../../config/database';

export interface Appointment {
  id: string;
  date: Date;
  time: string;
  duration: number;
  status: 'CONFIRMED' | 'COMPLETED';
  notes?: string;
  reason?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  doctorId: string;
  // 관계 데이터
  user?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
  };
  doctor?: {
    id: string;
    name: string;
    speciality: string;
    imageUrl?: string;
  };
}

export interface CreateAppointmentData {
  date: Date;
  time: string;
  duration?: number;
  notes?: string;
  reason?: string;
  userId: string;
  doctorId: string;
}

export interface UpdateAppointmentData {
  date?: Date;
  time?: string;
  duration?: number;
  status?: 'CONFIRMED' | 'COMPLETED';
  notes?: string;
  reason?: string;
}

/**
 * 예약 생성
 */
export const insertAppointment = async (appointmentData: CreateAppointmentData): Promise<Appointment> => {
  const { date, time, duration = 30, notes, reason, userId, doctorId } = appointmentData;

  const [appointment] = await sql`
    INSERT INTO appointments (date, time, duration, notes, reason, user_id, doctor_id)
    VALUES (${date}, ${time}, ${duration}, ${notes || null}, ${reason || null}, ${userId}, ${doctorId})
    RETURNING id, date, time, duration, status, notes, reason, 
              created_at as "createdAt", updated_at as "updatedAt", user_id as "userId", doctor_id as "doctorId"
  ` as [Appointment];

  return appointment;
};

/**
 * 전체 예약 목록 조회 (사용자, 의사 정보 포함)
 */
export const selectAllAppointments = async (): Promise<Appointment[]> => {
  const appointments = await sql`
    SELECT a.id, TO_CHAR(a.date, 'YYYY-MM-DD') as "date", a.time, a.duration, a.status, a.notes, a.reason,
           a.created_at as "createdAt", a.updated_at as "updatedAt",
           a.user_id as "userId", a.doctor_id as "doctorId",
           u.first_name as "user.firstName", u.last_name as "user.lastName", u.email as "user.email",
           d.name as "doctor.name", d.speciality as "doctor.speciality", d.image_url as "doctor.imageUrl"
    FROM appointments a
      LEFT JOIN users u ON a.user_id = u.id
      LEFT JOIN doctors d ON a.doctor_id = d.id
    ORDER BY a.created_at DESC
  ` as [Appointment];

  return appointments;
};

/**
 * 사용자의 예약 목록 조회
 */
export const selectUserAppointments = async (userId: string): Promise<Appointment[]> => {
  const appointments = await sql`
    SELECT a.id, a.date, a.time, a.duration, a.status, a.notes, a.reason, 
           a.created_at as "createdAt", a.updated_at as "updatedAt", 
           a.user_id as "userId", a.doctor_id as "doctorId",
           u.first_name as "user.firstName", u.last_name as "user.lastName", u.email as "user.email",
           d.name as "doctor.name", d.speciality as "doctor.speciality", d.image_url as "doctor.imageUrl"
    FROM appointments a
    LEFT JOIN users u ON a.user_id = u.id
    LEFT JOIN doctors d ON a.doctor_id = d.id
    WHERE u.clerk_id = ${userId}
    ORDER BY a.date ASC, a.time ASC
  ` as [Appointment];

  return appointments;
};

/*
* 사용자의 예약 통계 조회
*/
export const selectUserAppointmentStats = async (userId: string) => {
  const result = await sql`
    SELECT 
      COUNT(*)::int AS "totalAppointments",
      COUNT(*) FILTER (WHERE status = 'COMPLETED')::int AS "completedAppointments"
    FROM appointments
    WHERE user_id = ${userId}
  `;

  return result[0] ?? { totalAppointments: 0, completedAppointments: 0 };
};

/**
 * 의사의 예약 목록 조회
 */
export const selectDoctorAppointments = async (doctorId: string): Promise<Appointment[]> => {
  const appointments = await sql`
    SELECT a.id, a.date, a.time, a.duration, a.status, a.notes, a.reason, 
           a.created_at as "createdAt", a.updated_at as "updatedAt", 
           a.user_id as "userId", a.doctor_id as "doctorId",
           u.first_name as "user.firstName", u.last_name as "user.lastName", u.email as "user.email",
           d.name as "doctor.name", d.speciality as "doctor.speciality"
    FROM appointments a
    LEFT JOIN users u ON a.user_id = u.id
    LEFT JOIN doctors d ON a.doctor_id = d.id
    WHERE a.doctor_id = ${doctorId}
    ORDER BY a.date DESC, a.time DESC
  ` as [Appointment];

  return appointments;
};

/**
 * 특정 날짜의 예약 조회
 * 특정 날짜(옵션으로 특정 의사 포함)의 전체 예약 내역을 상세 정보와 함께 조회
 */
export const selectAppointmentsByDate = async (
  date: Date,
  doctorId?: string
): Promise<Appointment[]> => {
  const dateStr = date.toISOString().split("T")[0];

  if (doctorId) {
    return await sql`
      SELECT 
        a.id, a.date, a.time, a.duration, a.status, a.notes, a.reason, 
        a.created_at AS "createdAt", a.updated_at AS "updatedAt", 
        a.user_id AS "userId", a.doctor_id AS "doctorId",
        u.first_name AS "user.firstName", u.last_name AS "user.lastName", u.email AS "user.email",
        d.name AS "doctor.name", d.speciality AS "doctor.speciality"
      FROM appointments a
      LEFT JOIN users u ON a.user_id = u.id
      LEFT JOIN doctors d ON a.doctor_id = d.id
      WHERE DATE(a.date) = ${dateStr} AND a.doctor_id = ${doctorId}
      ORDER BY a.time ASC
    ` as [Appointment];
  }

  return await sql`
    SELECT 
      a.id, a.date, a.time, a.duration, a.status, a.notes, a.reason, 
      a.created_at AS "createdAt", a.updated_at AS "updatedAt", 
      a.user_id AS "userId", a.doctor_id AS "doctorId",
      u.first_name AS "user.firstName", u.last_name AS "user.lastName", u.email AS "user.email",
      d.name AS "doctor.name", d.speciality AS "doctor.speciality"
    FROM appointments a
    LEFT JOIN users u ON a.user_id = u.id
    LEFT JOIN doctors d ON a.doctor_id = d.id
    WHERE DATE(a.date) = ${dateStr}
    ORDER BY a.time ASC
  ` as [Appointment];
};

/**
 * ID로 예약 조회
 */
export const selectAppointmentById = async (id: string): Promise<Appointment | null> => {
  const [appointment] = await sql`
    SELECT a.id, a.date, a.time, a.duration, a.status, a.notes, a.reason, 
           a.created_at as "createdAt", a.updated_at as "updatedAt", 
           a.user_id as "userId", a.doctor_id as "doctorId",
           u.first_name as "user.firstName", u.last_name as "user.lastName", u.email as "user.email",
           d.name as "doctor.name", d.speciality as "doctor.speciality"
    FROM appointments a
    LEFT JOIN users u ON a.user_id = u.id
    LEFT JOIN doctors d ON a.doctor_id = d.id
    WHERE a.id = ${id}
  ` as [Appointment];

  return appointment || null;
};

/**
 * 예약 정보 업데이트
 */
export const updateAppointment = async (id: string, appointmentData: UpdateAppointmentData): Promise<Appointment | null> => {
  const { date, time, duration, status, notes, reason } = appointmentData;

  const [appointment] = await sql`
    UPDATE appointments 
    SET date = COALESCE(${date || null}, date),
        time = COALESCE(${time || null}, time),
        duration = COALESCE(${duration || null}, duration),
        status = COALESCE(${status || null}, status),
        notes = COALESCE(${notes || null}, notes),
        reason = COALESCE(${reason || null}, reason),
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, date, time, duration, status, notes, reason, 
              created_at as "createdAt", updated_at as "updatedAt", user_id as "userId", doctor_id as "doctorId"
  ` as [Appointment];

  return appointment || null;
};

/**
 * 예약 삭제
 */
export const deleteAppointment = async (id: string): Promise<boolean> => {
  const result = await sql`
    DELETE FROM appointments WHERE id = ${id}
  ` as [Appointment];

  return result.length > 0;
};

/**
 * 특정 의사와 날짜에 대한 예약된 시간대 조회
 * CONFIRMED, COMPLETED 상태를 차단 슬롯으로 간주
 * 특정 의사(doctorId) 의 특정 날짜(date) 에 이미 예약된 시간대(time) 목록
 */
export const selectBookedTimeSlots = async (doctorId: string, date: Date): Promise<string[]> => {
  const rows = await sql`
    SELECT time
    FROM appointments
    WHERE doctor_id = ${doctorId}
      AND DATE(date) = ${date.toISOString().split('T')[0]}
      AND status IN ('CONFIRMED', 'COMPLETED')
    ORDER BY time ASC
  ` as [{ time: string }];

  return rows.map(r => r.time);
};