'use server';

import { apiBase } from "@/lib/constants";
import { render } from "@react-email/render";
import AppointmentConfirmationEmail from "@/components/emails/AppointmentConfirmationEmail";

interface MailData {
    userEmail: string;
    doctorName: string;
    appointmentDate: string;
    appointmentTime: string;
    appointmentType: string;
    duration: string;
    price: string;
}

export async function postSendEmail(mailData: MailData) {
    try {
        // 이메일 제목 생성
        const subject = `KO Dentist Appointment Confirmed • ${mailData.appointmentDate} ${mailData.appointmentTime}`;

        // 이메일 내용 생성
        const html = await render(
            AppointmentConfirmationEmail({
                doctorName: mailData.doctorName,
                appointmentDate: mailData.appointmentDate,
                appointmentTime: mailData.appointmentTime,
                appointmentType: mailData.appointmentType,
                duration: mailData.duration,
                price: mailData.price,
            })
        );

        // 이메일 전송
        const resp = await fetch(`${apiBase}/api/mailer/send-email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: mailData.userEmail,
                subject,
                html,
            }),
        });
        const data = await resp.json();
        if (!data.success) throw new Error(data.message);
    } catch (error) {
        console.error("Error postSendEmail:", error);
        throw error;
    }
}