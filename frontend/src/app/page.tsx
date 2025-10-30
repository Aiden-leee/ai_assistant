import { CTA, Footer, Header, Hero, HowItWorks, PricingSection, WhatToAsk } from "@/components/landing";
import { initUserProfile } from "@/lib/actions/auth/users";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  
  // 사용자 초기화 ( 프로필 생성 )
  await initUserProfile();

  // 사용자가 있으면 대시보드로 리다이렉트
  if(user) redirect('/dashboard');
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
