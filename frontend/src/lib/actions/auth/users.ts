'use server';

import { currentUser } from "@clerk/nextjs/server";
import { apiBase } from "../../constants";

export async function initUserProfile() {
    try {
        // 현재 로그인된 사용자 정보
        const user = await currentUser();
        if (!user) return null;
        
        console.log("user",user.firstName);
        // 서버 기존 유저 정보 조회
        const existingUser = await fetch(`${apiBase}/api/auth/profile/${user.id}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            cache: 'no-store'
        });
        
        if (existingUser.ok) return existingUser.json();
        
        // 서버에 새 유저 정보 생성
        const userData = {
            clerkId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.emailAddresses[0].emailAddress,
            phone: user.phoneNumbers?.[0]?.phoneNumber
        };
        console.log("userData",{userData});
        const newUser = await fetch(`${apiBase}/api/auth/register`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
                cache: 'no-store'
            });
            console.log("newUser",newUser);
        if (!newUser.ok) return;
        return newUser.json();

    } catch (error) {
        console.error('Error initUserProfile:', error);
    }

}