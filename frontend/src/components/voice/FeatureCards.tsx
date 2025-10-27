import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MicIcon, ShieldIcon, CalendarIcon } from "lucide-react";

function FeatureCards() {
    return (
        <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* how to use card */}
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="relative">
                    <CardTitle className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                            <MicIcon className="h-5 w-5 text-primary" />
                        </div>
                        사용 방법
                    </CardTitle>
                    <CardDescription>음성 지원을 시작하기 위한 간단한 단계</CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-sm">마이크 버튼을 클릭하여 말하기를 시작하세요</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-sm">치과 건강과 치료에 대해 질문하세요</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-sm">AI로부터 즉각적인 음성 응답을 받으세요</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-sm">실시간으로 대화 내용을 확인하세요</span>
                    </div>
                </CardContent>
            </Card>

            {/* features card */}
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="relative">
                    <CardTitle className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                            <ShieldIcon className="h-5 w-5 text-primary" />
                        </div>
                        특징
                    </CardTitle>
                    <CardDescription>치과 진료를 위한 고급 기능</CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-4">
                    <div className="flex items-center p-3 bg-muted/30 rounded-xl">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mr-3">
                            <MicIcon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium text-sm">실시간 음성 인식</span>
                    </div>
                    <div className="flex items-center p-3 bg-muted/30 rounded-xl">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mr-3">
                            <ShieldIcon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium text-sm">AI 기반 대응</span>
                    </div>
                    <div className="flex items-center p-3 bg-muted/30 rounded-xl">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mr-3">
                            <CalendarIcon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium text-sm">대화 내역</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default FeatureCards;