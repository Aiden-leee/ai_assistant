import { SignUpButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import { CalendarIcon, MicIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'

function Hero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
        <div className="absolute inset-0 
        bg-[linear-gradient(to_right,#aaa_1px,transparent_1px),linear-gradient(to_bottom,#aaa_1px,transparent_1px)]
         bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
      </div>

      {/* 배경 구체 */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r 
      from-primary/20 to-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/15 to-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* 좌측 */}
            <div className="space-y-10">
              <div className="space-y-6">
                {/* 뱃지 */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r
                from-primary/10 to-primary/5 rounded-full border border-primary/20 backdrop-blur-sm">
                  <div className='w-2 h-2 bg-primary rounded-full animate-pulse'></div>
                  <span className="text-sm font-medium text-primary">
                    AI-Powered Assistant
                  </span>
                </div>

                {/* 메인 타이틀 */}
                <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                    사용자의
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    질문에
                  </span>
                  <br />
                  <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                    즉시 답변해요
                  </span>
                </h1>

                {/* 서브타이틀 */}
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl font-medium">
                  AI 비서와 채팅하여 즉각적인 상담, 스마트한 예약, 개인 맞춤형 케어
                  <br />추천을 받아보세요. 24시간 연중무휴 이용 가능합니다.
                </p>

                {/* CTA 버튼 */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <SignUpButton mode='modal'>
                    <Button size="lg" className="items-center">
                      <MicIcon className="mr-2 size-5" />
                      음성 AI 대화 시작
                    </Button>
                  </SignUpButton>
                  <SignUpButton mode='modal'>
                    <Button size="lg" variant="outline" className="items-center">
                      <CalendarIcon className="mr-2 size-5" />
                      일정 예약하기
                    </Button>
                  </SignUpButton>
                </div>

                {/* 사용자 추천 */}
                <div className="pt-8">
                  <div className="flex items-center gap-6">
                    {/* 사용자 이미지 */}
                    <div className="flex -space-x-3">
                      <Image
                        src={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1160"}
                        alt="user1"
                        width={48}
                        height={48}
                        className='w-12 h-12 rounded-full object-cover ring-4 ring-background'
                      />
                      <Image
                        src={"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740"}
                        alt="user1"
                        width={48}
                        height={48}
                        className='w-12 h-12 rounded-full object-cover ring-4 ring-background'
                      />
                      <Image
                        src={"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774"}
                        alt="user1"
                        width={48}
                        height={48}
                        className='w-12 h-12 rounded-full object-cover ring-4 ring-background'
                      />
                      <Image
                        src={"https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740"}
                        alt="user1"
                        width={48}
                        height={48}
                        className='w-12 h-12 rounded-full object-cover ring-4 ring-background'
                      />
                      <Image
                        src={"https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774"}
                        alt="user1"
                        width={48}
                        height={48}
                        className='w-12 h-12 rounded-full object-cover ring-4 ring-background'
                      />
                    </div>

                    {/* 평점 */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-foreground">4.9/5</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Trusted by{" "}
                        <span className="font-semibold text-foreground">1,200+ 사용자</span>
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* 우측 */}
            <div className="relative lg:pl-8">
                {/* 그라데이션 구체 */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl rotate-45 blur-xl"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-2xl"></div>

                <Image
                  src={"/hero.png"}
                  alt="AI"
                  width={600}
                  height={600}
                  className='w-full h-auto'
                />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero