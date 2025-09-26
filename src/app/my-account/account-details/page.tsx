'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { CountrySelect } from "@/components/ui/country-select";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountDetailsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [country, setCountry] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fullName = user.user_metadata?.full_name || '';
      const [fName, ...lNameParts] = fullName.split(' ');
      setFirstName(fName || '');
      setLastName(lNameParts.join(' ') || '');
      setEmail(user.email || '');
      setAvatarUrl(user.user_metadata?.avatar_url || '');
      setCountry(user.user_metadata?.country || ''); 
      setLoading(false);
    }
  }, [user]);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    setUploading(true);

    try {
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      setAvatarUrl(publicUrl);

      toast({
        title: "Success",
        description: "Avatar uploaded successfully.",
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "There was an error uploading your avatar.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: `${firstName} ${lastName}`,
        avatar_url: avatarUrl,
        country: country
      }
    });

    if (error) {
       toast({
        title: "Error saving changes",
        description: error.message,
        variant: "destructive",
      });
    } else {
       toast({
        title: "Success!",
        description: "Your profile has been updated.",
      });
    }
  }
  
  if (loading) {
    return (
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-6 w-64 mb-8" />
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                 <Skeleton className="h-4 w-20 md:ml-auto" />
                 <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <Skeleton className="h-10 w-full" />
                     <Skeleton className="h-10 w-full" />
                 </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                 <Skeleton className="h-4 w-20 md:ml-auto" />
                 <div className="md:col-span-2">
                     <Skeleton className="h-10 w-full" />
                 </div>
            </div>
        </div>
      </div>
    )
  }

  return (
      <div>
        <div className="mb-8">
            <h2 className="text-xl font-bold tracking-tight text-foreground font-headline">
                Personal Info
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
                Update your photo and personal details here.
            </p>
        </div>
        
        <form onSubmit={handleSaveChanges}>
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <Label className="md:text-right">Name</Label>
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <Label htmlFor="email" className="md:text-right">Email</Label>
                    <div className="md:col-span-2">
                        <Input id="email" type="email" value={email} readOnly disabled />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <div className="md:text-right">
                        <Label>Your Photo</Label>
                        <p className="text-xs text-muted-foreground mt-1">This will be displayed on your profile.</p>
                    </div>
                    <div className="md:col-span-2 flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                           <AvatarImage src={avatarUrl} alt={user?.email} />
                           <AvatarFallback>{firstName?.charAt(0)}{lastName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <label htmlFor="photo-upload" className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-6 h-6 mb-2 text-gray-500" />
                                    <p className="mb-1 text-sm text-gray-500 font-semibold">{uploading ? "Uploading..." : "Click to upload or drag and drop"}</p>
                                    <p className="text-xs text-gray-500">PNG or JPG (max. 2MB)</p>
                                </div>
                                <input id="photo-upload" type="file" className="hidden" onChange={handleAvatarUpload} disabled={uploading} accept="image/png, image/jpeg" />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <Label htmlFor="role" className="md:text-right">Role</Label>
                    <div className="md:col-span-2">
                        <Input id="role" defaultValue="Customer" readOnly className="bg-gray-100 cursor-not-allowed" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <Label htmlFor="country" className="md:text-right">Country / Region</Label>
                    <div className="md:col-span-2">
                        <CountrySelect value={country} onValueChange={setCountry} />
                    </div>
                </div>

            </div>

            <div className="mt-8 pt-6 border-t flex justify-end gap-4">
                <Button type="button" variant="outline" size="lg">Cancel</Button>
                <Button type="submit" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">Save changes</Button>
            </div>
        </form>
      </div>
  );
}
