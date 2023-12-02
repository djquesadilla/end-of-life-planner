"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

const SinginButton = () => {
    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <div className="flex gap-4 ml-auto">
                <p className="text-sky-600">{session.user.name}</p>
                <button className="text-red-600" onClick={() => signOut()}>
                    Sign out
                </button>
            </div>
        )
    }

    return (
        <button onClick={() => signIn()} className="px-8 py-3 font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Sign in
        </button>
    );
};

export default SinginButton;