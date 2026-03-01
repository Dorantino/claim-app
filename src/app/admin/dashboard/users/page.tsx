import { getUsers } from '@/tools/DataManager';
import Link from "next/link";

export default async function UsersPage() {
    const Users = await getUsers();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold border-b border-slate-700 pb-4">User Management</h1>


            <div className="flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="border p-2 rounded w-64"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    + Add User
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Created</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Users.map((user) => (
                            <tr className="border-t" key={user.email}>
                                <td className="p-4">{user.firstName} {user.lastName}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs ${user.role === "ADMIN"
                                        ? "bg-purple-100 text-purple-700"
                                        : "bg-gray-100 text-gray-700"
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4">{user.date}</td>
                                <td className="p-4 space-x-3">
                                    {user.role !== "ADMIN" && (
                                        <Link href={`/admin/dashboard/users/delete/${user.id}`}>
                                            <button className="bg-red-600 text-white px-3 py-1 rounded">
                                                Delete
                                            </button>
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

