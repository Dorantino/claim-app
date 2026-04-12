/**
 * Reports Page Component
 *
 * Admin reporting dashboard for viewing claim counts and category charts.
 * Supports optional date range filtering via query parameters.
 *
 * Features:
 * - Date filter inputs with route-based filtering
 * - Summary cards for total, approved, rejected, and pending claims
 * - Category breakdown chart using Recharts
 * - Default values if claim count data is missing
 *
 * Data Shape:
 * - claimCounts.total: number
 * - claimCounts.approved: number
 * - claimCounts.rejected: number
 * - claimCounts.pending: number
 * - claimCounts.byCategory: Array<{ category: string, count: number }>
 *
 * @author Seth Korantwi
 * @component ReportsPage
 * @param {{ claimCounts: any }} props - Dashboard metrics and chart data
 * @returns {JSX.Element} Admin reports dashboard
 */
"use client"

import Chart from "@/components/Barchart";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReportsPage({ claimCounts }: { claimCounts: any }) {

    const router = useRouter();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const applyFilter = () => {
        if (!startDate && !endDate) {
            router.push("/admin/dashboard/reports");
            return;
        }

        if (startDate && endDate) {
            router.push(`/admin/dashboard/reports?start=${startDate}&end=${endDate}`);
        }
    };


    return (
        <div className="space-y-6">
            {/* Page title and section header */}
            <h1 className="text-3xl font-bold border-b border-slate-700 pb-4">Reports</h1>

            {/* Date filter controls */}
            <div className="bg-white p-4 rounded-lg shadow flex gap-4 items-end">
                <div>
                    <label className="block text-sm font-medium">Start Date</label>
                    <input type="date" className="border p-2 rounded w-full" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>

                <div>
                    <label className="block text-sm font-medium">End Date</label>
                    <input type="date" className="border p-2 rounded w-full" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={applyFilter}>
                    Apply Filter
                </button>
            </div>

            {/* Summary cards for claim totals */}
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Total Claims</h2>
                    <p className="text-3xl font-bold mt-2">{claimCounts.total ?? 0}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Approved</h2>
                    <p className="text-3xl font-bold mt-2 text-green-600">{claimCounts.approved ?? 0}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Rejected</h2>
                    <p className="text-3xl font-bold mt-2 text-red-600">{claimCounts.rejected ?? 0}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">PENDING</h2>
                    <p className="text-3xl font-bold mt-2 text-yellow-600">{claimCounts.pending ?? 0}</p>
                </div>
            </div>

            {/* Category breakdown chart */}
            <div className="bg-white p-4 rounded-lg shadow h-84 flex items-center justify-center text-gray-400">
                <Chart data={claimCounts.byCategory} />
            </div>
        </div>
    );
}
