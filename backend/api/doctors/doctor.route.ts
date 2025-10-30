import { Router } from 'express';
import {  } from './doctor.model';
import { getDoctorAppointments } from '../appointment/appointment.controller';
import { deleteDoctorController, getAllDoctorsController, getAvailableDoctorsController, getDoctorByIdController, getDoctorsBySpecialityController, postDoctorController, putDoctorController } from './doctor.controller';

const doctorRouter = Router();


// 의사 생성
doctorRouter.post('/', postDoctorController);

// 모든 의사 조회
doctorRouter.get('/all', getAllDoctorsController);

// 사용 가능한 활성 의사 조회 (이름 오름차순, 예약 수 포함)
doctorRouter.get('/available', getAvailableDoctorsController);

// ID로 의사 조회 (와일드카드 경로는 뒤에 선언)
doctorRouter.get('/:id', getDoctorByIdController);

// 의사 정보 업데이트
doctorRouter.put('/:id', putDoctorController);

// 의사 삭제
doctorRouter.delete('/:id', deleteDoctorController);

// 전문과목으로 의사 조회
doctorRouter.get('/speciality/:speciality', getDoctorsBySpecialityController);

// 의사의 예약 목록 조회 
doctorRouter.get('/:doctorId/appointments', getDoctorAppointments);

export default doctorRouter;