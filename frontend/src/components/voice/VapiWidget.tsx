"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { vapi } from "@/lib/vapi/vapi";
import {
  getMonthlyCallCount,
  createVoiceCall,
  type VoiceTranscriptMessage,
} from "@/lib/actions/voice/voice";
import { toast } from "sonner";
import { apiBase } from "@/lib/constants";

function VapiWidget() {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessage] = useState<VoiceTranscriptMessage[]>([]);
  const [callEnded, setCallEnded] = useState(false);
  const [callStartTime, setCallStartTime] = useState<Date | null>(null);
  const [monthlyCallCount, setMonthlyCallCount] = useState<number>(0);
  const [isLoadingUsage, setIsLoadingUsage] = useState(false);
  const [userPlan, setUserPlan] = useState<"ai_basic" | "ai_pro" | null>(null);

  const { user, isLoaded } = useUser();
  const { has } = useAuth();
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const hasSavedRef = useRef(false);

  // 사용량 조회 및 플랜 확인
  useEffect(() => {
    const checkUsageAndPlan = async () => {
      if (!user?.id || !has) return;

      setIsLoadingUsage(true);
      try {
        // 플랜 확인
        const hasProPlan = has({ plan: "ai_pro" });
        const hasBasicPlan = has({ plan: "ai_basic" });

        if (hasProPlan) {
          setUserPlan("ai_pro");
        } else if (hasBasicPlan) {
          setUserPlan("ai_basic");
        } else {
          setUserPlan(null);
        }

        // 월별 통화 횟수 조회
        const usageData = await getMonthlyCallCount(user.id);
        setMonthlyCallCount(usageData.count);
      } catch (error) {
        console.error("Error checking usage:", error);
      } finally {
        setIsLoadingUsage(false);
      }
    };

    if (isLoaded && user && has) {
      checkUsageAndPlan();
    }
  }, [user, isLoaded, has]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // 통화 기록 저장 함수 (재사용 가능하도록 분리)
  const saveCallRecord = useCallback(
    async (status: "COMPLETED" | "FAILED" = "COMPLETED") => {
      if (!user?.id || !callStartTime) return false;

      try {
        const endTime = new Date();
        const duration = Math.floor(
          (endTime.getTime() - callStartTime.getTime()) / 1000
        ); // 초 단위

        // 통화 기록 저장
        await createVoiceCall(user.id, duration, status, messages);

        // 사용량 갱신
        const usageData = await getMonthlyCallCount(user.id);
        setMonthlyCallCount(usageData.count);

        if (status === "COMPLETED") {
          toast.success("통화가 기록되었습니다.");
        }

        return true;
      } catch (error) {
        console.error("Error saving call record:", error);
        if (status === "COMPLETED") {
          toast.error("통화 기록 저장에 실패했습니다.");
        }
        return false;
      }
    },
    [user?.id, callStartTime]
  );

  // 중복 저장 방지용 래퍼
  const saveCallRecordOnce = useCallback(
    async (status: "COMPLETED" | "FAILED" = "COMPLETED") => {
      if (hasSavedRef.current) return false;
      hasSavedRef.current = true;
      try {
        const ok = await saveCallRecord(status);
        return ok;
      } catch (e) {
        // 실패 시 다시 저장 기회를 주기 위해 플래그 복구
        hasSavedRef.current = false;
        throw e;
      }
    },
    [saveCallRecord]
  );

  useEffect(() => {
    // 통화 시작 시 호출
    const handleCallStart = () => {
      console.log("call-start");
      hasSavedRef.current = false;
      setCallStartTime(new Date());
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };

    // 통화 종료 시 호출
    const handleCallEnd = async (data?: any) => {
      console.log("call-end", data);
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);

      // 통화 기록 저장
      await saveCallRecordOnce("COMPLETED");
      setCallStartTime(null);
    };

    // 음성 시작 시 호출
    const handleSpeechStart = () => {
      console.log("speech-start");
      setIsSpeaking(true);
    };

    // 음성 종료 시 호출
    const handleSpeechEnd = () => {
      console.log("speech-end");
      setIsSpeaking(false);
    };

    // 메시지 수신 시 호출
    const handleMessage = (message: any) => {
      console.log("message", message);
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage: VoiceTranscriptMessage = {
          content: message.transcript,
          role: message.role,
          messageTime: new Date().toISOString(),
        };
        setMessage((prev) => [...prev, newMessage]);
      }
    };

    // 오류 발생 시 호출
    const handleError = async (error: Error) => {
      console.error("VAPI error:", error);
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      setConnecting(false);
      setCallActive(false);

      // 통화 시작 후 오류 발생 시 실패 기록
      if (user?.id && callStartTime) {
        await saveCallRecordOnce("FAILED");
      } else if (user?.id && !callStartTime) {
        // 연결 시작 전 또는 연결 중 오류 발생 시에도 실패 기록 저장 (duration 0)
        try {
          if (!hasSavedRef.current) {
            hasSavedRef.current = true;
            await createVoiceCall(user.id, 0, "FAILED", messages);
          }
        } catch (err) {
          console.error(
            "Error saving failed call record (connection failed):",
            err
          );
        }
      }
      setCallStartTime(null);
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    // 컴포넌트 언마운트 시 호출
    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("message", handleMessage);
      vapi.off("error", handleError);
    };
  }, [user, callStartTime]);

  // 페이지 언마운트/새로고침 시 통화 기록 저장
  useEffect(() => {
    // beforeunload: 페이지가 닫히거나 새로고침될 때
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasSavedRef.current && callActive && callStartTime && user?.id) {
        // fetch with keepalive로 저장 시도 (비동기이지만 페이지가 닫히기 전에 전송됨)
        const endTime = new Date();
        const duration = Math.floor(
          (endTime.getTime() - callStartTime.getTime()) / 1000
        );

        // keepalive 옵션으로 API 직접 호출
        fetch(`${apiBase}/api/voice`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clerkId: user.id,
            duration,
            status: "COMPLETED",
            messages,
          }),
          keepalive: true, // 페이지가 닫혀도 요청이 완료될 때까지 대기
        }).catch((err) => console.error("Failed to save call on unload:", err));
        hasSavedRef.current = true;
      }
    };

    // visibilitychange: 페이지가 백그라운드로 갈 때 (탭 전환 등)
    const handleVisibilityChange = async () => {
      if (
        document.hidden &&
        !hasSavedRef.current &&
        callActive &&
        callStartTime &&
        user?.id
      ) {
        // 페이지가 숨겨질 때 통화 기록 저장
        await saveCallRecordOnce("COMPLETED");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      // 컴포넌트 언마운트 시 진행 중인 통화 저장
      if (!hasSavedRef.current && callActive && callStartTime && user?.id) {
        // 비동기 저장 시도 (실패할 수 있음)
        saveCallRecordOnce("COMPLETED").catch((err) =>
          console.error("Failed to save call on unmount:", err)
        );
      }
    };
  }, [callActive, callStartTime, user?.id, saveCallRecord]);

  // 통화 시작/종료
  const toggleCall = async () => {
    // 통화 중일 때 종료
    if (callActive) {
      vapi.stop();
      return;
    }

    // 통화 시작 전 사용량 체크
    if (!user?.id) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    // ai_pro 플랜은 무제한, ai_basic은 10회 제한
    if (userPlan === "ai_basic" && monthlyCallCount >= 10) {
      toast.error(
        "월 10회 제한에 도달했습니다. AI Pro로 업그레이드하시면 무제한 통화가 가능합니다."
      );
      return;
    }

    try {
      setConnecting(true);
      setMessage([]);
      setCallEnded(false);

      // 통화 시작
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID);
    } catch (error: any) {
      console.error("failed to start call", error);
      console.error("Error details:", {
        name: error?.name,
        message: error?.message,
        stack: error?.stack,
        code: error?.code,
        assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID,
      });
      setConnecting(false);

      // 연결 실패 시 실패 기록 저장
      if (user?.id) {
        try {
          await createVoiceCall(user.id, 0, "FAILED");
          // 사용량 갱신
          const usageData = await getMonthlyCallCount(user.id);
          setMonthlyCallCount(usageData.count);
        } catch (err) {
          console.error("Error saving failed call record:", err);
        }
      }

      toast.error("통화 시작에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  if (!isLoaded) return null;

  // 사용량 표시
  const callLimitDisplay =
    userPlan === "ai_basic" ? (
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">
          이번 달 사용량:{" "}
          <span className="font-semibold text-foreground">
            {monthlyCallCount}/10
          </span>
        </p>
      </div>
    ) : userPlan === "ai_pro" ? (
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">
          이번 달 사용량:{" "}
          <span className="font-semibold text-foreground">
            {monthlyCallCount}
          </span>{" "}
          (무제한)
        </p>
      </div>
    ) : null;

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

      {/* 사용량 표시 */}
      {callLimitDisplay}

      {/* video 콜 */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* AI 카드 */}
        <Card className="bg-card/90 backdrop-blur-sm border border-border overflow-hidden relative">
          <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
            {/* AI voice 애니메이션 */}
            <div
              className={`
                            absolute inset-0 ${
                              isSpeaking ? "opacity-30" : "opacity-0"
                            } transition-opacity duration-300`}
            >
              {/* 말하고 있을때 */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-20">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`mx-1 h-16 w-1 bg-primary rounded-full ${
                      isSpeaking ? "animate-sound-wave" : ""
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
                className={`absolute inset-0 bg-primary opacity-10 rounded-full blur-lg ${
                  isSpeaking ? "animate-pulse" : ""
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

            <h2 className="text-xl font-bold text-foreground">Hospital AI</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Hospital Assistant
            </p>

            {/* 말하기 상태 표시 */}
            <div
              className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border ${
                isSpeaking ? "border-primary" : ""
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isSpeaking ? "bg-primary animate-pulse" : "bg-muted"
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
        <Card
          className={`bg-card/90 backdrop-blur-sm border overflow-hidden relative`}
        >
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
              {user
                ? (user.firstName + " " + (user.lastName || "")).trim()
                : "Guest"}
            </p>

            {/* 사용자 Ready 상태 표시 */}
            <div
              className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border`}
            >
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
              <div
                key={index}
                className="message-item animate-in fade-in duration-300"
              >
                <div className="font-semibold text-xs text-muted-foreground mb-1">
                  {msg.role === "assistant" ? "Hospital AI" : "You"}:
                </div>
                <p className="text-foreground">{msg.content}</p>
              </div>
            ))}

            {callEnded && (
              <div className="message-item animate-in fade-in duration-300">
                <div className="font-semibold text-xs text-primary mb-1">
                  System:
                </div>
                <p className="text-foreground">
                  통화가 종료되었습니다. Hospital AI를 이용해주셔서 감사합니다!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 통화 제어 */}
      <div className="w-full flex justify-center gap-4">
        <Button
          className={`w-44 text-xl rounded-3xl ${
            callActive
              ? "bg-destructive hover:bg-destructive/90"
              : callEnded
                ? "bg-red-500 hover:bg-red-700"
                : "bg-primary hover:bg-primary/90"
          } text-white relative`}
          onClick={toggleCall}
          disabled={
            connecting ||
            callEnded ||
            (userPlan === "ai_basic" && monthlyCallCount >= 10)
          }
        >
          {connecting && (
            <span className="absolute inset-0 rounded-full animate-ping bg-primary/50 opacity-75"></span>
          )}

          <span>
            {callActive
              ? "통화 종료"
              : connecting
                ? "연결 중..."
                : callEnded
                  ? "통화 종료"
                  : userPlan === "ai_basic" && monthlyCallCount >= 10
                    ? "제한 도달"
                    : "통화 시작"}
          </span>
        </Button>
      </div>
    </div>
  );
}

export default VapiWidget;
