"use client";

import { useRouter } from "next/navigation";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { useState } from "react";

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const router = useRouter();
    const { users, loading /*, error*/ } = useFetchUsers();

    const filteredUsers = users.filter(
        (user) =>
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-2xl text-gray-500">Loading</p>
            </div>
        );
    }

    // Not in specs, but we can show an error message if the fetch fails
    // if (error) {
    //     return (
    //         <div className="flex h-screen items-center justify-center">
    //             <p className="text-2xl text-red-500">Could not load users</p>
    //         </div>
    //     );
    // }

    return (
        <div className="container mx-auto flex min-h-screen flex-col p-4">
            <header className="mb-6">
                <input
                    type="text"
                    placeholder="Search User"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </header>

            <main className="flex-1">
                <div className="border">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                <th className="p-4 text-left font-bold">
                                    Email
                                </th>
                                <th className="p-4 text-left font-bold">
                                    First Name
                                </th>
                                <th className="p-4 text-left font-bold">
                                    Last Name
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b">
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">{user.firstName}</td>
                                    <td className="p-4">{user.lastName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            <footer className="mt-6 flex justify-end">
                <button
                    className="border p-2"
                    onClick={() => router.push("/add-user")}
                >
                    Add New
                </button>
            </footer>
        </div>
    );
}
