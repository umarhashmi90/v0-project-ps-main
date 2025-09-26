"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import Header from "@/components/landing/header";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Loader2, MailCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);
  const { toast } = useToast();

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setEmailSent(true);
    }
  };


  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 pt-24 sm:pt-12">
        <Card className="w-full max-w-md overflow-hidden">
          <div className="bg-white p-4 md:p-8 dark:bg-black">
            {emailSent ? (
              <div className="text-center py-8">
                <MailCheck className="mx-auto h-12 w-12 text-green-500" />
                <h2 className="mt-6 text-xl font-bold text-neutral-800 dark:text-neutral-200">
                  Check your inbox
                </h2>
                <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                  We've sent a password reset link to <span className="font-semibold">{email}</span>.
                </p>
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-800">
                    Please note that it may take a few minutes for the email to arrive. If you don't see it, be sure to check your spam folder.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <h2 className="mt-6 text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    Forgot Your Password?
                  </h2>
                  <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                    Enter your email and we'll send you a link to reset your password.
                  </p>
                </div>

                <form className="my-8" onSubmit={handlePasswordReset}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          placeholder="you@example.com" 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required 
                        />
                    </LabelInputContainer>
                    
                    <button
                      className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] hover-shimmer-button flex items-center justify-center"
                      type="submit"
                      disabled={loading}
                    >
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {loading ? "Sending..." : "Send Reset Link"}
                      <BottomGradient />
                    </button>

                     <p className="mt-8 text-center text-sm text-muted-foreground">
                        Remember your password?{" "}
                        <Link href="/login" className="font-medium text-foreground hover:underline">
                            Sign in
                        </Link>
                    </p>
                </form>
              </>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
