"use client";

import axios from "axios";
import { useState, useEffect } from "react";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

interface ApiResponse {
    users: User[];
    total: number;
    limit: number;
    skip: number;
}

export function useFetchUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get<ApiResponse>(
                    "https://dummyjson.com/users"
                );
                setUsers(response.data.users);
                setError(null);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err
                        : new Error("Could not fetch users.")
                );
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading, error };
}
