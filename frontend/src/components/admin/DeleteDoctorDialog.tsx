import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Doctor } from '@/app/admin/AdminDashboard.client';
import { useDeleteDoctor } from '@/hooks/use-doctors';

interface DeleteDoctorDialogProps {
    isOpen: boolean;
    onClose: () => void;
    doctor: Doctor | null;
}

function DeleteDoctorDialog({ isOpen, onClose, doctor }: DeleteDoctorDialogProps) {
    const deleteDoctorMutation = useDeleteDoctor();

    const handleDelete = () => {
        if (doctor) {
            deleteDoctorMutation.mutate(doctor.id, {
                onSuccess: () => handleClose(),
            });
        }
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className='sm:max-w-[500px]'>
                <DialogHeader>
                    <DialogTitle>의사 삭제</DialogTitle>
                    <DialogDescription>의사를 삭제하시겠습니까?</DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>취소</Button>
                    <Button
                        className='bg-primary hover:bg-primary/90'
                        onClick={handleDelete}
                        disabled={!doctor || deleteDoctorMutation.isPending}
                    >{deleteDoctorMutation.isPending ? "삭제중..." : "삭제하기"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default DeleteDoctorDialog