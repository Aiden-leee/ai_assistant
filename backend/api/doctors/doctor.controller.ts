import { Request, Response } from "express";
import { createDoctorService, modifyDoctorService, readAllDoctorsService, readAvailableDoctorsService, readDoctorByIdService, readDoctorsBySpecialityService, removeDoctorService } from "./doctor.service";

// 의사 생성
export const postDoctorController = async (req: Request, res: Response) => {
    const doctorData = req.body;

    if( !doctorData.name || !doctorData.email ) {
        return res.status(400).json({
            success: false,
            message: '이름과 이메일은 필수 입력 항목입니다.'
        })
    }

    try {
        const doctor = await createDoctorService(doctorData);
        res.status(201).json({
            success: true,
            message: '의사가 성공적으로 생성되었습니다.',
            data: doctor
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || '의사 생성 중 오류가 발생했습니다.'
        });
    }
}

// 모든 활성 의사 조회
export const getAllDoctorsController = async (req: Request, res: Response) => {
    try {
        const doctors = await readAllDoctorsService();
        res.status(200).json({
            success: true,
            message: '모든 활성 의사가 조회되었습니다.',
            data: doctors
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || '모든 활성 의사 조회 중 오류가 발생했습니다.'
        });
    }
}

// 활성 의사 조회 (이름 오름차순, 예약 수 포함)
export const getAvailableDoctorsController = async (req: Request, res: Response) => {
    try {
        const doctors = await readAvailableDoctorsService();
        res.status(200).json({
            success: true,
            message: '활성 의사가 조회되었습니다.',
            data: doctors
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || '활성 의사 조회 중 오류가 발생했습니다.'
        });
    }
}

// ID로 의사 조회
export const getDoctorByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const doctor = await readDoctorByIdService(id);
        res.status(200).json({
            success: true,
            message: '의사가 조회되었습니다.',
            data: doctor
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || '의사 조회 중 오류가 발생했습니다.'
        });
    }
}

// 전문과목으로 의사 조회
export const getDoctorsBySpecialityController = async (req: Request, res: Response) => {
    const { speciality } = req.params;
    try {
        const doctors = await readDoctorsBySpecialityService(speciality);
        res.status(200).json({
            success: true,
            message: '전문과목으로 의사가 조회되었습니다.',
            data: doctors
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || '전문과목으로 의사 조회 중 오류가 발생했습니다.'
        });
    }
}

// 의사 정보 업데이트
export const putDoctorController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const doctorData = req.body;
    try {
        const doctor = await modifyDoctorService(id, doctorData);
        res.status(200).json({
            success: true,
            message: '의사 정보가 성공적으로 업데이트되었습니다.',
            data: doctor
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || '의사 정보 업데이트 중 오류가 발생했습니다.'
        });
    }
}

// 의사 삭제
export const deleteDoctorController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const doctor = await removeDoctorService(id);
        res.status(200).json({
            success: true,
            message: '의사가 성공적으로 삭제되었습니다.',
            data: doctor
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || '의사 삭제 중 오류가 발생했습니다.'
        });
    }
}