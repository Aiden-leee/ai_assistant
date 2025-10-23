import swaggerJsdoc, { Options } from 'swagger-jsdoc';

// Swagger 기본 메타데이터와 스캔 대상 설정
export const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'AI Assistant API',
      version: '1.0.0',
      description: 'AI Assistant 백엔드 API 문서',
    },
    servers: [
      {
        url: '/api',
        description: 'API Base Path',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ BearerAuth: [
      
    ] }],
  },
  // YAML 기반 스캔만 사용 (JSDoc 비활성화)
  apis: [
    './swagger/schemas/*.yaml',
    './swagger/paths/*.yaml',
  ],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);


