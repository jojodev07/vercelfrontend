import React, { useContext } from "react";
import { Button } from "./button";
import { Badge } from "./badge"
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/DarkModeContext";
import { LogOut } from "../../axiosServices/axiosHelper";
import { School } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {

    const {isAuthenticated, loading, userEmail, setUserEmail, setName} = useContext(AuthContext);
    const {isDarkMode, toggleTheme} = useContext(ThemeContext);
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
                    <Button size={'lg'} variant="outline" className="cursor-pointer">سجل الدخول</Button>
                </NavLink>
                <NavLink to={"/signup"}>
                    <Button size={'lg'} variant="outline" className="cursor-pointer">حساب جديد</Button>
                </NavLink>
            </div> ) :
            <div className="flex gap-4 items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger render={
                            <Badge
                                render={<button type="button" />}
                                variant="destructive"
                                className="cursor-pointer bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-300"
                            >
                                {userEmail}
                            </Badge>
                            }>
                        </DropdownMenuTrigger>
                          <DropdownMenuContent className="font-['Noto_Sans_Arabic_Variable']">
                            <DropdownMenuItem onClick={handleLogOut}>تسجيل الخروج</DropdownMenuItem>
                            <DropdownMenuItem onClick={toggleTheme}>{
                                isDarkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
            </div>
            }
        </nav>
    )
}