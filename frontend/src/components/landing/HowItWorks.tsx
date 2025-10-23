import { SignUpButton } from '@clerk/nextjs'
import { ArrowRightIcon, ZapIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

function HowItWorks() {
  return (
    <section className='relative py-32 px-6 outline-hidden z-10 max-w-7xl mx-auto'>
      {/* header */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full border border-primary/10 backdrop-blur-sm mb-6">
          <ZapIcon className="size-4 text-primary" />
          <span className="text-sm font-medium text-primary">간소화된 프로세스</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            더 나은
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            치아 건강을 위한 3단계
          </span>
        </h2>

        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          간소화된 프로세스를 통해 모든 사람이 치과 진료를 쉽고 편리하게,<br /> 스트레스 없이 받을 수 있습니다.
        </p>
      </div>

      {/* 단계 */}
      <div className="relative">
        {/* 선 */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent transform -translate-y-1/2 hidden lg:block"></div>

        <div className="grid lg:grid-cols-3 items-stretch gap-12 lg:gap-8">
          {/* STEP1 */}
          <div className="relative group h-full">
            <div className="relative h-full flex flex-col bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
              {/* Step Number */}
              <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg">
                1
              </div>

              {/* icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 mb-6">
                <Image src="/audio.png" alt="Voice Chat" width={40} height={40} className="w-14" />
              </div>

              <h3 className="text-2xl font-bold mb-4 text-center">질문하기</h3>
              <p className="text-muted-foreground text-center leading-relaxed mb-6">
                AI 비서와 치과 관련 걱정거리에 대해 채팅하세요.<br /> 증상, 치료, 구강 건강 팁에 대한 답변을 바로 받아보세요.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 justify-center mt-auto">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  24/7 Available
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  즉시 응답
                </span>
              </div>

            </div>
          </div>

          {/* STEP 2 */}
          <div className="relative group h-full">
            <div className="relative h-full flex flex-col bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
              {/* Step Number */}
              <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg">
                2
              </div>

              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 mb-6">
                <Image src="/brain.png" alt="AI Brain" width={40} height={40} className="w-14" />
              </div>

              <h3 className="text-2xl font-bold mb-4 text-center">전문가의 조언</h3>
              <p className="text-muted-foreground text-center leading-relaxed mb-6">
                수천 건의 치과 사례를 기반으로 개인 맞춤형 추천을 받아보세요. <br />AI가 전문가 수준의 인사이트를 제공합니다.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 justify-center mt-auto">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  AI 기반
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  개인화
                </span>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="relative group h-full">
            <div className="relative h-full flex flex-col bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
              {/* Step Number */}
              <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg">
                3
              </div>

              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 mb-6">
                <Image src="/calendar.png" alt="Calendar" width={40} height={40} className="w-14" />
              </div>

              <h3 className="text-2xl font-bold mb-4 text-center">예약 & 케어</h3>
              <p className="text-muted-foreground text-center leading-relaxed mb-6">
                검증된 치과의사와 예약하고 종합적인 후속 관리를 받으세요. <br />진행 상황을 원활하게 추적하세요.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 justify-center mt-auto">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  검증된 의사
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  후속 관리
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="text-center mt-16">
        <SignUpButton mode="modal">
          <Button size="lg">
            <ArrowRightIcon className="mr-2 size-5" />
            지금 시작하기
          </Button>
        </SignUpButton>
      </div>
    </section>
  )
}

export default HowItWorks