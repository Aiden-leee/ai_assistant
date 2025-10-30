import { Router } from "express";
import { postEmailController } from "./mailer.controller";

// 이메일 라우터
const mailerRouter = Router();

// 이메일 전송
mailerRouter.post('/send-email', postEmailController);

export default mailerRouter;