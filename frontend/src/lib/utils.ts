import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 아바타 플레이스홀더 생성
export function generateAvatar(name: string, gender: 'MALE' | 'FEMALE') {
  const username = name.replace(/\s+/g, '').toLowerCase();
  const base = "https://avatar.iran.liara.run/public";
  if (gender === 'FEMALE') return `${base}/girl?username=${username}`;
  return `${base}/boy?username=${username}`
}

// 전화번호 형식 검증 (XXX-XXXX-XXXX)
export const formatPhoneNumber = (phone: string) => {
  if (!phone) return phone;

  let cleaned = phone.replace(/\D/g, '');

  // 11자리 이상이면 초과 부분 잘라냄
  if (cleaned.length > 11) {
    cleaned = cleaned.slice(0, 11);
  }

  const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return cleaned;

}