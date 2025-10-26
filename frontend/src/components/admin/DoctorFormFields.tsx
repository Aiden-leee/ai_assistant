'use client';

import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export type DoctorFormState = {
  name: string;
  email: string;
  phone: string;
  speciality: string;
  gender: 'MALE' | 'FEMALE';
  isActive: boolean;
};

interface DoctorFormFieldsProps {
  value: DoctorFormState;
  onChange: (value: DoctorFormState) => void;
  // 에러 표시/접근성용 옵션 (예: 이메일 에러 텍스트)
  emailError?: string | null;
  emailInputRef?: React.RefObject<HTMLInputElement | null> | React.MutableRefObject<HTMLInputElement | null>;
  // 플레이스홀더/레이블 차이가 필요할 경우를 대비한 prefix
  idPrefix?: string;
}

function DoctorFormFields({ value, onChange, emailError, emailInputRef, idPrefix = 'doctor' }: DoctorFormFieldsProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className='space-y-2'>
          <Label htmlFor={`${idPrefix}-name`}>이름</Label>
          <Input
            id={`${idPrefix}-name`}
            className='border border-foreground/20'
            value={value.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
            placeholder='의사 이름을 입력하세요.'
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-speciality`}>전문분야*</Label>
          <Input
            id={`${idPrefix}-speciality`}
            className='border border-foreground/20'
            value={value.speciality}
            onChange={(e) => onChange({ ...value, speciality: e.target.value })}
            placeholder="내과, 외과, 내과 등"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-email`}>이메일</Label>
        <Input
          ref={emailInputRef}
          id={`${idPrefix}-email`}
          className={`border border-foreground/20 ${emailError ? 'border-destructive' : ''}`}
          value={value.email}
          onChange={(e) => onChange({ ...value, email: e.target.value })}
          aria-invalid={!!emailError}
          aria-describedby={emailError ? `${idPrefix}-email-error` : undefined}
          placeholder='email@example.com'
        />
        {emailError && (
          <p id={`${idPrefix}-email-error`} className='text-sm text-red-600 mt-1'>
            {emailError}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-phone`}>전화번호</Label>
        <Input
          id={`${idPrefix}-phone`}
          className='border border-foreground/20'
          value={value.phone}
          onChange={(e) => onChange({ ...value, phone: e.target.value })}
          placeholder='(000) 123-4567'
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-gender`}>성별</Label>
          <Select
            value={value.gender || ''}
            onValueChange={(val) => onChange({ ...value, gender: val as 'MALE' | 'FEMALE' })}
          >
            <SelectTrigger className='border border-foreground/20'>
              <SelectValue placeholder="성별을 선택하세요." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">남성</SelectItem>
              <SelectItem value="FEMALE">여성</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-status`}>상태</Label>
          <Select
            value={value.isActive ? 'ACTIVE' : 'INACTIVE'}
            onValueChange={(v) => onChange({ ...value, isActive: v === 'ACTIVE' })}
          >
            <SelectTrigger className='border border-foreground/20'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">활성</SelectItem>
              <SelectItem value="INACTIVE">비활성</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default DoctorFormFields;


