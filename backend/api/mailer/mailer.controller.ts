import { NextFunction, Request, Response } from "express";
import { sendMail, transporter } from "./mailer";

// 이메일 전송
export const postEmailController = async (req: Request, res: Response, next: NextFunction) => {
    const { email, subject, html } = req.body;

    try {
        const info = await sendMail(email, subject, html);

        res.status(200).json({
            success: true,
            data: info,
            message: '이메일이 성공적으로 전송되었습니다.',
        });
    } catch (error) {
        next(error);
    }
}