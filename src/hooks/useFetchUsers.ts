"use client";

import { useState, useEffect } from "react";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export function useFetchUsers() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            setUsers(await Promise.resolve([{ id: 1 }, { id: 2 }] as User[]));
        };

        fetchUsers();
    }, []);

    return { users };
}
