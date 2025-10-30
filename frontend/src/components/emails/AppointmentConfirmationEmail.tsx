import { Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from "@react-email/components";

interface AppointmentConfirmationEmailProps {
    doctorName: string;
    appointmentDate: string;
    appointmentTime: string;
    appointmentType: string;
    duration: string;
    price: string;
}

const AppointmentConfirmationEmail = ({
    doctorName,
    appointmentDate,
    appointmentTime,
    appointmentType,
    duration,
    price
}: AppointmentConfirmationEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>예약이 성공적으로 완료되었습니다!</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={logoContainer}>
                        <Img
                            src="https://i.ibb.co.com/tRy6cC2/logo.png"
                            width="50"
                            height="50"
                            alt="KO Dentist"
                            style={logo}
                        />
                        <Text style={logoText}>KO Dentist</Text>
                    </Section>

                    <Heading style={h1}>예약이 성공적으로 완료되었습니다! 🦷</Heading>

                    <Text style={text}>안녕하세요,</Text>

                    <Text style={text}>
                        예약이 성공적으로 완료되었습니다. <br/>
                        예약 상세 정보는 다음과 같습니다:
                    </Text>

                    <Section style={appointmentDetails}>
                        <Text style={detailLabel}>의사</Text>
                        <Text style={detailValue}>{doctorName}</Text>

                        <Text style={detailLabel}>예약 유형</Text>
                        <Text style={detailValue}>{appointmentType}</Text>

                        <Text style={detailLabel}>날짜</Text>
                        <Text style={detailValue}>{appointmentDate}</Text>

                        <Text style={detailLabel}>시간</Text>
                        <Text style={detailValue}>{appointmentTime}</Text>

                        <Text style={detailLabel}>진료 시간</Text>
                        <Text style={detailValue}>{duration}</Text>

                        <Text style={detailLabel}>비용</Text>
                        <Text style={detailValue}>{price}</Text>

                        <Text style={detailLabel}>위치</Text>
                        <Text style={detailValue}>치과 센터</Text>
                    </Section>

                    <Text style={text}>
                        예약 시간 15분 전에 도착해주세요. <br />
                        예약 변경 또는 취소는 최소 24시간 전에 문의해주세요.
                    </Text>

                    <Section style={buttonContainer}>
                        <Link style={button} href={process.env.NEXT_PUBLIC_APP_URL_CLIENT + "/appointments"}>
                            예약 확인
                        </Link>
                    </Section>

                    <Text style={footer}>
                        감사합니다.
                        <br />
                        KO Dentist Team
                    </Text>

                    <Text style={footerText}>
                        문의사항이 있으시면 support@kodentist.com으로 연락주세요.
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}

export default AppointmentConfirmationEmail


// styles
const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    maxWidth: "560px",
};

const logoContainer = {
    textAlign: "center" as const,
    marginBottom: "32px",
};

const logo = {
    borderRadius: "8px",
    display: "inline",
    verticalAlign: "middle",
};

const logoText = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2563eb",
    margin: "0",
    display: "inline",
    marginLeft: "12px",
};

const h1 = {
    color: "#1f2937",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center" as const,
    margin: "30px 0",
};

const text = {
    color: "#374151",
    fontSize: "16px",
    lineHeight: "26px",
    margin: "16px 0",
};

const appointmentDetails = {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "24px",
    margin: "24px 0",
};

const detailLabel = {
    color: "#6b7280",
    fontSize: "14px",
    fontWeight: "500",
    margin: "8px 0 4px 0",
};

const detailValue = {
    color: "#1f2937",
    fontSize: "16px",
    fontWeight: "600",
    margin: "0 0 16px 0",
};

const buttonContainer = {
    textAlign: "center" as const,
    margin: "32px 0",
};

const button = {
    backgroundColor: "#2563eb",
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "inline-block",
    padding: "12px 24px",
};

const footer = {
    color: "#374151",
    fontSize: "16px",
    lineHeight: "26px",
    margin: "32px 0 16px 0",
};

const footerText = {
    color: "#6b7280",
    fontSize: "14px",
    lineHeight: "24px",
    margin: "16px 0 0 0",
    textAlign: "center" as const,
};