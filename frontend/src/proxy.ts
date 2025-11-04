import { clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(
  ['/', '/sign-in(.*)', '/sign-up(.*)']
);

export default clerkMiddleware(async (auth, req) => {
  // 공개 경로가 아닌 경우 (즉, 보호된 경로인 경우)
  if (!isPublicRoute(req)) {
    // 사용자 인증을 강제합니다. 인증되지 않은 경우 로그인 페이지로 리디렉션됩니다.
    await auth.protect(); 
  }
});