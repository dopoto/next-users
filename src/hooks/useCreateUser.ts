import { User } from "@/domain/user";
import { useState } from "react";

export function useCreateUser() {
    const [isLoading, setIsLoading] = useState(false);

    const createUser = async (userData: User) => {
        setIsLoading(true);

        try {
            const response = await fetch("https://dummyjson.com/users/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error("Failed to create user");
            }

            const data = await response.json();
            setIsLoading(false);
            return data;
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    };

    return { createUser, isLoading };
}
