import Navbar from '@/components/commons/Navbar';
import { PricingTable } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import { CrownIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'

async function ProPage() {
    const user = await currentUser();

    if (!user) redirect('/');

    // const { has } = await auth();

    // const hasProPlan = has({plan: 'ai_basic'}) || has({plan: "ai_pro"})

    // console.log("hasProPlan",hasProPlan);
    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
                <div className="mb-12 overflow-hidden">
                    <div className="flex items-center justify-between bg-gradient-to-br from-primary/10 to-background rounded-3xl p-8 border border-primary/20">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primar/10 rounded-full border border-primary/20 ">
                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-primary">Upgrade to Pro</span>
                            </div>

                            <div>
                                <h1 className="text-4xl font-bold mb-2">프리미엄 AI 진료 잠금 해제</h1>
                                <p className="text-muted-foreground">
                                    무제한 AI 컨설팅, 고급 기능, 우선 지원을 받아 치과 건강을 한 단계 더 높여보세요.
                                </p>
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                                <CrownIcon className="w-16 h-16 text-primary" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 가격 섹션 */}
                <div className="space-y-8">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold">플랜을 선택하세요</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            치과 진료에 필요한 최적의 플랜을 선택하세요.<br />모든 플랜에는 안전한 접속과 은행 수준의 암호화가 포함되어 있습니다.
                        </p>
                    </div>

                    <PricingTable />
                </div>
            </div>
        </>
    )
}

export default ProPage