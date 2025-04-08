"use client";

import { useRouter } from "next/navigation";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { useState } from "react";

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const router = useRouter();
    const { users } = useFetchUsers();

    const filteredUsers = users.filter(
        (user) =>
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <table>
                    <thead>
                        <tr>
                            <td>Email</td>
                            <td>First name</td>
                            <td>Last name</td>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>

            <footer className="mt-6 flex justify-end">
                <button onClick={() => router.push("/add-user")}>
                    Add New
                </button>
            </footer>
        </div>
    );
}
