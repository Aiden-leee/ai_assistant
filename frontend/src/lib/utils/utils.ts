import { clsx, type ClassValue } from "clsx"
import dayjs from "./dayjs";
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

// 다음 5일의 날짜 배열 반환
export const getNext5Days = () => {
  const dates = [];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // 다음 5일의 날짜 배열 생성
  for (let i = 0; i < 5; i++) {
    const date = new Date(tomorrow);
    date.setDate(date.getDate() + i);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    dates.push(`${year}-${month}-${day}`); // 로컬 타임존 기준 YYYY-MM-DD
  }
  return dates;
}

// 로컬 타임존 기준으로 'YYYY-MM-DD' 날짜로 변환
export function formatLocalDate(utcDateString: string) {
  return dayjs.utc(utcDateString).local().format("YYYY-MM-DD (ddd)");
}

// 예약 가능한 시간 슬롯 배열 반환
export const getAvailableTimeSlots = (): string[] => {
  return [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ]
}

// 예약 유형 배열 반환
export const APPOINTMENT_TYPES = [
  { id: "checkup", name: "정기 검진", duration: "60 min", price: "$120" },
  { id: "cleaning", name: "치아 클리닝", duration: "45 min", price: "$90" },
  { id: "consultation", name: "상담", duration: "30 min", price: "$75" },
  { id: "emergency", name: "응급 방문", duration: "30 min", price: "$150" },
]