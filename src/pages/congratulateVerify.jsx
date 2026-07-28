import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { NavLink } from 'react-router-dom';

export default function VerificationSuccessPage() {
  return (
    <div className="w-full flex items-center justify-center bg-slate-50 dark:bg-background p-4 py-12">
      <Card className="w-full max-w-md text-center shadow-lg border-slate-200 dark:border-slate-800">
        <CardHeader className="space-y-3 pb-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Email Verified!
          </CardTitle>
          <CardDescription className="text-base text-slate-600 dark:text-slate-400">
            Thank you for verifying your email address. Your account is now fully active and ready to go.
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-6">
          <div className="rounded-lg bg-slate-100 dark:bg-slate-900 p-4 text-sm text-slate-600 dark:text-slate-400">
             You now have full access to all features and account settings.
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
            <NavLink to={"/"} className="w-full">
          <Button className="w-full h-11 text-base font-medium rounded-full">
            <span className="flex items-center justify-center gap-1">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />                
            </span>
          </Button>
            </NavLink>
        </CardFooter>
      </Card>
    </div>
  );
}