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
export const createDoctor = async (doctorData: CreateDoctorData): Promise<Doctor> => {
  const { name, email, phone, speciality, bio, imageUrl, gender } = doctorData;
  
  const [doctor] = await sql`
    INSERT INTO doctors (name, email, phone, speciality, bio, image_url, gender)
    VALUES (${name}, ${email}, ${phone}, ${speciality}, ${bio || null}, ${imageUrl}, ${gender})
    RETURNING id, name, email, phone, speciality, bio, image_url as "imageUrl", 
              gender, is_active as "isActive", created_at as "createdAt", updated_at as "updatedAt"
  ` as [Doctor];
  
  return doctor;
};

/**
 * 모든 활성 의사 조회
 */
export const getAllActiveDoctors = async (): Promise<Doctor[]> => {
  const doctors = await sql`
    SELECT id, name, email, phone, speciality, bio, image_url as "imageUrl", 
           gender, is_active as "isActive", created_at as "createdAt", updated_at as "updatedAt"
    FROM doctors 
    WHERE is_active = true
    ORDER BY created_at DESC
  ` as [Doctor];
  
  return doctors;
};

/**
 * ID로 의사 조회
 */
export const getDoctorById = async (id: string): Promise<Doctor | null> => {
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
export const getDoctorsBySpeciality = async (speciality: string): Promise<Doctor[]> => {
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
  const { name, phone, speciality, bio, imageUrl, gender, isActive } = doctorData;
  
  const [doctor] = await sql`
    UPDATE doctors 
    SET name = COALESCE(${name || null}, name),
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
export const deactivateDoctor = async (id: string): Promise<boolean> => {
  const result = await sql`
    UPDATE doctors 
    SET is_active = false, updated_at = NOW()
    WHERE id = ${id}
  ` as [Doctor];
  
  return result.length > 0;
};
