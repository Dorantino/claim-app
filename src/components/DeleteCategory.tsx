/**
Delete Category Component

Confirmation dialog for deleting categories with proper error handling.
Provides a safe deletion interface with loading states and user feedback.

Features:
- Confirmation dialog with category name display
- Delete API call with comprehensive error handling
- Loading overlay during deletion process
- Success and error message display
- Automatic navigation back to categories page on success
- Cancel option to return without deleting

Error Handling:
- 400: Invalid request errors
- 500: Server errors
- Network errors: Connection issues
- Unexpected errors: Generic error handling

API Integration:
Uses DELETE method to /api/admin/deleteCategories/{id}
Expects JSON response with status codes

Navigation:
- Success: Redirects to /admin/dashboard/categories
- Cancel: Returns to /admin/dashboard/categories

@author Seth Korantwi
@component DeleteCategory
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
DeleteCategory Component

Renders a confirmation dialog for category deletion.
Handles the delete operation with proper error handling and user feedback.

@component
@param {{ category: {id: string, label: string} }} props - Component props
@param {Object} props.category - Category object with id and label properties
@returns {JSX.Element} Category deletion confirmation dialog
*/
export default function DeleteUser({ category }: any) {
    const router = useRouter();
    const DELETE_URL: string = `/api/admin/deleteCategories/${category.id}`;

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
                setSuccessMessage("category deleted successfully.");

                router.push("/admin/dashboard/categories");
                router.refresh();
            } else {
                setErrorMessage("Failed to delete category.");
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
            {/* Loading overlay for delete operation */}
            <LoadingOverlay show={loading} bgColor="rgba(3,80,116,0.8)" spinnerColor="#FFFFFF" />

            {/* Centered confirmation dialog */}
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
                <div className="max-w-lg w-full bg-white p-8 rounded shadow">

                    {/* Warning header */}
                    <h1 className="text-2xl font-bold mb-4 text-red-600">
                        Delete Category
                    </h1>

                    {/* Error message display */}
                    {showError && (
                        <p className="text-red-500 mb-4">
                            {errorMessage}
                        </p>
                    )}

                    {/* Success message display */}
                    {successMessage && (
                        <p className="text-green-500 mb-4">
                            {successMessage}
                        </p>
                    )}

                    {/* Confirmation text with category name */}
                    <p className="mb-6">
                        Are you sure you want to delete the category{" "}
                        <span className="font-bold text-red-600">
                            {category.label}
                        </span>
                        ? This action cannot be undone.
                    </p>

                    {/* Action buttons */}
                    <div className="flex gap-4">
                        {/* Confirm delete button */}
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Confirm Delete
                        </button>

                        {/* Cancel button */}
                        <button
                            onClick={() =>
                                router.push("/admin/dashboard/categories")
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