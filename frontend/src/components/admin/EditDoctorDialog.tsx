import { Doctor } from '@/app/admin/AdminDashboard.client';
import { useUpdateDoctor } from '@/hooks/use-doctors';
import { formatPhoneNumber } from '@/lib/utils/utils';
import DoctorFormFields, { DoctorFormState } from './DoctorFormFields';
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';

interface EditDoctorDialogProps {
    isOpen: boolean;
    onClose: () => void;
    doctor: Doctor | null;
}

function EditDoctorDialog({ isOpen, onClose, doctor }: EditDoctorDialogProps) {
    const [editedDoctor, setEditedDoctor] = useState<Doctor | null>(doctor);

    console.log("editedDoctor", editedDoctor);
    const updateDoctorMutation = useUpdateDoctor();

    // 폼 값 변경 (전화번호 포맷 포함)
    const handleFormChange = (value: DoctorFormState) => {
        if (!editedDoctor) return;
        setEditedDoctor({
            ...editedDoctor,
            ...value,
            phone: formatPhoneNumber(value.phone),
        });
    }

    const handleSave = () => {
        if (editedDoctor) {
            updateDoctorMutation.mutate({ ...editedDoctor }, {
                onSuccess: () => handleClose(),
            });
        }
    }

    const handleClose = () => {
        onClose();
        setEditedDoctor(null);
    }
    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className='sm:max-w-[500px]'>
                <DialogHeader>
                    <DialogTitle>의사 정보 수정</DialogTitle>
                    <DialogDescription>의사 정보를 수정하세요.</DialogDescription>
                </DialogHeader>

                {editedDoctor && (
                    <DoctorFormFields
                        value={editedDoctor}
                        onChange={handleFormChange}
                        idPrefix="edit"
                    />
                )}

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>취소</Button>
                    <Button
                        className='bg-primary hover:bg-primary/90'
                        onClick={handleSave}
                        disabled={!editedDoctor || updateDoctorMutation.isPending}
                    >{updateDoctorMutation.isPending ? "저장중..." : "저장하기"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default EditDoctorDialog