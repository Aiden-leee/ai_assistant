import { CreateDoctor } from '@/lib/actions/doctors/doctors';
import { useCreateDoctor } from '@/hooks/use-doctors';
import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import DoctorFormFields, { DoctorFormState } from './DoctorFormFields';
import { Button } from '../ui/button';
import { formatPhoneNumber } from '@/lib/utils/utils';
import { toast } from 'sonner';

interface AddDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddDoctorDialog({ isOpen, onClose }: AddDoctorDialogProps) {
  const [newDoctor, setNewDoctor] = useState<CreateDoctor>({
    name: "",
    email: "",
    phone: "",
    speciality: "",
    gender: "MALE",
    isActive: true,
  })

  const [emailError, setEmailError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const createDoctorMutation = useCreateDoctor();

  // 폼 값 변경 (전화번호 포맷 포함)
  const handleFormChange = (value: DoctorFormState) => {
    setNewDoctor({
      ...value,
      phone: formatPhoneNumber(value.phone),
    });
  }

  // 의사 추가 핸들러
  const handleSave = () => {
    createDoctorMutation.mutate({ ...newDoctor }, {
      onSuccess: () => handleClose(),
      onError: (error) => {
        const message = error.message ?? "의사 추가 중 오류가 발생했습니다.";
        setEmailError(error.message);
        emailRef.current?.focus();
        toast.error(message);
      }
    });
  }

  // 모달 닫기 핸들러
  const handleClose = () => {    
    // 이메일 입력 포커스 명시적으로 해제
    emailRef.current?.blur();

    setNewDoctor({
      name: "",
      email: "",
      phone: "",
      speciality: "",
      gender: "MALE",
      isActive: true,
    });
    setEmailError(null);
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>의사 추가</DialogTitle>
          <DialogDescription>병원에 새로운 의사를 추가하세요.</DialogDescription>
        </DialogHeader>

        <DoctorFormFields
          value={newDoctor}
          onChange={handleFormChange}
          emailError={emailError}
          emailInputRef={emailRef}
          idPrefix="new"
        />

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>취소</Button>
          <Button
            className='bg-primary hover:bg-primary/90'
            onClick={handleSave}
            disabled={!newDoctor.name || !newDoctor.email || !newDoctor.speciality || createDoctorMutation.isPending}
          >{createDoctorMutation.isPending ? "저장중..." : "추가하기"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddDoctorDialog