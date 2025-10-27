import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import React from 'react'

async function WelcomeSection() {
    const user = await currentUser();

    return (
        <div className="relative z-10 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20 mb-12 overflow-hidden">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                    <div className="size-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-primary">온라인 및 준비</span>
                </div>
                <div>
                    <h1 className="text-4xl font-bold mb-2">
                        좋은{" "}
                        {new Date().getHours() < 12
                            ? "아침"
                            : new Date().getHours() < 18
                                ? "오후"
                                : "저녁"}
                        , {user?.firstName}!
                    </h1>
                    <p className="text-muted-foreground">
                        귀하의 개인 AI 치과 조수가 귀하의 완벽한 구강 건강을 유지하는데 도움을 드릴 준비가 되었습니다.
                    </p>
                </div>
            </div>

            <div className="lg:flex hidden items-center justify-center size-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full ">
                <Image src="/logo.png" alt="DentWise" width={64} height={64} className="w-16 h-16" />
            </div>
        </div>
    )
}

export default WelcomeSection