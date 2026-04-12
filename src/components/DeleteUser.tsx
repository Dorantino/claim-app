/**
Delete User Component

Admin confirmation dialog for deleting a user account.
Provides safe deletion flow with loading state, success and error feedback,
and navigation back to the user management page.

Features:
- DELETE request to /api/admin/deleteUser/{id}
- Loading overlay while request is pending
- Error handling for network, server, and validation failures
- Success message and redirect on completion
- Cancel button to abort deletion and return to users list

API Response Handling:
- 200: Success
- 400: Invalid request
- 500: Server error
- null/undefined: Network error

@author Seth Korantwi
@component DeleteUser
@uses sendJSONData from Toolkit
@uses LoadingOverlay component
@uses Next.js router for navigation
*/
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { sendJSONData } from "@/tools/Toolkit";
import LoadingOverlay from "@/tools/LoadingOverlay";

/**
DeleteUser Component

Renders a confirmation dialog to delete a user.

@component
@param {{ user: { id: string, firstName: string, lastName: string } }} props - Component props
@param {Object} props.user - User object being deleted
@returns {JSX.Element} Deletion confirmation interface
*/
export default function DeleteUser({ user }: any) {
    const router = useRouter();
    const DELETE_URL: string = `/api/admin/deleteUser/${user.id}`;

    const [loading, setLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    async function handleDelete() {
        setShowError(false);
        setSuccessMessage("");
        setLoading(true);

        try {
            const responseData = await sendJSONData(
                DELETE_URL,
                {},
                "DELETE"
            );

            if (!responseData) {
                setErrorMessage("Network error. Please try again.");
                setShowError(true);
            }
            else if (responseData.status === 500) {
                setErrorMessage("Server error. Please try again later.");
                setShowError(true);
            }
            else if (responseData.status === 400) {
                setErrorMessage("Invalid request.");
                setShowError(true);
            }
            else if (responseData.status === 200) {
                setSuccessMessage("User deleted successfully.");

                router.push("/admin/dashboard/users");
                router.refresh();
            }
            else {
                setErrorMessage("Failed to delete user.");
                setShowError(true);
            }

        } catch (err: any) {
            setErrorMessage("Unexpected error occurred.");
            setShowError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* Show overlay while delete request is running */}
            <LoadingOverlay show={loading} bgColor="rgba(3,80,116,0.8)" spinnerColor="#FFFFFF" />

            {/* Confirmation dialog centered on page */}
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
                <div className="max-w-lg w-full bg-white p-8 rounded shadow">

                    {/* Header */}
                    <h1 className="text-2xl font-bold mb-4 text-red-600">
                        Delete User
                    </h1>

                    {/* Error feedback */}
                    {showError && (
                        <p className="text-red-500 mb-4">
                            {errorMessage}
                        </p>
                    )}

                    {/* Success feedback */}
                    {successMessage && (
                        <p className="text-green-500 mb-4">
                            {successMessage}
                        </p>
                    )}

                    {/* Confirmation prompt with selected user name */}
                    <p className="mb-6">
                        Are you sure you want to delete{" "}
                        <span className="font-bold text-red-600">
                            {user.firstName} {user.lastName}
                        </span>
                        's account? This action cannot be undone.
                    </p>

                    {/* Action buttons */}
                    <div className="flex gap-4">
                        {/* Execute delete request */}
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Confirm Delete
                        </button>

                        {/* Cancel and return to users list */}
                        <button
                            onClick={() =>
                                router.push("/admin/dashboard/users")
                            }
                            className="flex-1 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}