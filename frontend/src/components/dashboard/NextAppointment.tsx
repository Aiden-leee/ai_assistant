import { getUserAppointments } from "@/lib/actions/appointments/appointments";
import { format, isAfter, isSameDay, parseISO } from "date-fns";
import NoNextAppointment from "./NoNextAppointment";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";


async function NextAppointment() {
    // 사용자 예약 가져오기
    const appointments = await getUserAppointments();

    // 다음 예약 가져오기
    const upcomingAppointments =
        appointments?.filter((appointment: any) => {
            const appointmentDate = parseISO(appointment.date);
            const today = new Date();
            // 예약 날짜가 오늘 이거나 오늘 이후면 다음 예약에 포함
            const isUpcoming = isSameDay(appointmentDate, today) || isAfter(appointmentDate, today);
            return isUpcoming && appointment.status === "CONFIRMED";
        }) || [];

    // 다음 예약 선택
    const nextAppointment = upcomingAppointments[0];
    // 다음 예약이 없으면 null 반환
    if (!nextAppointment) return <NoNextAppointment />;

    // 다음 예약 날짜 포맷팅
    const appointmentDate = parseISO(nextAppointment.date);
    const formattedDate = format(appointmentDate, "EEEE, MMMM d, yyyy");
    // 오늘 날짜 확인
    const isToday = isSameDay(appointmentDate, new Date());
    return (
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="size-5 text-primary" />
                    다음 예약
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* 상태 배지 */}
                <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-primary">
                            {isToday ? "오늘" : "다음"}
                        </span>
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                        {nextAppointment.status}
                    </span>
                </div>

                {/* 예약 상세 */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <UserIcon className="size-4 text-primary" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">{nextAppointment.doctorName}</p>
                            <p className="text-xs text-muted-foreground">{nextAppointment.reason}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <CalendarIcon className="size-4 text-primary" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">{formattedDate}</p>
                            <p className="text-xs text-muted-foreground">
                                {isToday ? "Today" : format(appointmentDate, "EEEE")}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <ClockIcon className="size-4 text-primary" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">{nextAppointment.time}</p>
                            <p className="text-xs text-muted-foreground">현지 시간</p>
                        </div>
                    </div>
                </div>

                {/* 다음 예약 더 많은 예약 개수 표시 */}
                {upcomingAppointments.length > 1 && (
                    <p className="text-xs text-center text-muted-foreground">
                        +{upcomingAppointments.length - 1} 더 많은 예약
                        {upcomingAppointments.length > 2 ? "들" : ""}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}

export default NextAppointment