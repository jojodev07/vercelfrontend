import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/ui/navbar";
import { LoaderComponent } from "../components/ui/loader";
import { AuthContext, AuthProvider } from "../contexts/AuthContext";
export function RootLayout() {

    const {loading} = useContext(AuthContext);

    if (loading) {
        return <LoaderComponent/>
    } else {
        return (
            <div>
                <Outlet/>
            </div>
        )
    }
}