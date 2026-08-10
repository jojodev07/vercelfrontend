import React, {useContext} from "react";
import axios from 'axios';
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, NavLink } from 'react-router-dom';
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "../components/ui/label"
import { Separator } from "../components/ui/separator"
import { Input } from "../components/ui/input"

const axiosInstance = axios.create({
    baseURL:"https://springbackend-zei7.onrender.com",
    timeout:10000,
    headers : {
        "Content-Type":"application/json"
    },
    withCredentials:true
})


export function Login() {

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    const validateBlank = () => {
        const errors = {};
        if (!email.trim()) errors.email = "Email is required.";
        if (!password.trim()) errors.password = "Password is required";

        return errors;
    }

    const handleSubmit = async (e) => {
        // for local login
        e.preventDefault();
        const validated = validateBlank();
        setErrors(validated);

        if (Object.keys(validated).length > 0) {
            return;
        }

        try {
            const res = await axiosInstance.post("/auth/login", {email, password}); // loginData contains .email and .password.
            // Check whether we Have a jwt or a uuid. (Can't have both!)
            if (res.data.promptUUID) {
                    navigate(`/signup-finish?token=${res.data.promptUUID}`);
            } else {
                    // Handle successful JWT login here
                    console.log("Login successful, JWT received:", res.data.jwtToken);
                    auth.setUserEmail(res.data.email);
                    auth.setName(res.data.name);
                    navigate('/');
                }

            console.log(res);
        } catch (err) {

            console.log(err);                 // AxiosError
            console.log(err.response.status); // 401
            console.log(err.response.data);   // JSON body from your Spring app
            console.log(err.response.headers);

            
        }
    }

    const handleGoogleLogin = () => {
        // for future google logic
        console.log("Still not implemented!");
    }

    return (
        <div className="flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <Card className="max-w-md w-full shadow-lg">

                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Welcome Back!
                    </CardTitle>
                    <CardDescription>
                        Enter your email and password to log in to your account
                    </CardDescription>
                </CardHeader>

                <CardContent className="my-4">
                    {(errors.email != null && errors.password != null) &&
                        <p className="text-left text-lg text-red-500 tracking-tighter font-medium box-border p-2 pl-0">
                            ⓘ&ensp;All fields are required!</p>}
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </div>

            
                        <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Button 
                            type="button"
                            variant="link" 
                            className="px-0 font-normal text-xs text-muted-foreground hover:text-primary"
                            onClick={() => console.log("Redirect to forgot password")}
                            >
                            Forgot password?
                            </Button>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        </div>

                        <Button type="submit" className="w-full mt-2">
                                    Sign In
                        </Button>
                        <NavLink to={"http://localhost:8080/oauth2/login/google"}>
                            <Button 
                                type="button"
                                variant="outline" 
                                className="w-full flex items-center justify-center gap-2"
                                onClick={handleGoogleLogin}
                            >
                                <svg className="h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://w3.org" viewBox="0 0 488 512">
                                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                </svg>
                                Continue with Google
                            </Button>
                        </NavLink>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-wrap items-center justify-center gap-1 text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Button 
                        type="button"
                        variant="link" 
                        className="p-0 font-medium text-primary hover:underline cursor-pointer"
                        onClick={() => console.log("Redirect to registration")}
                    >
                        Create an account
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
