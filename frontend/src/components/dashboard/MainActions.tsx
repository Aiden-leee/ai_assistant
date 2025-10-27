import React from 'react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { CalendarIcon, MessageSquareIcon } from 'lucide-react'

function MainActions() {
    return (
        <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* AI Voice Assistant */}
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="relative p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Image src="/audio.png" alt="Voice AI" width={32} height={32} className="w-10" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2">AI 음성 비서</h3>
                            <p className="text-muted-foreground">음성 통화로 즉각적인 치과 상담을 받으세요</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">24시간 연중무휴 이용 가능</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">전문적인 치과 지도</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">즉각적인 통증 완화 조언</span>
                        </div>
                    </div>

                    <Link
                        href="/voice"
                        className={buttonVariants({
                            variant: "default",
                            className:
                                "w-full mt-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300",
                        })}
                    >
                        <MessageSquareIcon className="mr-2 h-5 w-5" />
                        음성 통화 시작
                    </Link>
                </CardContent>
            </Card>

            {/* Book Appointment */}
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="relative p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Image src="/calendar.png" alt="Calendar" width={32} height={32} className="w-10" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2">예약하기</h3>
                            <p className="text-muted-foreground">귀하 지역의 검증된 치과의사와 일정을 잡으세요</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">검증된 치과 전문가</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">유연한 일정 조정</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">즉시 확인</span>
                        </div>
                    </div>

                    <Link href="/appointments">
                        <Button
                            variant="outline"
                            className="w-full mt-6 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 font-semibold py-3 rounded-xl transition-all duration-300"
                        >
                            <CalendarIcon className="mr-2 h-5 w-5" />
                            지금 예약하기
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}

export default MainActions