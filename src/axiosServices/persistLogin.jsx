import { useState, useEffect, useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { VerifyAuthToken } from './axiosHelper';

const PersistLogin = () => {
    const {isAuthenticated, isLoading} = useContext(AuthContext);
    if (!isAuthenticated) {
        return <Navigate to={"/login"} replace></Navigate>;
    } else {
        return <Outlet></Outlet>;
    }
};

export default PersistLogin;