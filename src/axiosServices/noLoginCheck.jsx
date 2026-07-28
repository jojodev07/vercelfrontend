import { useState, useEffect, useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import { VerifyAuthToken } from './axiosHelper';

const NoLoginCheck = () => {
    const {isAuthenticated, isLoading} = useContext(AuthContext);
    if (!isAuthenticated) {
        return <Navigate to={"/login"} replace></Navigate>
    }

    if (isLoading) return <></>;
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default NoLoginCheck;