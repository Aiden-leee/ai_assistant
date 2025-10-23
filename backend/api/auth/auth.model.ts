import { sql } from '../../config/database';

export interface User {
  id: string;
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserData {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

/**
 * 사용자 생성
 */
export const insertUser = async (userData: CreateUserData): Promise<User> => {
  const { clerkId, email, firstName, lastName, phone } = userData;
  
  const [user] = await sql`
    INSERT INTO users (clerk_id, email, first_name, last_name, phone)
    VALUES (${clerkId}, ${email}, ${firstName || null}, ${lastName || null}, ${phone || null})
    RETURNING id, clerk_id as "clerkId", email, first_name as "firstName", 
              last_name as "lastName", phone, created_at as "createdAt", updated_at as "updatedAt"
  ` as [User];
  
  return user;
};

/**
 * Clerk ID로 사용자 조회
 */
export const selectUserByClerkId = async (clerkId: string): Promise<User | null> => {
  const [user] = await sql`
    SELECT id, clerk_id as "clerkId", email, first_name as "firstName", 
           last_name as "lastName", phone, created_at as "createdAt", updated_at as "updatedAt"
    FROM users 
    WHERE clerk_id = ${clerkId}
  ` as [User];
  
  return user || null;
};

/**
 * 이메일로 사용자 조회
 */
export const selectUserByEmail = async (email: string): Promise<User | null> => {
  const [user] = await sql`
    SELECT id, clerk_id as "clerkId", email, first_name as "firstName", 
           last_name as "lastName", phone, created_at as "createdAt", updated_at as "updatedAt"
    FROM users 
    WHERE email = ${email}
  ` as [User];
  
  return user || null;
};

/**
 * 사용자 정보 업데이트
 */
export const updateUser = async (id: string, userData: UpdateUserData): Promise<User | null> => {
  const { firstName, lastName, phone } = userData;
  
  const [user] = await sql`
    UPDATE users 
    SET first_name = COALESCE(${firstName || null}, first_name),
        last_name = COALESCE(${lastName || null}, last_name),
        phone = COALESCE(${phone || null}, phone),
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, clerk_id as "clerkId", email, first_name as "firstName", 
              last_name as "lastName", phone, created_at as "createdAt", updated_at as "updatedAt"
  ` as [User];
  
  return user || null;
};

/**
 * 사용자 삭제
 */
export const deleteUser = async (id: string): Promise<boolean> => {
  const result = await sql`
    DELETE FROM users WHERE id = ${id}
  ` as [User];
  
  return result.length > 0;
};
