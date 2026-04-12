"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function EmployeeClaimDetails() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const id = params.id;

    const [claim, setClaim] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClaim = async () => {
            try {
                const res = await fetch(`/api/employee/claims`, {
                    credentials: "include"
                });

                if (res.status === 401) {
                    window.location.href = "/employee/login";
                    return;
                }

                const data = await res.json();

                if (data.success) {
                    const found = data.claims.find((c: any) => c.id === id);
                    setClaim(found);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClaim();
    }, [id]);

    const handleLogout = async () => {
        await fetch("/api/logout", {
            method: "POST",
            credentials: "include"
        });

        window.location.href = "/employee/login";
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    if (loading) return null;

    if (!claim) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Claim not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src="/images/weyyuLogo.png" width={120} />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Weyland-Yutani Corp
                            </h1>
                            <p className="text-sm text-gray-600">
                                Employee Claims Service
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                    >
                        Log Out
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-8">

                <Link href="/employee/claim-dashboard">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition mb-6">
                        Back to Dashboard
                    </button>
                </Link>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Claim Details - {claim.id}
                </h2>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <p>
                            <strong>Date:</strong><br />
                            <span className="text-gray-700">{claim.date}</span>
                        </p>

                        <p>
                            <strong>Category:</strong><br />
                            <span className="text-gray-700">{claim.category}</span>
                        </p>

                        <p>
                            <strong>Amount:</strong><br />
                            <span className="text-gray-900 font-semibold">
                                ${claim.amount}
                            </span>
                        </p>

                        <p>
                            <strong>Status:</strong><br />
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(claim.status)}`}>
                                {claim.status}
                            </span>
                        </p>
                    </div>

                    <div>
                        <strong>Description:</strong>
                        <p className="text-gray-700 mt-1">{claim.description}</p>
                    </div>


                    {claim.receipts && claim.receipts.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Receipts</h3>

                            <div className="flex flex-wrap gap-4">
                                {claim.receipts.map((file: string, index: number) => (
                                    <img
                                        key={index}
                                        src={`/uploads/${file}`}
                                        alt="Receipt"
                                        className="w-48 h-48 object-cover rounded-lg border"
                                        onError={(e) => {
                                            e.currentTarget.src = "/images/placeholder.png";
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {claim.status === "rejected" && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-4">
                            <strong className="text-red-700">Rejection Reason:</strong>
                            <p className="text-red-600 mt-1">
                                {claim.comment || "No comment provided"}
                            </p>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}