"use client";

import { initUserProfile } from "@/lib/actions/auth/users";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";


function UserSync() {
    const { isSignedIn, isLoaded } = useUser();

    useEffect(() => {
        const handleUserSync = async () => {
            if( isLoaded && isSignedIn ) {
                try {
                    await initUserProfile();
                    console.log('User synced successfully');
                } catch (error) {
                    console.error('Error syncing user:', error);
                }
            }
        }
        handleUserSync();
    }, [isLoaded, isSignedIn]);

    return null;
}

export default UserSync