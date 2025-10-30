# AI Assistant Backend

Node.js와 PostgreSQL을 사용한 의료 예약 시스템 백엔드 API입니다.

## 🚀 기술 스택

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon)
- **ORM**: @neondatabase/serverless
- **Language**: TypeScript

## 📁 프로젝트 구조

```
backend/
├── api/                    # API 라우트
│   ├── auth/              # 인증 관련 API
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.route.ts
│   |   └── auth.model.ts
│   ├── appointment/       # 예약 관련 API
│   │   ├── appointment.controller.ts
│   │   ├── appointment.service.ts
│   │   ├── appointment.route.ts
│   |   ├── appointment.model.ts
│   |   └── doctor.model.ts
│   └── index.ts          # 라우터 관리
├── config/               # 설정 파일
│   └── database.ts       # 데이터베이스 연결
├── scripts/              # 데이터베이스 스크립트
│   └── create-tables.sql
├── app.ts               # 메인 애플리케이션
├── package.json
├── tsconfig.json
└── env.development 
```

## 🛠️ 설치 및 실행

### 1. 의존성 설치
```bash
cd backend
npm install
```

### 2. 환경 변수 설정
```bash
cp env.development .env
```

`.env` 파일을 편집하여 다음 값들을 설정하세요:
```env
DATABASE_URL=postgresql://username:password@hostname:port/database
JWT_SECRET=your-secret-key-here
PORT=3001
NODE_ENV=development
```

### 3. 데이터베이스 설정
PostgreSQL 데이터베이스에서 `scripts/create-tables.sql` 파일을 실행하여 테이블을 생성하세요.

### 4. 개발 서버 실행
```bash
npm run dev
```

### 5. 프로덕션 빌드
```bash
npm run build
npm start
```

## 📚 API 엔드포인트

### 인증 관련 API (`/api/auth`)

- `POST /api/auth/register` - 사용자 등록
- `GET /api/auth/profile/:clerkId` - 사용자 정보 조회
- `PUT /api/auth/profile/:clerkId` - 사용자 정보 업데이트
- `DELETE /api/auth/profile/:clerkId` - 사용자 삭제

### 예약 관련 API (`/api/appointments`)

- `POST /api/appointments` - 예약 생성
- `GET /api/appointments/user/:userId` - 사용자 예약 목록
- `GET /api/appointments/doctor/:doctorId` - 의사 예약 목록
- `GET /api/appointments/date/:date` - 특정 날짜 예약 조회
- `GET /api/appointments/:id` - 예약 상세 조회
- `PUT /api/appointments/:id` - 예약 정보 업데이트
- `DELETE /api/appointments/:id` - 예약 삭제

### 헬스 체크
- `GET /health` - 서버 상태 확인

## 🗄️ 데이터베이스 스키마

### Users (사용자)
- `id`: 고유 식별자
- `clerk_id`: Clerk 인증 ID
- `email`: 이메일 주소
- `first_name`: 이름
- `last_name`: 성
- `phone`: 전화번호

### Doctors (의사)
- `id`: 고유 식별자
- `name`: 의사 이름
- `email`: 이메일 주소
- `phone`: 전화번호
- `speciality`: 전문과목
- `bio`: 소개
- `image_url`: 프로필 이미지
- `gender`: 성별 (MALE/FEMALE)
- `is_active`: 활성 상태

### Appointments (예약)
- `id`: 고유 식별자
- `date`: 예약 날짜
- `time`: 예약 시간
- `duration`: 예약 시간 (분)
- `status`: 예약 상태 (CONFIRMED/COMPLETED)
- `notes`: 메모
- `reason`: 예약 사유
- `user_id`: 사용자 ID (외래키)
- `doctor_id`: 의사 ID (외래키)

## 🔧 개발 가이드

### MVC 패턴
- **Model**: 데이터베이스 모델 (`models/`)
- **View**: JSON 응답 (API)
- **Controller**: 요청 처리 (`*controller.ts`)
- **Service**: 비즈니스 로직 (`*service.ts`)

### 함수형 프로그래밍
- 순수 함수 사용
- 불변성 유지
- 중복 코드 제거
- 일관된 네이밍

### 에러 처리
- 일관된 에러 응답 형식
- 적절한 HTTP 상태 코드
- 한국어 에러 메시지




## 설치 패키지

### swagger-jsdoc
npm i swagger-jsdoc swagger-ui-express

### nodemailer
npm i nodemailer
npm i --save-dev @types/nodemailer

### pino
npm i pino pino-http