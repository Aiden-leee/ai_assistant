import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail', // 이메일 서비스 (gmail, naver, daum, etc.)
  auth: {
    user: process.env.EMAIL_USER, // 이메일 주소
    pass: process.env.EMAIL_PASS, // 이메일 비밀번호
  },
});

// 이메일 전송 함수
export const sendMail = async (to: string, subject: string, html: string) => {
  try {

    const info = await transporter.sendMail({
      from: `"AI Assistant" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📨 Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Email send failed:", err);
    throw err;
  }
};