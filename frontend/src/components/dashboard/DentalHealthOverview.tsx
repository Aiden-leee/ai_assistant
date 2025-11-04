import { getUserAppointmentStats } from "@/lib/actions/appointments/appointments";
import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { BrainIcon, MessageSquareIcon } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";
import { ko } from "date-fns/locale";


async function DentalHealthOverview() {
    const appointmentStats = await getUserAppointmentStats();
    const user = await currentUser();

    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BrainIcon className="size-5 text-primary" />
                    귀하의 치과 건강
                </CardTitle>
                <CardDescription>치과 치료 과정을 추적하세요</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-muted/30 rounded-xl">
                        <div className="text-2xl font-bold text-primary mb-1">
                            {appointmentStats.completedAppointments}
                        </div>
                        <div className="text-sm text-muted-foreground">완료된 방문</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-xl">
                        <div className="text-2xl font-bold text-primary mb-1">
                            {appointmentStats.totalAppointments}
                        </div>
                        <div className="text-sm text-muted-foreground">총 예약</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-xl">
                        <div className="text-2xl font-bold text-primary mb-1">
                            {format(new Date(user?.createdAt!), "M월 yyyy년", { locale: ko })}
                        </div>
                        <div className="text-sm text-muted-foreground">가입 시기</div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-start gap-3">
                        <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                            <MessageSquareIcon className="size-5 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-primary mb-1">Ready to get started?</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                                첫 번째 예약을 하거나 AI 음성 비서를 이용해 치과 진료에 대한 즉각적인 조언을 받아보세요.
                            </p>
                            <div className="flex gap-2">
                                <Link href="/voice">
                                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                                        AI Assistant를 사용해 보세요
                                    </Button>
                                </Link>
                                <Link href="/appointments">
                                    <Button size="sm" variant="outline">
                                        예약하기
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default DentalHealthOverview;