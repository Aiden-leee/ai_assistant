'use client'

import { useUser } from '@clerk/nextjs';
import React, { useEffect, useRef, useState } from 'react'
import { Card } from '../ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';
import { vapi } from '@/lib/vapi/vapi';

function VapiWidget() {
    const [callActive, setCallActive] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [messages, setMessage] = useState<any[]>([]);
    const [callEnded, setCallEnded] = useState(false);

    const { user, isLoaded } = useUser();
    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages])

    useEffect(() => {
        // 통화 시작 시 호출
        const handleCallStart = () => {
            console.log("call-start");
            setConnecting(true);
            setCallActive(true);
            setCallEnded(false);
        }

        // 통화 종료 시 호출
        const handleCallEnd = () => {
            console.log("call-end");
            setCallActive(false);
            setConnecting(false);
            setIsSpeaking(false);
            setCallEnded(true);
        }

        // 음성 시작 시 호출
        const handleSpeechStart = () => {
            console.log("speech-start");
            setIsSpeaking(true);
        }

        // 음성 종료 시 호출
        const handleSpeechEnd = () => {
            console.log("speech-end");
            setIsSpeaking(false);
        }

        // 메시지 수신 시 호출
        const handleMessage = (message: any) => {
            console.log("message", message);
            if (message.type === "transcript" && message.transcriptType === "final") {
                const newMessage = {
                    content: message.transcript,
                    role: message.role,
                }
                setMessage(prev => [...prev, newMessage]);
            }
        }

        // 오류 발생 시 호출
        const handleError = (error: Error) => {
            console.log("VAPI error", error);
            setConnecting(false);
            setCallActive(false);
        }

        vapi
            .on("call-start", handleCallStart)
            .on("call-end", handleCallEnd)
            .on("speech-start", handleSpeechStart)
            .on("speech-end", handleSpeechEnd)
            .on("message", handleMessage)
            .on("error", handleError);


        // 컴포넌트 언마운트 시 호출
        return () => {
            vapi.off("call-start", handleCallStart)
            vapi.off("call-end", handleCallEnd)
            vapi.off("speech-start", handleSpeechStart)
            vapi.off("speech-end", handleSpeechEnd)
            vapi.off("message", handleMessage)
            vapi.off("error", handleError);
        }
    }, []);

    // 통화 시작/종료
    const toggleCall = async () => {
        if (callActive) vapi.stop();
        else {
            try {
                setConnecting(true);
                setMessage([]);
                setCallEnded(false);
                
                // 통화 시작
                await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID);
            } catch (error) {
                console.log("failed to start call", error);
                setConnecting(false);
            }
        }
    }

    if (!isLoaded) return null;

    return (
        <div className="max-w-5xl mx-auto px-4 flex flex-col overflow-hidden pb-20">
            {/* TITLE */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold font-mono">
                    <span>AI 비서와 </span>
                    <span className="text-primary uppercase">대화하세요</span>
                </h1>
                <p className="text-muted-foreground mt-2">
                    AI 비서와 음성 대화를 통해 치과 관련 조언과 안내를 받으세요.
                </p>
            </div>

            {/* video 콜 */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* AI 카드 */}
                <Card className='bg-card/90 backdrop-blur-sm border border-border overflow-hidden relative'>
                    <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
                        {/* AI voice 애니메이션 */}
                        <div className={`
                            absolute inset-0 ${isSpeaking ? "opacity-30" : "opacity-0"
                            } transition-opacity duration-300`}
                        >
                            {/* 말하고 있을때 */}
                            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-20">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`mx-1 h-16 w-1 bg-primary rounded-full ${isSpeaking ? "animate-sound-wave" : ""
                                            }`}
                                        style={{
                                            animationDelay: `${i * 0.1}s`,
                                            height: isSpeaking ? `${Math.random() * 50 + 20}%` : "5%",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* AI 로고 */}
                        <div className="relative size-32 mb-4">
                            <div
                                className={`absolute inset-0 bg-primary opacity-10 rounded-full blur-lg ${isSpeaking ? "animate-pulse" : ""
                                    }`}
                            />

                            <div className="relative w-full h-full rounded-full bg-card flex items-center justify-center border border-border overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/5"></div>
                                <Image
                                    src="/logo.png"
                                    alt="AI Dental Assistant"
                                    width={80}
                                    height={80}
                                    className="w-20 h-20 object-contain"
                                />
                            </div>
                        </div>


                        <h2 className="text-xl font-bold text-foreground">DentWise AI</h2>
                        <p className="text-sm text-muted-foreground mt-1">Dental Assistant</p>

                        {/* 말하기 상태 표시 */}
                        <div
                            className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border ${isSpeaking ? "border-primary" : ""
                                }`}
                        >
                            <div
                                className={`w-2 h-2 rounded-full ${isSpeaking ? "bg-primary animate-pulse" : "bg-muted"
                                    }`}
                            />

                            <span className="text-xs text-muted-foreground">
                                {isSpeaking
                                    ? "Speaking..."
                                    : callActive
                                        ? "Listening..."
                                        : callEnded
                                            ? "Call ended"
                                            : "Waiting..."}
                            </span>
                        </div>

                    </div>
                </Card>

                {/* 사용자 카드 */}
                <Card className={`bg-card/90 backdrop-blur-sm border overflow-hidden relative`}>
                    <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
                        {/* 사용자 Image */}
                        <div className="relative size-32 mb-4">
                            <Image
                                src={user?.imageUrl!}
                                alt="User"
                                width={128}
                                height={128}
                                className="size-full object-cover rounded-full"
                            />
                        </div>

                        <h2 className="text-xl font-bold text-foreground">You</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {user ? (user.firstName + " " + (user.lastName || "")).trim() : "Guest"}
                        </p>

                        {/* 사용자 Ready 상태 표시 */}
                        <div className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border`}>
                            <div className={`w-2 h-2 rounded-full bg-muted`} />
                            <span className="text-xs text-muted-foreground">준비</span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* 메시지 컨테이너 */}
            {messages.length > 0 && (
                <div
                    ref={messageContainerRef}
                    className="w-full bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 mb-8 h-64 overflow-y-auto transition-all duration-300 scroll-smooth"
                >
                    <div className="space-y-3">
                        {messages.map((msg, index) => (
                            <div key={index} className="message-item animate-in fade-in duration-300">
                                <div className="font-semibold text-xs text-muted-foreground mb-1">
                                    {msg.role === "assistant" ? "DentWise AI" : "You"}:
                                </div>
                                <p className="text-foreground">{msg.content}</p>
                            </div>
                        ))}

                        {callEnded && (
                            <div className="message-item animate-in fade-in duration-300">
                                <div className="font-semibold text-xs text-primary mb-1">System:</div>
                                <p className="text-foreground">Call ended. Thank you for using DentWise AI!</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 통화 제어 */}
            <div className="w-full flex justify-center gap-4">
                <Button
                    className={`w-44 text-xl rounded-3xl ${callActive
                        ? "bg-destructive hover:bg-destructive/90"
                        : callEnded
                            ? "bg-red-500 hover:bg-red-700"
                            : "bg-primary hover:bg-primary/90"
                        } text-white relative`}
                    onClick={toggleCall}
                    disabled={connecting || callEnded}
                >
                    {connecting && (
                        <span className="absolute inset-0 rounded-full animate-ping bg-primary/50 opacity-75"></span>
                    )}

                    <span>
                        {callActive
                            ? "End Call"
                            : connecting
                                ? "Connecting..."
                                : callEnded
                                    ? "Call Ended"
                                    : "Start Call"}
                    </span>
                </Button>
            </div>
        </div>
    )
}

export default VapiWidget