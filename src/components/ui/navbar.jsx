import React, { useContext } from "react";
import { Button } from "./button";
import { Badge } from "./badge"
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { LogOut } from "../../axiosServices/axiosHelper";
import { School } from 'lucide-react';

export function Navbar() {

    const {isAuthenticated, loading, userEmail, setUserEmail} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {

        try {  
            LogOut();
            // if success:
            setUserEmail(null);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <nav className="w-screen flex items-center justify-around h-14  border-b border-gray-800">
            <div className="font-semibold flex gap-2">
                <School></School>
                <span className="tracking-tight text-base">TeachAssist</span>
            </div>

            {!isAuthenticated ?
            
            ( <div className="flex gap-4">
                <NavLink to={"/login"}>
                    <Button size={'lg'} variant="outline" className="cursor-pointer">Login</Button>
                </NavLink>
                <NavLink to={"/signup"}>
                    <Button size={'lg'} variant="outline" className="cursor-pointer">Sign up</Button>
                </NavLink>
            </div> ) :
            <div className="flex gap-4 items-center">
                    <Button size={'lg'} variant="outline" className="cursor-pointer" onClick={handleLogOut}>Log Out</Button>
                <Badge variant="destructive" className="dark:bg-green-800 dark:text-green-300">{userEmail}</Badge>
            </div>
            }
        </nav>
    )
}