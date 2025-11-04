'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import UserState from '../userState'
import { SettingsIcon } from 'lucide-react'
import { checkAdminRole } from '@/lib/actions/auth/users'

function Header() {
  const pathname = usePathname()
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const checkRole = async () => {
      const adminStatus = await checkAdminRole();
      setIsAdmin(adminStatus);
    }
    checkRole();
  }, []);

  return (
    <nav className='fixed top-0 right-0 left-0 z-50 px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16'>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src={"/logo.png"} alt="logo" width={32} height={32} className='w-11' />
          <span className="font-semibold text-lg">AI Assistant</span>
        </Link>

        <div className='hidden md:flex items-center gap-8'>
          <Link
            href="/how-it-works"
            className={`transition-colors hover:text-foreground ${pathname === "/how-it-works"
                ? "text-primary font-semibold"
                : "text-muted-foreground"
              }`}
          >
            작동 방식
          </Link>
          <Link
            href="/contact"
            className={`transition-colors hover:text-foreground ${pathname === "/contact"
                ? "text-primary font-semibold"
                : "text-muted-foreground"
              }`}
          >
            문의하기
          </Link>
          <Link href="/pro" className="text-muted-foreground hover:text-foreground">
            가격
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link href="/admin" className="flex items-center gap-2 transition-colors hover:text-primary">
              <SettingsIcon className="w-4 h-4" />
              <span className="hidden md:inline">관리자</span>
            </Link>
          )}
          <UserState />
        </div>
      </div>
    </nav>
  )
}

export default Header