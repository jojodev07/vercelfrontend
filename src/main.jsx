import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext.jsx';
import '@fontsource-variable/noto-sans-arabic/index.css';
import './index.css'
import App from './App.jsx'
import { RootLayout } from './pages/rootLayout.jsx';
import {Login} from './pages/login.jsx'
import { Signup } from './pages/signup.jsx';
import { RegisterSuccess } from './pages/registerSuccess.jsx';
import PersistLogin from './axiosServices/persistLogin.jsx';
import NoLoginCheck from './axiosServices/noLoginCheck.jsx';
import VerificationSuccessPage from './pages/congratulateVerify.jsx';
import { ThemeProvider } from './contexts/DarkModeContext.jsx';
import { OfficialFiles } from './pages/officialfiles.jsx';
import { SidebarHelper } from './axiosServices/sidebarhelper.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route element={<PersistLogin/>}>
              <Route element={<SidebarHelper/>}>
                <Route index element={<App />}/>
                <Route path="/files" element={<OfficialFiles/>} />
              </Route>
            </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signup-finish" element={<RegisterSuccess />} />
              <Route path="/congratulate" element={<VerificationSuccessPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>
);