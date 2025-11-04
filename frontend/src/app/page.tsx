import { CTA, Footer, Header, Hero, HowItWorks, PricingSection, WhatToAsk } from "@/components/landing";
import { initUserProfile } from "@/lib/actions/auth/users";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const user = await currentUser();

  // 로그인된 경우에도 초기화만 하고 홈에 머무름 (자동 리다이렉트 제거)
  if (user) {
    await initUserProfile();
  }
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <HowItWorks />
      <WhatToAsk />
      <PricingSection />
      <CTA />
      <Footer />
    </div>
  );
}
