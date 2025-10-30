import { selectUserAppointmentStats } from "../appointment/appointment.model";
import { CreateDoctorData, deleteDeactivateDoctor, insertDoctor, selectAllDoctors, selectAvailableDoctors, selectDoctorById, selectDoctorsBySpeciality, updateDoctor, UpdateDoctorData } from "./doctor.model";

// 의사 생성 서비스
export const createDoctorService = async (doctorData: CreateDoctorData) => {
    return await insertDoctor(doctorData);
}

// 모든 의사 조회 서비스
export const readAllDoctorsService = async () => {
    return await selectAllDoctors();
}

// 활성 의사 목록 조회 서비스 (이름 오름차순, 예약 수 포함)
export const readAvailableDoctorsService = async () => {
    return await selectAvailableDoctors();
}

// 사용자의 예약 통계 조회 서비스
export const readUserAppointmentStatsService = async (userId: string) => {
    return await selectUserAppointmentStats(userId);
}

// ID로 의사 조회 서비스
export const readDoctorByIdService = async (id: string) => {
    return await selectDoctorById(id);
}

// 전문과목으로 의사 조회 서비스
export const readDoctorsBySpecialityService = async (speciality: string) => {
    return await selectDoctorsBySpeciality(speciality);
}

// 의사 정보 업데이트 서비스
export const modifyDoctorService = async (id: string, doctorData: UpdateDoctorData) => {
    return await updateDoctor(id, doctorData);
}

// 의사 삭제 서비스
export const removeDoctorService = async (id: string) => {
    return await deleteDeactivateDoctor(id);
}