import pino from 'pino';
import pinoHttp from 'pino-http';

const logger = pino(
  process.env.NODE_ENV === 'production'
    ? {} // 프로덕션에서는 JSON 로그를 그대로 출력 (서버/클라우드에서 분석하기 좋음)
    : {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true, // 콘솔에서 색깔 추가
          translateTime: 'SYS:standard', // 시간 형식 지정
          ignore: 'pid,hostname' // pid, hostname 제외
        }
      }
    }
);

// Express용 요청/응답 자동 로거 미들웨어
const httpLogger = pinoHttp({
  logger,
  genReqId: () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, // 각 요청마다 고유한 요청 ID(req.id) 를 생성
  autoLogging: {
    ignore: (req) => req.url === '/health' // health 엔드포인트는 로깅하지 않음
  },
  customLogLevel(req, res, err) {
    // 로그의 (Level)
    if (err) return 'error';
    const status = res.statusCode;
    if (status >= 500) return 'error';
    if (status >= 400) return 'warn';
    return 'info';
  },
  serializers: {
    req(req: any) {
      return {
        id: req.id,
        url: req.url,
        body: req.body,
        query: req.query,
        params: req.params
      };
    },
    res(res: any) {
      return { statusCode: res.statusCode };
    },
    err: pino.stdSerializers.err
  },
  customSuccessMessage(req, res) {
    return `[${req.method}] ${req.url} ${res.statusCode}`; // [GET] /api/users 200
  },
  customErrorMessage(req, res, err) {
    // 요청 실패 시 로그 메시지 생성
    // request errored with status 500: Database connection failed
    return `[${req.method}] ${req.url} -> request errored with status ${res.statusCode}: ${err.message}`;
  },
  // 본문/쿼리는 기본 로그에서 제외해 라인을 짧게 유지
  // customProps(req: any) {
  //   return { requestId: req.id };
  // }
});

export { logger, httpLogger };


