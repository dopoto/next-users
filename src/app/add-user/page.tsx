"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useCreateUser } from "@/hooks/useCreateUser";
import { User } from "@/domain/user";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AddUserPage() {
    const router = useRouter();
    const { createUser, isLoading } = useCreateUser();
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const { register, handleSubmit } = useForm<User>();

    const onSubmit = async (data: User) => {
        try {
            setSubmitError(null);
            await createUser(data);
            router.push("/");
        } catch {
            setSubmitError("Failed to create user. Please try again.");
        }
    };

    const handleFormSubmit = handleSubmit(onSubmit, (errors) => {
        const errorMessages = Object.entries(errors)
            .map(([, error]) => error.message)
            .filter((message): message is string => message !== undefined);
        setValidationErrors(errorMessages);
        setIsAlertOpen(true);
    });

    return (
        <div className="container max-w-md py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Add New User</CardTitle>
                    <CardDescription>
                        Fill in the form below to add a new user.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleFormSubmit}>
                    <CardContent className="space-y-4">
                        {submitError && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    {submitError}
                                </AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email is not valid",
                                    },
                                })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                {...register("firstName", {
                                    required: "First Name is required",
                                    minLength: {
                                        value: 5,
                                        message:
                                            "First Name should be at least 5 characters",
                                    },
                                })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                {...register("lastName", {
                                    required: "Last Name is required",
                                    minLength: {
                                        value: 5,
                                        message:
                                            "Last Name should be at least 5 characters",
                                    },
                                })}
                            />
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full mt-5"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating..." : "Submit"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            <footer className="mt-6 flex justify-start">
                <button className="border p-2" onClick={() => router.push("/")}>
                    Back to users
                </button>
            </footer>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Validation Error</AlertDialogTitle>
                        <AlertDialogDescription>
                            <ul className="list-disc pl-5 mt-2">
                                {validationErrors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
