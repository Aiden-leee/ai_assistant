# AI Assistant Project
<img width="100" height="100" alt="Image" src="https://github.com/user-attachments/assets/4c159ff4-1f5f-42a1-b903-78eb321f9f2f" /> <br />

## 서비스
→ 의료 예약을 AI 음성 비서와 함께 간편하게 진행할 수 있는 서비스

## 📋 주요 기능 요약
→ AI 음성 통화로 진료 예약 / 환자 정보 관리 / 의사별 스케줄 관리 / 알림<br /><br />

| 기능 | 설명 |
|------|------|
| **음성 AI 상담** | VAPI 기반 음성 대화로 진료 예약 및 문의 처리 |
| **사용자 인증** | Clerk를 활용한 로그인 및 회원가입 |
| **예약 관리** | 환자–의사 간 예약 생성, 수정, 취소 기능 |
| **알림** | 예약 시 이메일 알림 |
| **관리자 대시보드** | 의사별 예약 현황 확인 |

## 기술적 특징

- shadcn/ui를 활용한 일관되고 모던한 UI 디자인 구현
- VAPI 음성 AI를 통한 음성 기반 상담 및 예약 시스템
- Clerk 인증 시스템으로 회원가입 및 로그인 기능을 신속하게 구축
- 예약 시 node mailer 활용하여 이메일 알림 처리
- NeonDB 클라우드 서비스를 이용해 PostgreSQL 기반의 안정적인 데이터 관리
- Server Actions + REST API 병행 구조로 데이터 처리 효율성과 유지보수성 확보<br />
- Next.js 서버 컴포넌트 기반 아키텍처로 SEO 최적화 및 SSR 대응 <br />
- Pino 로깅 및 에러 핸들링 적용<br /><br />

## 🚀 기술 스택

- **Backend**: Node.js, Express.js  
- **Frontend**: Next.js, typescript
- **Database**: PostgreSQL (Neon)  
- **third-party**: VAPI (음성 AI Agent), Clerk (인증/회원가입), swagger
- **UI Framework**: shadcn/ui  


## 🏥 DB 설계
![DBERD](./readme_imgs/erd.png) <br />

| 테이블 | 설명 |
|--------|------|
| `users` | 회원(환자)의 기본 정보 |
| `doctors` | 의사 정보 및 진료 전문 분야 |
| `appointments` | 예약 내역 (사용자–의사 연결) |
| `voice_calls` | 음성 통화 세션 기록 |
| `voice_messages` | 통화 중 오간 메시지 로그 |


## 👤 users (사용자)

- **역할**: 회원(환자)의 기본 정보를 저장합니다.
- **주요 필드**
  - `clerk_id`: Clerk 인증용 사용자 ID (UNIQUE)
  - `email`: 이메일 (UNIQUE)
  - `first_name`, `last_name`: 이름
  - `phone`: 전화번호
- **특징**
  - `ON DELETE CASCADE` → 사용자가 삭제되면 관련 예약 및 통화도 함께 삭제됩니다.

---

## 🩺 doctors (의사)

- **역할**: 병원 내 의사 정보를 저장합니다.
- **주요 필드**
  - `name`: 이름
  - `email`: 이메일 (UNIQUE)
  - `speciality`: 전문 분야
  - `gender`: 성별 (`MALE` / `FEMALE`)
  - `is_active`: 현재 진료 여부
- **특징**
  - `CHECK` 제약조건으로 성별값 제한.
  - `image_url`을 통한 프로필 이미지 저장.

---

## 📅 appointments (예약)

- **역할**: 사용자와 의사 간의 진료 예약 정보를 저장합니다.
- **주요 필드**
  - `date`, `time`: 예약 일시
  - `duration`: 예약 시간(분)
  - `status`: 예약 상태 (`CONFIRMED`, `COMPLETED`)
  - `notes`, `reason`: 메모 및 예약 사유
- **관계**
  - `user_id` → `users.id`
  - `doctor_id` → `doctors.id`
- **특징**
  - 예약 생성 및 완료 시점을 관리 (`created_at`, `updated_at`)

---

## 🎙️ voice_calls (음성 통화)

- **역할**: 사용자의 음성 AI 상담 통화 세션을 저장합니다.
- **주요 필드**
  - `user_id`: 통화 주체 사용자
  - `duration`: 통화 길이 (초 단위)
  - `status`: 통화 상태 (`COMPLETED`, `FAILED`)
- **관계**
  - `user_id` → `users.id`

---

## 💬 voice_messages (통화 메시지)

- **역할**: 통화 중 오간 대화(음성→텍스트 변환)를 저장합니다.
- **주요 필드**
  - `call_id`: 통화 ID
  - `role`: 발화자 (`assistant`, `user`)
  - `content`: 메시지 내용
  - `message_time`: 발화 시점
- **관계**
  - `call_id` → `voice_calls.id`


## swagger API 명세서
![SWAGGER1](./readme_imgs/swagger1.png) <br />
![SWAGGER2](./readme_imgs/swagger2.png) <br />
![SWAGGER3](./readme_imgs/swagger3.png) <br />


## 프론트 화면 구성

### 메인
![main1](./readme_imgs/메인_1.png)<br />
![main1](./readme_imgs/메인_2.png)<br />
![main1](./readme_imgs/메인_3.png)<br />
![main1](./readme_imgs/메인_4.png)<br />
![main1](./readme_imgs/메인_5.png)<br />

### 회원가입
![auth](./readme_imgs/회원가입.png)<br />

### 작동방식
![work](./readme_imgs/작동방식.png)<br />

### 문의하기
![inquiry](./readme_imgs/문의하기.png)<br />

### 가격(프로)
![price](./readme_imgs/프로_1.png)<br />
![price](./readme_imgs/프로_2.png)<br />
![price](./readme_imgs/프로_3.png)<br />
![price](./readme_imgs/결제이메일.png)<br />

### 관리자
![admin](./readme_imgs/관리자1.png)<br />
![admin](./readme_imgs/관리자_예약확인.png)<br />
![admin](./readme_imgs/관리자_의사추가.png)<br />
![admin](./readme_imgs/관리자_의사삭제.png)<br />

### 대시보드
![dashboard](./readme_imgs/대시보드.png)<br />

### 예약
![예약](./readme_imgs/예약1.png)<br />
![예약](./readme_imgs/예약2.png)<br />
![예약](./readme_imgs/예약3.png)<br />
![예약](./readme_imgs/예약_모달.png)<br />
![예약](./readme_imgs/예약_목록.png)<br />
![예약](./readme_imgs/예약_메일.png)<br />

### 음성AI
![음성](./readme_imgs/음성_1.png)<br />
![음성](./readme_imgs/음성_2.png)<br />

https://github.com/user-attachments/assets/b15a4258-d934-4c85-9775-50086ba590dd





## 배포 구성 (Deployment Setup)

