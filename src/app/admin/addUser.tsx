"use client";

import { useState } from "react";

export default function AddEmployee() {

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(firstName, lastName, email, password);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-start lg:items-center justify-center px-6 py-8 md:py-12 lg:py-0">

            <div className="w-full max-w-3xl bg-white rounded shadow-md p-10">

                <form onSubmit={onSubmit}>
                    <h2 className="text-3xl font-semibold text-center mb-8">
                        Add Employee
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                    </div>

                    <div className="flex gap-4 mt-10">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            Create Employee
                        </button>


                        <button
                            type="button"
                            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};
