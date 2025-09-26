"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrency } from '@/hooks/use-currency';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { PasswordInput } from '../ui/password-input';

interface CartAuthFormProps {
    total: number;
}

export function CartAuthForm({ total }: CartAuthFormProps) {
    const { formatPrice } = useCurrency();
    const { toast } = useToast();
    
    // Login State
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);

    // Signup State
    const [signupFullName, setSignupFullName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupLoading, setSignupLoading] = useState(false);
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: loginEmail,
            password: loginPassword,
        });
        setLoginLoading(false);
        if (error) {
            toast({ title: "Login Error", description: error.message, variant: "destructive" });
        } else {
            toast({ title: "Login Successful!", description: "You are now logged in." });
        }
    };

    const handleSignupAndCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setSignupLoading(true);
        const { error } = await supabase.auth.signUp({
            email: signupEmail,
            password: signupPassword,
            options: {
                data: {
                    full_name: signupFullName,
                },
            },
        });
        setSignupLoading(false);
        if (error) {
            toast({ title: "Signup Error", description: error.message, variant: "destructive" });
        } else {
            toast({ title: "Account Created!", description: "You are now logged in and can proceed." });
        }
    };

    const handleSocialSignIn = async (provider: 'google' | 'facebook') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/cart`
            }
        });
        if (error) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    const BottomGradient = () => {
        return (
          <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
          </>
        );
    };

    return (
        <div>
            <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
            </div>
            <Separator className="my-4" />
            <Tabs defaultValue="signup" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Create Account</TabsTrigger>
                    <TabsTrigger value="login">Log In</TabsTrigger>
                </TabsList>
                
                {/* Signup Form */}
                <TabsContent value="signup">
                    <form onSubmit={handleSignupAndCheckout} className="space-y-4 mt-4">
                        <div>
                            <Label htmlFor="signup-fullname">Full Name</Label>
                            <Input id="signup-fullname" type="text" value={signupFullName} onChange={(e) => setSignupFullName(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="signup-email">Email</Label>
                            <Input id="signup-email" type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="signup-password">Password</Label>
                            <PasswordInput id="signup-password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
                        </div>
                        <Button type="submit" size="lg" className="w-full bg-black text-white hover:bg-gray-800 text-base" disabled={signupLoading}>
                            {signupLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Continue to checkout
                        </Button>
                         <div className="my-4 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />

                        <div className="flex flex-col space-y-4">
                            <button
                                className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black"
                                type="button"
                                onClick={() => handleSocialSignIn("google")}
                            >
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-4 w-4">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.42-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                                </svg>
                                <span className="text-sm text-neutral-700">Continue with Google</span>
                                <BottomGradient />
                            </button>
                            <button
                                className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black"
                                type="button"
                                onClick={() => handleSocialSignIn("facebook")}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" className="h-4 w-4">
                                <path fill="#1877F2" d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.69H8.031v-2.822h2.474v-2.18c0-2.45,1.445-3.813,3.695-3.813c1.066,0,2.168,0.198,2.168,0.198v2.384h-1.215c-1.215,0-1.613,0.766-1.613,1.551v1.86h2.64l-0.424,2.822h-2.216v7.22C18.252,21.243,22,17.07,22,12C22,6.477,17.523,2,12,2z"></path>
                                </svg>
                                <span className="text-sm text-neutral-700">Continue with Facebook</span>
                                <BottomGradient />
                            </button>
                        </div>
                    </form>
                </TabsContent>

                {/* Login Form */}
                <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4 mt-4">
                        <div>
                            <Label htmlFor="login-email">Email</Label>
                            <Input id="login-email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <Label htmlFor="login-password">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-medium text-muted-foreground hover:text-foreground"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <PasswordInput id="login-password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                        </div>
                        <Button type="submit" size="lg" className="w-full bg-black text-white hover:bg-gray-800 text-base" disabled={loginLoading}>
                            {loginLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Log In & Continue
                        </Button>
                         <div className="my-4 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />

                         <div className="flex flex-col space-y-4">
                            <button
                                className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black"
                                type="button"
                                onClick={() => handleSocialSignIn("google")}
                            >
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-4 w-4">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.42-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                                </svg>
                                <span className="text-sm text-neutral-700">Continue with Google</span>
                                <BottomGradient />
                            </button>
                            <button
                                className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black"
                                type="button"
                                onClick={() => handleSocialSignIn("facebook")}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" className="h-4 w-4">
                                <path fill="#1877F2" d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.69H8.031v-2.822h2.474v-2.18c0-2.45,1.445-3.813,3.695-3.813c1.066,0,2.168,0.198,2.168,0.198v2.384h-1.215c-1.215,0-1.613,0.766-1.613,1.551v1.86h2.64l-0.424,2.822h-2.216v7.22C18.252,21.243,22,17.07,22,12C22,6.477,17.523,2,12,2z"></path>
                                </svg>
                                <span className="text-sm text-neutral-700">Continue with Facebook</span>
                                <BottomGradient />
                            </button>
                        </div>
                        <p className="text-xs text-center text-gray-500">
                            Don't have an account? Go to the <Link href="/signup" className="underline hover:text-primary">Sign Up page</Link>.
                        </p>
                    </form>
                </TabsContent>
            </Tabs>
        </div>
    );
}
