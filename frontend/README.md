### LOGO 이미지 생성 AI 로 제작 
<img width="100" height="100" alt="Image" src="https://github.com/user-attachments/assets/4c159ff4-1f5f-42a1-b903-78eb321f9f2f" /> <br />
- 말풍선 + 로봇 얼굴
- 말풍선 안에 귀여운 AI 로봇 얼굴이 들어가 있음
- “대화형 AI 비서”의 핵심 기능을 직관적으로 표현
- 아래쪽에는 미묘한 그림자와 반사광으로 3D 입체감 강조

npx create-next-app@15.5.0 .
biome.json:  ESLint와 Prettier를 대체

### shadcn ui
npx shadcn@latest init
// 모든 컴포넌트 추가시 
npx shadcn@latest add

### clerk 로그인
npm install @clerk/nextjs

### neon postgresql

### Vapi 
npm install @vapi-ai/web@2.3.9

### avatar placeholder
https://avatar.iran.liara.run/public/boy?username=[value]

### react email
npm install @react-email/components

### 요금제 구성
예상 수익 = (평균 요금 × 가입자 수)<br />
예상 비용 = (평균 사용량 × 분당 원가 × 가입자 수)<br />
순이익 = 예상 수익 - 예상 비용<br />

ex1) <br />
분당 원가 = $0.05 <br />
평균 통화 시간 = 40분<br />
월 구독료 = $19<br /><br />

가입자수(n) = 1 <br />
예상수익 = 19 * n <br />
예상비용 = 40분 * 0.05 * n <br />
순이익 = (19 - 2) - n =  17 <br />
1명당= $17 <br /><br />

ex2) <br />
사용자 1,000명	<br />
월 구독료 $19	<br />
평균 사용 시간 30분	<br />
원가 $0.05/분	<br /><br />

총 수익 = $19 × 1,000 = $19,000	( 사용자 * 월구독료 ) <br />
총 원가 = $0.05 × 30분 × 1,000명 = $1,500 ( 원가 * 평균사용량 * 사용자 ) <br />
순이익 = $17,500 (총수익 - 총원가), (마진율 약 92%) 17500 / 19000 = 92.105% <br /><br />

- 손익분기점 기준으로 허용 가능한 평균 사용시간<br />
- 목표 마진율을 유지하면서 서비스 사용시간이 얼마까지 허용<br />
평균 사용량<br />
평균 사용량 = (허용 가능한 원가 한도) / (분당 원가)<br />
1시간 미만으로 기준을 잡음.<br /><br />

ex)<br />
분당 원가 $0.05<br />
구독료 $19<br />
목표 마진율 85%<br /><br />

허용 가능한 원가 한도 = 구독료×(1−목표 마진율) <br />
원가 허용 한도 = $19 * (1 - 0.85) = 2.85 <br />
2.85 / 0.05 = 57분<br /><br />
한 달에 평균 57분까지 통화해야 85% 마진 유지<br /><br />

ex2) <br />
분당 원가 = $0.04<br />
허용 원가 한도 = $3<br />
→ 평균 사용량 = 75 분<br />
