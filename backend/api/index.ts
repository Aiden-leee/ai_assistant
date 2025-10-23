import { Router } from 'express';
import { authRouter } from './auth/auth.route';
import { appointmentRouter } from './appointment/appointment.route';

const apiRouter = Router();

// 인증 관련 라우트
apiRouter.use('/auth', authRouter);

// 예약 관련 라우트
apiRouter.use('/appointments', appointmentRouter);

export { apiRouter };
