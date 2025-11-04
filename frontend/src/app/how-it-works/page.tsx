import React from 'react'
import { Header, Footer } from '@/components/landing'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, MessageSquareIcon, CalendarIcon, BrainIcon, ZapIcon, ShieldIcon, ClockIcon, UserIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full border border-primary/10 backdrop-blur-sm mb-6">
            <ZapIcon className="size-4 text-primary" />
            <span className="text-sm font-medium text-primary">작동 방식</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              AI 비서가 어떻게
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              여러분을 도와드릴까요?
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
            간단하고 직관적인 3단계 프로세스를 통해 치과 진료를 더 쉽고 편리하게 받아보세요.
          </p>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {/* Step 1 */}
            <Card className="relative group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquareIcon className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                  1
                </div>
                <CardTitle className="text-2xl mb-2">AI와 대화하기</CardTitle>
                <CardDescription className="text-base">
                  음성 또는 텍스트로 AI 비서와 치과 관련 질문을 나눠보세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRightIcon className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span>24시간 언제든지 이용 가능</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRightIcon className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span>즉시 응답으로 빠른 답변</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRightIcon className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span>증상, 치료법, 구강 건강 팁 등 다양한 질문</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="relative group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BrainIcon className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                  2
                </div>
                <CardTitle className="text-2xl mb-2">전문가 조언 받기</CardTitle>
                <CardDescription className="text-base">
                  AI가 검증된 정보를 바탕으로 개인 맞춤형 추천을 제공합니다
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRightIcon className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span>수천 건의 치과 사례 기반 분석</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRightIcon className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span>개인 맞춤형 치료 추천</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRightIcon className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span>전문가 수준의 인사이트 제공</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="relative group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CalendarIcon className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                  3
                </div>
                <CardTitle className="text-2xl mb-2">예약 및 후속 관리</CardTitle>
                <CardDescription className="text-base">
                  검증된 치과의사와 예약하고 지속적인 관리를 받으세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRightIcon className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span>검증된 전문 의사와의 예약</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRightIcon className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span>예약 일정 간편 관리</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRightIcon className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span>치료 후 지속적인 후속 관리</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <Card>
              <CardHeader>
                <ClockIcon className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">24/7 이용 가능</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  언제든지 필요할 때 AI 비서에게 질문하고 도움을 받을 수 있습니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldIcon className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">신뢰할 수 있는 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  검증된 의료 데이터와 전문가 지식을 기반으로 정확한 정보를 제공합니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <UserIcon className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">개인 맞춤형 서비스</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  각 사용자의 상황에 맞는 맞춤형 조언과 추천을 제공합니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ZapIcon className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">빠른 응답</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  즉시 응답으로 빠르게 답변을 받아 시간을 절약할 수 있습니다.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">지금 시작해보세요</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              간단한 가입으로 AI 비서의 도움을 받아보세요. 처음 한 달은 무료로 이용하실 수 있습니다.
            </p>
            <div className="flex items-center justify-center gap-4">
              <SignedIn>
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    대시보드로 이동
                    <ArrowRightIcon className="ml-2 size-5" />
                  </Link>
                </Button>
              </SignedIn>
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button size="lg">
                    무료로 시작하기
                    <ArrowRightIcon className="ml-2 size-5" />
                  </Button>
                </SignUpButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

