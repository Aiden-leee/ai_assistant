# 요구사항1

## context
당신은 시니어 풀스택 개발자 입니다.
주어진 코드를 가독성과 유지보수성을 높이세요.

## rules
- 가능하면 함수형 프로그래밍 패턴을 사용하세요. 
- 중복된 변수나 주석을 제거하세요.
- 일관된 이름과 형식을 유지하세요.
- 함수 기능을 간략하게 주석을 작성해주세요

## input
<!-- 코드 시작 -->
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}


model User {
  id        String @id @default(cuid())
  clerkId   String @unique
  email     String @unique
  firstName String?
  lastName  String?
  phone     String?
  createdAt DateTime @default(now()) // member since sep 2025
  updatedAt DateTime @updatedAt

  // relationships
  appointments Appointment[]

  @@map("users")
}

model Doctor {
  id          String   @id @default(cuid())
  name        String
  email       String   @unique
  phone       String
  speciality  String
  bio         String?
  imageUrl    String
  gender      Gender
  isActive    Boolean @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // relationships
  appointments Appointment[]

  @@map("doctors")

}

model Appointment {
  id          String            @id @default(cuid())
  date        DateTime
  time        String // store time as string i.e. 14:30
  duration    Int               @default(30) // duration in minutes
  status      AppointmentStatus @default(CONFIRMED)
  notes       String?
  reason      String? // reason for appointment - teeth cleaning? emergency visit? etc.
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt

  // foreign keys
  userId String
  doctorId String

  // relationships
  user   User @relation(fields: [userId], references: [id], onDelete: Cascade)
  doctor Doctor @relation(fields: [doctorId], references: [id], onDelete: Cascade)

  @@map("appointments")
}


enum Gender {
  MALE
  FEMALE
}

enum AppointmentStatus {
 CONFIRMED
 COMPLETED
}
<!-- 코드 끝 -->

- prisma 를 사용하지 않을거야 
- 코드를 보고 node.js 서버에서 postgresql을 사용할거야
- @neondatabase/serverless 을 사용해서 연동할거야 
- node.js에서 폴더구성은 /backend 안에 생성되게 해줘 
- index는 app.ts 로 이름 해줘 
- 기능 단위로 api 만들거야 
예를 들면 유저 관련은 /backend/api/auth/
예약은 /backend/api/appointment/
- mvc 패턴활용 (controller, service, model)
예를들면
/backend/api/auth/xxx.controller.ts
/backend/api/auth/xxx.service.ts
/backend/api/auth/xxx.model.ts
/backend/api/auth/xxx.route.ts
- /frontend, /backend 둘은 같은 계층의 폴더야
- /backend/api/index.ts router.use() 로 라우트 관리하는 파일이야