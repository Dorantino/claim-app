"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { sendJSONData } from "@/tools/Toolkit";

export default function DeleteUser({ user }: any) {
    // console.log(user)
    const router = useRouter();
    const DELETE_URL: string = `/api/admin/users/${user.id}`;

    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        setLoading(true);
        try {
            const responseData = await sendJSONData(DELETE_URL, {}, "DELETE");

            if (responseData?.status === 200) {
                router.push("/admin/dashboard/users");
            } else {
                alert("Failed to delete user");
            }
        } catch (err: any) {
            alert("Unexpected error: " + err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-lg mx-auto mt-20 bg-white p-8 rounded shadow">
            <h1 className="text-2xl font-bold mb-6 text-red-600">
                Delete User
            </h1>

            <p className="mb-6">
                Are you sure you want to delete <span className="text-xl font-bold mb-6 text-red-600">{user.firstName} {user.lastName}'s</span> account? This action cannot be undone.
            </p>

            <div className="flex gap-4">
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    {loading ? "Deleting..." : "Confirm Delete"}
                </button>

                <button
                    onClick={() => router.back()}
                    className="bg-gray-300 px-4 py-2 rounded"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}