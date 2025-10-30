import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, MailIcon, CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AppointmentConfirmationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    appointmentDetails: {
        doctorName: string;
        appointmentDate: string;
        appointmentTime: string;
        userEmail: string;
    };
}

export function AppointmentConfirmationModal({
    open,
    onOpenChange,
    appointmentDetails,
}: AppointmentConfirmationModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-center space-y-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <CheckCircleIcon className="h-8 w-8 text-primary" />
                    </div>

                    <DialogTitle className="text-xl font-semibold text-center">
                        예약 완료!
                    </DialogTitle>

                    <DialogDescription className="text-center text-muted-foreground">
                        예약이 성공적으로 완료되었습니다.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Email Notification Section */}
                    <div className="flex flex-col items-center space-y-3">
                        <div className="relative">
                            <Image
                                src="/email-sent.png"
                                alt="Email sent"
                                width={120}
                                height={120}
                                className="mx-auto"
                            />
                        </div>

                        <div className="text-center space-y-1">
                            <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
                                <MailIcon className="h-4 w-4" />
                                예약 상세 정보가 이메일로 전송되었습니다.
                            </div>
                            {appointmentDetails?.userEmail && (
                                <p className="text-xs text-muted-foreground">{appointmentDetails.userEmail}</p>
                            )}
                        </div>
                    </div>

                    {/* Appointment Summary */}
                    {appointmentDetails && (
                        <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                            <h4 className="font-medium text-sm text-center mb-3">예약 상세 정보</h4>

                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-sm">
                                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">{appointmentDetails.doctorName}</span>
                                </div>

                                <div className="flex items-center gap-3 text-sm">
                                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>{appointmentDetails.appointmentDate}</span>
                                </div>

                                <div className="flex items-center gap-3 text-sm">
                                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>{appointmentDetails.appointmentTime}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                        <Link href="/appointments" className="w-full">
                            <Button className="w-full" onClick={() => onOpenChange(false)}>
                                예약 확인
                            </Button>
                        </Link>

                        <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
                            닫기
                        </Button>
                    </div>

                    {/* Additional Info */}
                    <div className="text-center text-xs text-muted-foreground border-t pt-4">
                        <p>
                            예약 시간 15분 전에 도착해주세요.
                            <br />
                            예약 변경 또는 취소는 최소 24시간 전에 문의해주세요.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}