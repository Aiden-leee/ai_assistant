import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { apiRouter } from './api/index';
import { swaggerRouter } from './swagger/router';
import { httpLogger } from './config/logger';
import type { NextFunction, Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3001;

// 미들웨어 설정
app.use(httpLogger);
app.use(helmet()); // 보안 헤더 설정
app.use(cors()); // CORS 설정
app.use(express.json()); // JSON 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩 파싱

// API 라우트 설정
app.use('/api', swaggerRouter); // Swagger UI/JSON
app.use('/api', apiRouter);

// 헬스 체크 엔드포인트
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 핸들러
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: '요청하신 리소스를 찾을 수 없습니다.'
  });
});

// 에러 핸들러
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // pino-http가 있으면 구조화 에러 로그 남김
  // @ts-ignore
  if ((req as Request).log?.error) (req as Request).log.error({ err }, 'unhandled error');
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: '서버 내부 오류가 발생했습니다.'
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`📊 환경: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
