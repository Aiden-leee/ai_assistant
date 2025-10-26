import { Router } from 'express';
import {  } from './doctor.model';
import { getDoctorAppointments } from '../appointment/appointment.controller';
import { deleteDoctorController, getAllDoctorsController, getDoctorByIdController, getDoctorsBySpecialityController, postDoctorController, putDoctorController } from './doctor.controller';

const doctorRouter = Router();


// 의사 생성
doctorRouter.post('/', postDoctorController);

// 모든 활성 의사 조회
doctorRouter.get('/active', getAllDoctorsController);

// ID로 의사 조회
doctorRouter.get('/:id', getDoctorByIdController);

// 전문과목으로 의사 조회
doctorRouter.get('/speciality/:speciality', getDoctorsBySpecialityController);

// 의사 정보 업데이트
doctorRouter.put('/:id', putDoctorController);

// 의사 삭제
doctorRouter.delete('/:id', deleteDoctorController);

// 의사의 예약 목록 조회
doctorRouter.get('/:doctorId', getDoctorAppointments);


export {
    doctorRouter
}