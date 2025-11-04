'use client'

import React, { useState } from 'react'
import { Header, Footer } from '@/components/landing'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MailIcon, PhoneIcon, MessageSquareIcon, SendIcon, CheckCircleIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('필수 항목을 모두 입력해주세요.')
      return
    }

    setIsSubmitting(true)
    
    // 실제로는 여기서 API 호출을 할 수 있습니다
    // 예시: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
    
    setTimeout(() => {
      toast.success('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full border border-primary/10 backdrop-blur-sm mb-6">
            <MessageSquareIcon className="size-4 text-primary" />
            <span className="text-sm font-medium text-primary">문의하기</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              궁금한 점이 있으신가요?
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            서비스에 대한 문의사항이나 제안사항이 있으시면 언제든지 연락주세요.<br />
            친절하게 답변드리겠습니다.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl mb-2">문의 양식</CardTitle>
                <CardDescription>
                  아래 양식을 작성해주시면 빠른 시일 내에 답변드리겠습니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      이름 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      이메일 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">제목</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="문의 제목을 입력해주세요"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      메시지 <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="문의 내용을 자세히 입력해주세요"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>전송 중...</>
                    ) : (
                      <>
                        전송하기
                        <SendIcon className="ml-2 size-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">연락처 정보</CardTitle>
                  <CardDescription>
                    아래 연락처로도 문의하실 수 있습니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center shrink-0">
                      <MailIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">이메일</h3>
                      <p className="text-muted-foreground">support@aiassistant.com</p>
                      <p className="text-sm text-muted-foreground mt-1">평일 09:00 - 18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center shrink-0">
                      <PhoneIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">전화</h3>
                      <p className="text-muted-foreground">02-1234-5678</p>
                      <p className="text-sm text-muted-foreground mt-1">평일 09:00 - 18:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl mb-2">자주 묻는 질문</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-1">답변 시간은 얼마나 걸리나요?</h3>
                    <p className="text-sm text-muted-foreground">
                      일반적으로 24시간 이내에 답변드리며, 주말이나 공휴일에는 다소 지연될 수 있습니다.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">서비스 이용 방법이 궁금해요</h3>
                    <p className="text-sm text-muted-foreground">
                      <a href="/how-it-works" className="text-primary hover:underline">
                        작동 방식 페이지
                      </a>에서 자세한 내용을 확인하실 수 있습니다.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">비용이 얼마인가요?</h3>
                    <p className="text-sm text-muted-foreground">
                      <a href="/pro" className="text-primary hover:underline">
                        가격 페이지
                      </a>에서 요금제를 확인하실 수 있습니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

