/**
Admin Create Claim Page

Allows administrators to create a claim on behalf of an employee.
Admin selects an employee, which dynamically loads the claim submission form
pre-filled with that employee’s information.

Features:
Employee selection dropdown

Dynamic form rendering based on selected employee

Integration with EmployeeClaimSubmit component

@author Seth Korantwi
@page /admin/dashboard/claims/create
@navigation Back: /admin/dashboard/claims
*/
"use client";

import { useState } from "react";
import EmployeeClaimSubmit from "@/components/employeeClaimSubmit";
import Link from "next/link";


/**
CreateClaim Component

Handles employee selection and renders the claim submission form
for the selected employee.

@component
@param {{ users: any[] }} props - List of users available for selection
@returns {JSX.Element} Admin claim creation interface
*/

export default function CreateClaim({ users }: { users: any[] }) {
    /** Currently selected employee for claim submission */
    const [selectedUser, setSelectedUser] = useState<any>(null);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <h1 className="text-3xl font-bold">Claims</h1>

                {/* Navigate back to claims dashboard */}
                <Link href="/admin/dashboard/claims">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                        Back to claims
                    </button>
                </Link>
            </div>

            {/* Employee selection */}
            <div className="bg-white p-6 rounded shadow">
                <label className="block mb-2 font-medium">
                    Select Employee
                </label>

                <select
                    value={selectedUser?.id || ""}
                    onChange={(e) => {
                        const user = users.find(u => u.id === e.target.value);
                        setSelectedUser(user);
                    }}
                    className="border p-2 rounded w-full"
                >
                    <option value={""}>-- Choose Employee --</option>

                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.firstName} {user.lastName}
                        </option>
                    ))}
                </select>
            </div>

            {/* Claim Submission From (only appears after selectiong employee) */}
            {selectedUser && (
                <div className="bg-white p-6 rounded shadow">
                    <EmployeeClaimSubmit
                        key={selectedUser.id} // 
                        employeeId={selectedUser.id}
                        employee={selectedUser}
                        isAdmin={true}
                    />
                </div>
            )}
        </div>
    );
}