import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/ui/appSideBar";
import { Navbar } from "../components/ui/navbar";



export function SidebarHelper() {

    return (
        <SidebarProvider>
            <AppSidebar></AppSidebar>

            <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            </div>
        </SidebarProvider>
    )
}