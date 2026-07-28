import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Navigate, useSearchParams, NavLink } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const axiosInstance = axios.create({
    baseURL:"http://localhost:8080",
    timeout:10000,
    headers : {
        "Content-Type":"application/json"
    },
    withCredentials:true
})

export function RegisterSuccess() {

  const [searchParams] = useSearchParams();
  const urlToken = searchParams.get('token');
  const [status, setStatus] = useState('loading'); // loading || success || error

  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState('idle'); // 'idle' | 'success' | 'error'

  useEffect(() => {

    async function validateToken() {

      if (!urlToken) return;

      try {
          const response = await axiosInstance.get("/auth/redis/verify-opaque", {
            params: {
              token: urlToken,
          }
        })
        console.log(response);

        if (response.data === null) {
          setStatus("error");
          return;
        }

        setStatus("success");

      } catch (error) {
        console.log(error);
        setStatus("error");
      }

      }

      validateToken();
} , [urlToken]);

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendStatus('idle');
    
    try {
      // Replace this mock with your actual authentication API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(urlToken);
      setResendStatus('success');
    } catch (error) {
      setResendStatus('error');
    } finally {
      setIsResending(false);
    }
  };

  if (status === "error") {
    return (
      <Navigate to="/signup"></Navigate>
    )
  }

  if (status === "loading") {
    return (
      <div className='flex min-h-[calc(100dvh-3.5rem)] w-full overflow-x-hidden items-center justify-center dark:bg-background'>
        <Card className="w-full max-w-md shadow-lg dark:border-slate-800 min-h-100"></Card>
      </div>
    )
  }

  if (status === "success") {
    return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] w-full overflow-x-hidden items-center justify-center bg-slate-50 p-4 dark:bg-background">
      <Card className="w-full max-w-md border-slate-200/80 shadow-lg dark:border-slate-800">
        <CardHeader className="text-center">
          {/* Success Checkmark Badge */}
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Account created!
          </CardTitle>
          <CardDescription className="text-sm text-slate-500 dark:text-slate-400">
            You're almost there. Let's verify your email address.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          {/* Pulsing Mail Icon */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-50/50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
            <Mail className="h-12 w-12 animate-pulse" />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              We sent a confirmation link to your email.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Please click the link in that email to securely activate your profile and get started.
            </p>
          </div>

          {/* Success Banner */}
          {resendStatus === 'success' && (
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 py-2 px-3 rounded-lg inline-block">
              New link sent successfully! Check your inbox.
            </p>
          )}
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-center border-t border-slate-100 px-6 py-4 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <span>Didn't receive the email?</span>
            <Button
              variant="link"
              onClick={handleResendEmail}
              disabled={isResending}
              className="group h-auto p-0 text-sm font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {isResending ? (
                <span className="flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-0.5">
                  Click here
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
  }

}