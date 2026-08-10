import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../axiosServices/axiosHelper";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    // server cannot read JWT Cookie
    const [userEmail, setUserEmail] = useState(null); // userEmail || null;
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(true);

    // will automatically change on new render.
    // once JWT authentication goes by smoothly, an email is given to the frontend.
    // this determines the authentication state of the entire app.
    const isAuthenticated = !!userEmail;
    useEffect(() => {

        const verifyAuthState = async () => {

            try {
                const result = await axiosInstance.get("/auth/me");

                if (result) {
                    setUserEmail(result.data.email);
                    setName(result.data.name);

                }
            } catch (err) {
                console.log(err) // for now
            } finally {
                setLoading(false);
            }
        }

        verifyAuthState();
    } , [])

    return (
        <AuthContext.Provider
            value={{userEmail, name, loading, isAuthenticated, setName, setUserEmail}}>
                {children}
        </AuthContext.Provider>
    );
}