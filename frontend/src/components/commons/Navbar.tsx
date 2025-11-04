"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { CalendarIcon, CrownIcon, HomeIcon, MicIcon, SettingsIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { checkAdminRole } from "@/lib/actions/auth/users";

function Navbar() {
    const { user } = useUser();
    const pathname = usePathname();
    const [isAdmin, setIsAdmin] = useState(false);

    // admin role 체크 - 서버 액션을 통해 private metadata에서 role 확인
    useEffect(() => {
        const checkRole = async () => {
            if (user) {
                const adminStatus = await checkAdminRole();
                setIsAdmin(adminStatus);
            }
        };
        checkRole();
    }, [user]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
            <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
                {/* logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/logo.png" alt="logo" width={32} height={32} className="w-11" />
                        <span className="font-semibold text-lg">AI Assistant</span>
                    </Link>
                </div>

                <div className="flex items-center gap-6">
                    {/* dashboard */}
                    <Link href="/dashboard" className={`flex items-center gap-2 transition-colors hover:text-primary 
                     ${pathname === "/dashboard" ?
                            "text-primary font-semibold" :
                            "text-muted-foreground"
                        }`} >
                        <HomeIcon className="w-4 h-4" />
                        <span className="hidden md:inline">대시보드</span>
                    </Link>

                    {/* appointments */}
                    <Link href="/appointments"
                        className={`flex items-center gap-2 transition-colors hover:text-primary 
                        ${pathname === "/appointments" ?
                                "text-primary font-semibold" : "text-muted-foreground"
                            }`} >
                        <CalendarIcon className="w-4 h-4" />
                        <span className="hidden md:inline">예약</span>
                    </Link>

                    {/* voice */}
                    <Link href="/voice"
                        className={`flex items-center gap-2 transition-colors hover:text-primary 
                        ${pathname === "/voice" ?
                                "text-primary font-semibold" : "text-muted-foreground"
                            }`}>
                        <MicIcon className="w-4 h-4" />
                        <span className="hidden md:inline">음성 AI</span>
                    </Link>

                    {/* pro */}
                    <Link href="/pro"
                        className={`flex items-center gap-2 transition-colors hover:text-primary
                        ${pathname === "/pro" ?
                                "text-primary font-semibold" : "text-muted-foreground"
                            }`}>
                        <CrownIcon className="w-4 h-4" />
                        <span className="hidden md:inline">프로</span>
                    </Link>
                </div>

                {/* RIGHT SECTION */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        {isAdmin && (
                            <Link href="/admin" className="flex items-center gap-2 transition-colors hover:text-primary">
                                <SettingsIcon className="w-4 h-4" />
                                <span className="hidden md:inline">관리자</span>
                            </Link>
                        )}
                        <div className="hidden lg:flex flex-col items-end">
                            <span className="text-sm font-medium text-foreground">
                                {user?.firstName} {user?.lastName}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {user?.emailAddresses?.[0]?.emailAddress}
                            </span>
                        </div>

                        <UserButton />
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Navbar
