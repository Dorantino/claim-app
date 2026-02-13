"use client";

import { useState } from "react";

export default function Dashboard() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <h1 className="text-3xl font-bold ">Claims</h1>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    File a Claim
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between bg-white p-4 rounded-lg shadow">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search by claim ID, patient name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex gap-4">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option>All</option>
                        <option>In Review</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                        <option>On Hold</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                Claims table will go here
            </div>

        </div>
    );
}
