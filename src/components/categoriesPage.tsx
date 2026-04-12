/**
Category Management Page Component

Admin interface for managing claim categories.
Allows administrators to add new categories and view/delete existing ones.

Features:
- Add new categories with validation
- Display categories in a sortable table
- Delete non-default categories
- Loading states with overlay
- Comprehensive error handling (network, server, validation errors)
- Real-time form validation
- Page refresh after successful operations

Category Properties:
- id: unique identifier
- label: category name (displayed in uppercase)
- date: creation/modification date
- isDefault: boolean flag for system default categories

Error Handling:
- 400: Validation errors from server
- 500: Server errors
- Network errors: Connection issues
- Client validation: Empty category names

@author Seth Korantwi
@component CategoryPage
@uses sendJSONData from Toolkit
@uses LoadingOverlay component
@uses Next.js router for navigation
*/
"use client"

import { useState } from "react";
import { sendJSONData } from "@/tools/Toolkit";
import LoadingOverlay from "@/tools/LoadingOverlay";
import { useRouter } from "next/navigation";
import Link from "next/link";


/**
CategoryPage Component

Renders the category management interface for administrators.
Handles category creation, display, and deletion with proper error handling.

@component
@param {{ categories: Array<{id: string, label: string, date: string, isDefault: boolean}> }} props - Component props
@param {Array} props.categories - Array of category objects to display
@returns {JSX.Element} Category management interface
*/
export default function CategoryPage({ categories }: { categories: any[] }) {

    const router = useRouter();
    const POST_URL = "/api/admin/addCategories";

    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleAdd = async () => {
        if (!categoryName.trim()) {
            setErrorMessage("Category name is required.");
            return;
        }

        setErrorMessage("");
        setLoading(true);

        try {
            const responseData = await sendJSONData(POST_URL, {
                name: categoryName,
            });

            if (!responseData) {
                setErrorMessage("Network error. Please try again.");
            }
            else if (responseData.status === 400) {
                setErrorMessage(responseData.data.error);
            }
            else if (responseData.status === 500) {
                setErrorMessage("Server error. Try again later.");
            }
            else if (responseData.status === 200) {
                setCategoryName("");
                router.refresh();

            }
        } catch (err) {
            setErrorMessage("Unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Loading overlay for API operations */}
            <LoadingOverlay show={loading} bgColor="rgba(3,80,116,0.8)" spinnerColor="#FFFFFF"
            />

            <div className="space-y-6">
                {/* Page header */}
                <h1 className="text-3xl font-bold justify-between border-b border-slate-700 pb-4">Category Management</h1>

                {/* Add new category form */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="font-semibold mb-4">Add New Category</h2>

                    {/* Error message display */}
                    {errorMessage && (
                        <p className="text-red-500 mb-3">
                            {errorMessage}
                        </p>
                    )}

                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Category name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="border p-2 rounded flex-1"
                        />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleAdd} disabled={loading}>
                            Add
                        </button>
                    </div>
                </div>


                {/* Categories table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        {/* Table header */}
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-4">Category Name</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* Empty state when no categories */}
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="p-6 text-center text-gray-500">
                                        No categories found.
                                    </td>
                                </tr>
                            ) : (
                                /* Render categories list */
                                categories.map((cat) => (
                                    <tr key={cat.id} className="border-t">
                                        <td className="p-4 font-medium">
                                            {cat.label.toUpperCase()}
                                        </td>

                                        <td className="p-4">
                                            {cat.date}
                                        </td>

                                        <td className="p-4 space-x-3">
                                            {/* Show default badge for system categories, delete button for others */}
                                            {cat.isDefault ? (
                                                <span className="bg-blue-400 text-white px-3 py-1 rounded text-sm">
                                                    Default
                                                </span>
                                            ) : (
                                                <>
                                                    <Link href={`/admin/dashboard/categories/delete/${cat.id}`}>
                                                        <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">
                                                            Delete
                                                        </button>
                                                    </Link>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>);
}
