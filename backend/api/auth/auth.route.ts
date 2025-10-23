import { Router } from 'express';
import { 
  postUser, 
  getUserProfile, 
  putUserProfile, 
  deleteUser 
} from './auth.controller';

const authRouter = Router();

// 사용자 등록
authRouter.post('/register', postUser);

// 사용자 정보 조회
authRouter.get('/profile/:clerkId', getUserProfile);

// 사용자 정보 업데이트
authRouter.put('/profile/:clerkId', putUserProfile);

// 사용자 삭제
authRouter.delete('/profile/:clerkId', deleteUser);

export { authRouter };
