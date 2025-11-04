import { Router } from 'express';
import authRouter from './auth/auth.route';
import appointmentRouter from './appointment/appointment.route';
import doctorRouter from './doctors/doctor.route';
import mailerRouter from './mailer/mailer.route';
import webhookRouter from './webhooks/clerk.route';
import voiceRouter from './voice/voice.route';

const apiRouter = Router();

// 인증 관련 라우트
apiRouter.use('/auth', authRouter);

// 예약 관련 라우트
apiRouter.use('/appointments', appointmentRouter);

// 의사 관련 라우트
apiRouter.use('/doctors', doctorRouter);

// 메일러 라우트
apiRouter.use('/mailer', mailerRouter);

// 웹훅 라우트
apiRouter.use('/webhooks', webhookRouter);

// 음성 통화 라우트
apiRouter.use('/voice', voiceRouter);

export { apiRouter };
