import React, { useContext } from "react";
import { Button } from "./button";
import { Badge } from "./badge"
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { LogOut } from "../../axiosServices/axiosHelper";
import { School } from 'lucide-react';

export function Navbar() {

    const {isAuthenticated, loading, userEmail, setUserEmail, setName} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {

        try {  
            LogOut();
            // if success:
            setUserEmail(null);
            setName(null);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <nav className="w-screen flex items-center justify-around h-14  border-b border-gray-800 font-['Noto_Sans_Arabic_Variable']">
            <div className="font-semibold flex gap-2">
                <span className="tracking-tight text-base">المعلم الخبير</span>
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
                    <Button size={'lg'} variant="outline" className="cursor-pointer font-['Noto_Sans_Arabic_Variable']" onClick={handleLogOut}>سجل الخروج</Button>
                <Badge variant="destructive" className="dark:bg-green-800 dark:text-green-300 bg-green-200 text-green-800">{userEmail}</Badge>
            </div>
            }
        </nav>
    )
}