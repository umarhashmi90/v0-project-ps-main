'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CountrySelect } from "@/components/ui/country-select";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function BillingPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const metadata = user.user_metadata;
      setCountry(metadata?.billing_country || '');
      setAddress(metadata?.billing_address || '');
      setAddress2(metadata?.billing_address2 || '');
      setCity(metadata?.billing_city || '');
      setZip(metadata?.billing_zip || '');
      setPhone(metadata?.billing_phone || '');
      setLoading(false);
    }
  }, [user]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.auth.updateUser({
      data: {
        billing_country: country,
        billing_address: address,
        billing_address2: address2,
        billing_city: city,
        billing_zip: zip,
        billing_phone: phone,
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
        description: "Your billing address has been updated.",
      });
    }
  };

  if (loading) {
    return (
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-6 w-64 mb-8" />
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                 <Skeleton className="h-4 w-20 md:ml-auto" />
                 <div className="md:col-span-2">
                     <Skeleton className="h-10 w-full" />
                 </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                 <Skeleton className="h-4 w-20 md:ml-auto" />
                 <div className="md:col-span-2 space-y-4">
                     <Skeleton className="h-10 w-full" />
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
                Billing Address
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
                Update your billing address here.
            </p>
        </div>
        
        <form onSubmit={handleSaveChanges}>
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <Label htmlFor="country" className="md:text-right">Country / Region</Label>
                    <div className="md:col-span-2">
                        <CountrySelect value={country} onValueChange={setCountry} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <Label className="md:text-right">Address</Label>
                    <div className="md:col-span-2 space-y-4">
                        <Input id="address" placeholder="Street address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        <Input id="address-2" placeholder="Apartment, suite, etc. (optional)" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <Label className="md:text-right">City & ZIP Code</Label>
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input id="city" placeholder="Town / City" value={city} onChange={(e) => setCity(e.target.value)} />
                        <Input id="zip" placeholder="ZIP Code" value={zip} onChange={(e) => setZip(e.target.value)} />
                    </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <Label htmlFor="phone" className="md:text-right">Phone</Label>
                    <div className="md:col-span-2">
                        <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
