/**
 * Custom 404 page component.
 *
 * Shows a friendly not-found message and includes a back navigation button.
 */
"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-10 max-w-md w-full text-center">

                {/* Icon */}
                <div className="text-6xl mb-4">:(</div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Page Not Found
                </h1>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                    The page you're looking for doesn't exist or may have been moved.
                </p>

                {/* Actions */}
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => router.back()}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition"
                    >
                        Go Back
                    </button>

                    <button
                        onClick={() => router.push("/employee/claim-dashboard")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                    >
                        Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}