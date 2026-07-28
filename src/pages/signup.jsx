import React from "react";
import axios from 'axios';
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
    baseURL:"http://localhost:8080",
    timeout:10000,
    headers : {
        "Content-Type":"application/json"
    },
    withCredentials:true
})

const register = async (signUpData) => {
    const result = axiosInstance.post("/auth/sign-up", signUpData);
    return result;
}

function getAxiosError(error) {
    const errorObj = {};
    const errData = error.response.data;
    errorObj.email = errData.message;
    return errorObj;
}

export function Signup() {

    const [name, useName] = useState("");
    const [email, useEmail] = useState("");
    const [password, usePassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    // This is for local login, should refuse empty/missing transfer objects so they don't reach the backend.
    const validateBlank = () => {

        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required.";
        if (!email.trim()) newErrors.email = "Email is required.";
        if (!password.trim()) newErrors.password = "Password is required.";
        return newErrors;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateBlank();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log({name,email, password});
            
            try {
                // register user.
                const result = await register({name, email, password});
                console.log(result);
                navigate(`/signup-finish?token=${result.data.promptUUID}`);


            } catch (error) {
                console.log(error);
                console.log(error.response.data);
                // simple error handling: (email is used)
                const returnedError = getAxiosError(error);
                setErrors(returnedError);
            }
        }
    }

    return (
        <div className="flex justify-center items-center bg-background px-4 py-12">
            <Card className="max-w-md w-full shadow-lg">

                <CardHeader className="space-y-1">
                    <CardTitle className="font-bold text-2xl tracking-tight text-center box-border">Sign Up</CardTitle>
                    <CardDescription className="text-center">
                        Enter your new account credentials
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={(e) => {handleSubmit(e)}} className="space-y-4 p-4 pt-0" noValidate>
                        {errors.name && (<p className="font-light text-sm tracking-tight text-red-500">{errors.name}</p>)}
                        {errors.email && (<p className="font-light text-sm tracking-tight text-red-500">{errors.email}</p>)}
                        {errors.password && (<p className="font-light text-sm tracking-tight text-red-500">{errors.password}</p>)}
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Your name here"
                                value={name}
                                onChange={(e) => useName(e.target.value)}
                            >
                            </Input>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => useEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="**********"
                                value={password}
                                onChange={(e) => usePassword(e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="w-full mt-2">
                            Sign In
                        </Button>
                    </form>
                </CardContent>

                <CardFooter>
                    <NavLink to={"http://localhost:8080/oauth2/login/google"} className={"w-full px-4"}>
                        <Button 
                            type="button"
                            variant="outline" 
                            className="w-full flex items-center justify-center gap-2 rounded-full"
                            onClick={() => {}}
                        >
                            <svg className="h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://w3.org" viewBox="0 0 488 512">
                                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                            </svg>
                            Sign up with Google
                    </Button>
                    </NavLink>
                </CardFooter>
            </Card>

        </div>
    )
}