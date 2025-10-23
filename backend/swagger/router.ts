import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config';

const swaggerRouter = Router();

// Swagger UI 및 JSON 스펙 엔드포인트 등록
swaggerRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
}));

swaggerRouter.get('/docs.json', (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

export { swaggerRouter };


