"use client";

import { User } from "@/domain/user";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type UserContextType = {
    users: User[];
    loading: boolean;
    error: Error | null;
    addUser: (user: User) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const { users: initialUsers, loading, error } = useFetchUsers();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (initialUsers.length > 0) {
            setUsers(initialUsers);
        }
    }, [initialUsers]);

    const addUser = (user: User) => {
        setUsers((prevUsers) => [...prevUsers, user]);
    };

    return (
        <UserContext.Provider value={{ users, addUser, loading, error }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
}
