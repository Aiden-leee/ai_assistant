'use client';

import AdminStats from "@/components/admin/AdminStats";
import DoctorsManagement from "@/components/admin/DoctorsManagement";
import RecentAppointments from "@/components/admin/RecentAppointments";
import LoadingUI from "@/components/commons/LoadingUI";
import Navbar from "@/components/commons/Navbar";
import { useGetAppointments } from "@/hooks/use-appointment";
import { useGetDoctors } from "@/hooks/use-doctors";
import { useUser } from "@clerk/nextjs";
import { SettingsIcon } from "lucide-react";

export interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  speciality: string;
  bio?: string;
  imageUrl: string;
  gender: 'MALE' | 'FEMALE';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  appointmentCount?: number;
}

export interface Appointment {
  id: string;
  date: Date;
  time: string;
  duration: number;
  status: 'CONFIRMED' | 'COMPLETED';
  notes?: string;
  reason?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  doctorId: string;
  // 관계 데이터
  user?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
  };
  doctor?: {
    id: string;
    name: string;
    speciality: string;
    imageUrl?: string;
  };
}

function AdminDashboardClient() {
  const { user } = useUser();
  const { data: doctors = [], isLoading: doctorsLoading } = useGetDoctors();
  const { data: appointments = [], isLoading: appointmentsLoading } = useGetAppointments();

  console.log({ doctors, appointments });


  const stats = {
    totalDoctors: doctors.length,
    activeDoctors: doctors.filter((doc: Doctor) => doc.isActive).length,
    totalAppointments: appointments.length,
    completedAppointments: appointments.filter((app: Appointment) => app.status === "COMPLETED").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {doctorsLoading || appointmentsLoading ? (
        <LoadingUI />
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
            {/* ADMIN WELCOME SECTION */}
            <div className="mb-12 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-primary">Admin Dashboard</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    Welcome back, {user?.firstName || "Admin"}!
                  </h1>
                  <p className="text-muted-foreground">
                    의사를 관리하고, 진료 예약을 감독하고, 치과 진료소의 성과를 모니터링합니다.
                  </p>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                  <SettingsIcon className="w-16 h-16 text-primary" />
                </div>
              </div>
            </div>

            {/* ADMIN STATUS */}
            <AdminStats
              totalDoctors={stats.totalDoctors}
              activeDoctors={stats.activeDoctors}
              totalAppointments={stats.totalAppointments}
              completedAppointments={stats.completedAppointments}
            />

            <DoctorsManagement />

            <RecentAppointments />
          </div>
        </>
      )}
    </div>
  )
}

export default AdminDashboardClient