import { sql } from '../../config/database';

export interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  speciality: string;
  bio?: string;
  imageUrl: string;
  gender: 'MALE' | 'FEMALE';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  appointmentCount?: number;
}

export interface CreateDoctorData {
  name: string;
  email: string;
  phone: string;
  speciality: string;
  bio?: string;
  imageUrl: string;
  gender: 'MALE' | 'FEMALE';
}

export interface UpdateDoctorData {
  name?: string;
  email?: string;
  phone?: string;
  speciality?: string;
  bio?: string;
  imageUrl?: string;
  gender?: 'MALE' | 'FEMALE';
  isActive?: boolean;
}

/**
 * 의사 생성
 */
export const insertDoctor = async (doctorData: CreateDoctorData): Promise<Doctor> => {
  const { name, email, phone, speciality, bio, imageUrl, gender } = doctorData;

  const existingDoctor = await sql`
    SELECT 1 
    FROM doctors 
    WHERE email = ${email}
    LIMIT 1
  `;

  console.log("existingDoctor", existingDoctor);
  if( existingDoctor.length > 0 ) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  const [doctor] = await sql`
    INSERT INTO doctors (name, email, phone, speciality, bio, image_url, gender)
    VALUES (${name}, ${email}, ${phone}, ${speciality}, ${bio || null}, ${imageUrl}, ${gender})
    RETURNING id, name, email, phone, speciality, bio, image_url as "imageUrl", 
              gender, is_active as "isActive", created_at as "createdAt", updated_at as "updatedAt"
  ` as [Doctor];

  return doctor;
};

/**
 * 모든 의사 조회
 */
export const selectAllDoctors = async (): Promise<Doctor[]> => {
  const doctors = await sql`
    SELECT d.id, d.name, d.email, d.phone, d.speciality, d.bio, d.image_url as "imageUrl",
       d.gender, d.is_active as "isActive", d.created_at as "createdAt", d.updated_at as "updatedAt",
       (SELECT COUNT(*) FROM appointments a WHERE a.doctor_id = d.id) AS "appointmentCount"
    FROM doctors d
    ORDER BY d.created_at DESC
  ` as [Doctor];

  return doctors;
};

/**
 * ID로 의사 조회
 */
export const selectDoctorById = async (id: string): Promise<Doctor | null> => {
  const [doctor] = await sql`
    SELECT id, name, email, phone, speciality, bio, image_url as "imageUrl", 
           gender, is_active as "isActive", created_at as "createdAt", updated_at as "updatedAt"
    FROM doctors 
    WHERE id = ${id}
  ` as [Doctor];

  return doctor || null;
};

/**
 * 전문과목으로 의사 조회
 */
export const selectDoctorsBySpeciality = async (speciality: string): Promise<Doctor[]> => {
  const doctors = await sql`
    SELECT id, name, email, phone, speciality, bio, image_url as "imageUrl", 
           gender, is_active as "isActive", created_at as "createdAt", updated_at as "updatedAt"
    FROM doctors 
    WHERE speciality ILIKE ${`%${speciality}%`} AND is_active = true
    ORDER BY created_at DESC
  ` as [Doctor];

  return doctors;
};

/**
 * 의사 정보 업데이트
 */
export const updateDoctor = async (id: string, doctorData: UpdateDoctorData): Promise<Doctor | null> => {
  const { name, email, phone, speciality, bio, imageUrl, gender, isActive } = doctorData;

  const existingDoctor = await sql`
    SELECT 1 
    FROM doctors 
    WHERE email = ${email} AND id != ${id}
    LIMIT 1
  `;
  if( existingDoctor.length > 0 ) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  const [doctor] = await sql`
    UPDATE doctors 
    SET name = COALESCE(${name || null}, name),
        email = COALESCE(${email || null}, email),
        phone = COALESCE(${phone || null}, phone),
        speciality = COALESCE(${speciality || null}, speciality),
        bio = COALESCE(${bio || null}, bio),
        image_url = COALESCE(${imageUrl || null}, image_url),
        gender = COALESCE(${gender || null}, gender),
        is_active = COALESCE(${isActive !== undefined ? isActive : null}, is_active),
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, name, email, phone, speciality, bio, image_url as "imageUrl", 
              gender, is_active as "isActive", created_at as "createdAt", updated_at as "updatedAt"
  ` as [Doctor];

  return doctor || null;
};

/**
 * 의사 삭제 (비활성화)
 */
export const deleteDeactivateDoctor = async (id: string): Promise<boolean> => {
  const result = await sql`
    UPDATE doctors 
    SET is_active = false, updated_at = NOW()
    WHERE id = ${id}
  ` as [Doctor];

  return result.length > 0;
};
