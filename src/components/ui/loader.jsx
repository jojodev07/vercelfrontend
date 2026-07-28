import React from "react";
import { BounceLoader } from "react-spinners";

export function LoaderComponent() {

    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <BounceLoader color="#fefefe"/>
        </div>
    )
}