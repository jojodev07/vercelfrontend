import React, { useContext } from "react";
import { BounceLoader } from "react-spinners";
import { ThemeContext } from "../../contexts/DarkModeContext";

export function LoaderComponent() {

    const {isDarkMode} = useContext(ThemeContext);

    return (
        <div className="flex w-screen h-screen justify-center items-center">
            {isDarkMode ? 
                <BounceLoader color="#fefefe"/> :
                <BounceLoader color="#010101"/>}
        </div>
    )
}