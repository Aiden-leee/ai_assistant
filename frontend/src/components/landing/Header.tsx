import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { UserIcon } from 'lucide-react'
import UserState from '../userState'

function Header() {
  
  return (
    <nav className='fixed top-0 right-0 left-0 z-50 px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16'>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src={"/logo.png"} alt="logo" width={32} height={32} className='w-11' />
          <span className="font-semibold text-lg">AI Assistant</span>
        </Link>

        <div className='hidden md:flex items-center gap-8'>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            작동 방식
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            문의하기
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            가격
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <UserState />
        </div>
      </div>
    </nav>
  )
}

export default Header