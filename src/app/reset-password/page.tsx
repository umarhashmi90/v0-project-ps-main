"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/landing/header";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/ui/password-input";

export default function ResetPasswordPage() {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);

    // Mock functionality
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Success!",
        description: "Your password has been reset successfully. Please log in.",
      });
      router.push("/login");
    }, 1000);
  };


  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 pt-24 sm:pt-12">
        <Card className="w-full max-w-md overflow-hidden">
          <div className="bg-white p-4 md:p-8 dark:bg-black">
              <div className="text-center">
                <h2 className="mt-6 text-xl font-bold text-neutral-800 dark:text-neutral-200">
                  Reset Your Password
                </h2>
                <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                  Enter your new password below.
                </p>
              </div>

              <form className="my-8" onSubmit={handlePasswordReset}>
                  <LabelInputContainer className="mb-4">
                      <Label htmlFor="password">New Password</Label>
                      <PasswordInput 
                        id="password" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                      />
                  </LabelInputContainer>

                   <LabelInputContainer className="mb-8">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <PasswordInput 
                        id="confirm-password" 
                        placeholder="••••••••" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                      />
                  </LabelInputContainer>
                  
                  <button
                    className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] hover-shimmer-button"
                    type="submit"
                    disabled={loading}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {loading ? "Saving..." : "Save New Password"}
                    <BottomGradient />
                  </button>
              </form>
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
