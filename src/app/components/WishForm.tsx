"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { createOrUpdateWish } from "../utils/supabase";
import React from "react";

const WishForm = () => {
    const [wish, setWish] = useState("");
    const [submitMessage, setSubmitMessage] = useState({ text: "", type: "" });
    const { data: session } = useSession();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!session) {
            setSubmitMessage({ text: "You must be signed in to submit a wish.", type: "error" });
            return;
        }

        const { data: wishData, error: wishError } = await createOrUpdateWish(session.user, wish)

        if (wishError) {
            setSubmitMessage({ text: "Something went wrong.", type: "error" });
            throw new Error(wishError);
        } else {
            // Handle success and clear form
            setSubmitMessage({ text: "Your wish has been saved successfully!", type: "success" });
            setWish("");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {submitMessage.text && (
                <div className={`alert ${submitMessage.type === "error" ? "alert-error" : "alert-success"}`}>
                    {submitMessage.text}
                </div>
            )}
            <textarea
                rows={4}
                className="border p-2"
                placeholder="Write your after-life wish..."
                value={wish}
                onChange={(e) => setWish(e.target.value)}
            />
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >Save wish</button>
        </form>
    );
}

export default WishForm;