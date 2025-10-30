import { Doctor } from '@/app/admin/AdminDashboard.client';
import { useGetDoctors } from '@/hooks/use-doctors';
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { EditIcon, MailIcon, PhoneIcon, PlusIcon, StethoscopeIcon, TrashIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import AddDoctorDialog from './AddDoctorDialog';
import EditDoctorDialog from './EditDoctorDialog';
import DeleteDoctorDialog from './DeleteDoctorDialog';

function DoctorsManagement() {
    const { data: doctors = [] } = useGetDoctors();

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // 의사 수정 핸들러
    const handleEditDoctor = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
        setIsEditDialogOpen(true);
    }

    // 의사 수정 모달 닫기 핸들러
    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
        setSelectedDoctor(null);
    }

    // 의사 삭제 핸들러
    const handleDeleteDoctor = (doctor: Doctor) => {
        console.log(doctor);
        setSelectedDoctor(doctor);
        setIsDeleteDialogOpen(true);
    }

    // 의사 삭제 모달 닫기 핸들러
    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedDoctor(null);
    }

    return (
        <>
            <Card className='mb-12'>
                <CardHeader className='flex items-center justify-between'>
                    <div>
                        <CardTitle className='flex items-center gap-2'>
                            <StethoscopeIcon className='size-5 text-primary' />
                            <span className='text-lg font-semibold'>의사 관리</span>
                        </CardTitle>
                        <CardDescription>병원의 모든 의사를 관리하고 감독합니다.</CardDescription>
                    </div>

                    <Button
                        onClick={() => setIsAddDialogOpen(true)}
                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/100">
                        <PlusIcon className='mr-2 size-4' />
                        의사 추가
                    </Button>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        {doctors.map((doctor: Doctor) => (
                            <div key={doctor.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50">
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={doctor.imageUrl}
                                        alt={doctor.name}
                                        width={48}
                                        height={48}
                                        unoptimized
                                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/logo.png'; }}
                                        className="size-12 rounded-full object-cover ring-2 ring-background"
                                    />

                                    <div>
                                        <div className="font-semibold">{doctor.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {doctor.speciality}
                                            <span className='ml-2 px-2 py-0.5 bg-muted rounded text-xs'>
                                                {doctor.gender === 'MALE' ? '남' : '여'}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4 mt-1">
                                            <div className="flex items-center gap-1 text-x text-muted-foreground">
                                                <MailIcon className="h-3 w-3" />
                                                {doctor.email}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <PhoneIcon className="h-3 w-3" />
                                                {doctor.phone}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 예약 수 표시 */}
                                <div className="flex items-center gap-3">
                                    <div className="text-center">
                                        <div className="font-semibold text-primary">{doctor.appointmentCount}</div>
                                        <div className="text-xs text-muted-foreground">예약</div>
                                    </div>

                                    {doctor.isActive ? (
                                        <Badge className='bg-green-100 text-green-800 hover:bg-green-100'>활동중</Badge>
                                    ) : (
                                        <Badge variant={'secondary'}>비활동</Badge>
                                    )}
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 px-3"
                                        onClick={() => handleEditDoctor(doctor)}
                                    >
                                        <EditIcon className="size-4 mr-1" />
                                        수정
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 px-3"
                                        onClick={() => handleDeleteDoctor(doctor)}
                                    >
                                        <TrashIcon className="size-4 mr-1" />
                                        삭제
                                    </Button>
                                </div>

                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            
            {/* 의사 추가 모달 */}
            <AddDoctorDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} />

            {/* 의사 수정 모달 */}
            <EditDoctorDialog 
                key={`edit-${selectedDoctor?.id}`}
                isOpen={isEditDialogOpen}
                onClose={handleCloseEditDialog}
                doctor={selectedDoctor} 
            />

            {/* 의사 삭제 모달 */}
            <DeleteDoctorDialog 
                key={`delete-${selectedDoctor?.id}`}
                isOpen={isDeleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                doctor={selectedDoctor}
            />
        </>
    )
}

export default DoctorsManagement