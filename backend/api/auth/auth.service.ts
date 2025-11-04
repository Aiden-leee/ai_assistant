import { 
  insertUser, 
  selectUserByClerkId, 
  updateUser, 
  deleteUser,
  CreateUserData,
  UpdateUserData, 
  selectUserByEmail
} from './auth.model';

/**
 * 사용자 등록 서비스
 */
export const createUser = async (userData: CreateUserData) => {
  // 기존 사용자 확인
  const existingUser = await selectUserByClerkId(userData.clerkId);
  if (existingUser) {
    throw new Error('이미 등록된 사용자입니다.');
  }
  
  // 이메일 중복 확인
  const existingEmail = await selectUserByEmail(userData.email);
  if (existingEmail) {
    throw new Error('이미 사용 중인 이메일입니다.');
  }
  
  return await insertUser(userData);
};

/**
 * Clerk ID로 사용자 조회
 */
export const readUserByClerkId = async (clerkId: string) => {
  return await selectUserByClerkId(clerkId);
};

/**
 * 사용자 프로필 업데이트
 */
export const modifyUserProfile = async (clerkId: string, userData: UpdateUserData) => {
  const user = await selectUserByClerkId(clerkId);
  if (!user) {
    return null;
  }
  
  return await updateUser(user.id, userData);
};

/**
 * 사용자 삭제
 */
export const removeUser = async (clerkId: string) => {
  // 사용자 조회
  const user = await selectUserByClerkId(clerkId);
  if (!user) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }
  
  // 사용자 삭제
  return await deleteUser(user.id);
};

export const authService = {
  createUser,
  readUserByClerkId,
  modifyUserProfile,
  removeUser
};