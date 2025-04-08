"use client";

import { useRouter } from "next/navigation";

export default function AddUserPage() {
    const router = useRouter();
    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-6 text-2xl font-bold">Add New User</h1>

            <div className="mb-6">
                <p> add user form.</p>
            </div>

            <button className="border p-2" onClick={() => router.back()}>
                Back to Users
            </button>
        </div>
    );
}
