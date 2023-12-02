// This component is the main dashboard component that is rendered when the user is logged in.
// For now, I only want to show the wishform if user is logged in
"use client";
import React from "react";
import WishForm from "./WishForm";
import { useSession } from "next-auth/react";

const Dashboard = () => {
    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <div className="flex flex-col space-y-4">
                <h1 className="text-2xl font-semibold">Welcome {session.user.name}</h1>
                <WishForm />
            </div>
        )
    }
}

export default Dashboard;
