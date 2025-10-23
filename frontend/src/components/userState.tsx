'use client';
import { SignInButton, SignUpButton, useClerk, useUser } from '@clerk/nextjs';
import React from 'react'
import { Button } from './ui/button';
import { LogOut, UserIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

function UserState() {
    const { isLoaded, isSignedIn, user } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();
    if (!isLoaded) return null;
    return (
        <>
            {
                isSignedIn ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size={"sm"}>
                                {user?.imageUrl && (
                                    <Image
                                        src={user.imageUrl}
                                        alt={user.fullName || 'User'}
                                        width={20}
                                        height={20}
                                        className='rounded-full' />
                                )}
                                <span className='text-sm font-medium'>{user?.fullName}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" sideOffset={8}>
                            <DropdownMenuItem onSelect={(e) => { e.preventDefault(); router.push('/dashboard'); }}>
                                <UserIcon className="mr-2 size-4" />
                                프로필
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onSelect={(e) => { e.preventDefault(); signOut(); }}>
                                <LogOut className="mr-2 size-4" />
                                로그아웃
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <>
                        <SignInButton mode='modal'>
                            <Button variant="ghost" size={"sm"}>로그인</Button>
                        </SignInButton>
                        <SignUpButton mode='modal'>
                            <Button size={"sm"}>회원가입</Button>
                        </SignUpButton>
                    </>
                )
            }
        </>
    )
}

export default UserState;