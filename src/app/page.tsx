"use client";

import { useRouter } from "next/navigation";
import { useFetchUsers } from "@/hooks/useFetchUsers";

export default function UsersPage() {
    const router = useRouter();
    const { users } = useFetchUsers();
    console.log(JSON.stringify(users));
    return (
        <div className="container mx-auto flex min-h-screen flex-col p-4">
            <header className="mb-6">header</header>

            <main className="flex-1">TODO</main>

            <footer className="mt-6 flex justify-end">
                <button onClick={() => router.push("/add-user")}>
                    Add New
                </button>
            </footer>
        </div>
    );
}
