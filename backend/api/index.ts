import { Router } from 'express';
import { authRouter } from './auth/auth.route';
import { appointmentRouter } from './appointment/appointment.route';
import { doctorRouter } from './doctors/doctor.route';

const apiRouter = Router();

// 인증 관련 라우트
apiRouter.use('/auth', authRouter);

// 예약 관련 라우트
apiRouter.use('/appointments', appointmentRouter);

// 의사 관련 라우트
apiRouter.use('/doctors', doctorRouter);

export { apiRouter };
