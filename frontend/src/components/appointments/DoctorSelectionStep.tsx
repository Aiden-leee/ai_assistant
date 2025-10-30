import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { MapPinIcon, PhoneIcon, StarIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useAvailableDoctors } from "@/hooks/use-doctors";
import { DoctorCardsLoading } from "./DoctorCardsLoading";


interface DoctorSelectionStepProps {
    selectedDentistId: string | null;
    onSelectDentist: (dentistId: string) => void;
    onContinue: () => void;
}

function DoctorSelectionStep({
    onContinue,
    onSelectDentist,
    selectedDentistId,
}: DoctorSelectionStepProps) {
    const { data: doctors = [], isLoading } = useAvailableDoctors();
    console.log("doctors--테스트----", doctors);
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">치과의사를 선택하세요</h2>

            {isLoading ? (
                <DoctorCardsLoading />
            ) : (
                <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {doctors.map((doctor: any) => (
                            <Card
                                key={doctor.id}
                                className={`cursor-pointer transition-all hover:shadow-lg ${selectedDentistId === doctor.id ? "ring-2 ring-primary" : ""
                                    }`}
                                onClick={() => onSelectDentist(doctor.id)}
                            >
                                <CardHeader className="pb-4">
                                    <div className="flex items-start gap-4">
                                        <Image
                                            src={doctor.imageUrl!}
                                            alt={doctor.name}
                                            width={64}
                                            height={64}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <CardTitle className="text-lg">{doctor.name}</CardTitle>
                                            <CardDescription className="text-primary font-medium">
                                                {doctor.speciality || "General Dentistry"}
                                            </CardDescription>
                                            <div className="flex items-center gap-2 mt-2">
                                                <div className="flex items-center gap-1">
                                                    <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                                                    <span className="text-sm font-medium">5</span>
                                                </div>
                                                <span className="text-sm text-muted-foreground">
                                                    ({doctor.appointmentCount} 예약)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPinIcon className="w-4 h-4" />
                                        <span>한국치과</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <PhoneIcon className="w-4 h-4" />
                                        <span>{doctor.phone}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {doctor.bio || "숙련된 의료 전문가가 고품질의 치료를 제공합니다."}
                                    </p>
                                    <Badge variant="secondary">전문의</Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {selectedDentistId && (
                        <div className="flex justify-end">
                            <Button onClick={onContinue}>날짜 및 시간 선택</Button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default DoctorSelectionStep