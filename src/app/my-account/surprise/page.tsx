'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Download, Gift, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Surprise {
    id: string;
    surprise_content: string;
}

export default function SurprisePage() {
    const { user } = useAuth();
    const [surprise, setSurprise] = useState<Surprise | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAndClaimSurprise = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                // Fetch the latest unclaimed surprise
                const { data, error: fetchError } = await supabase
                    .from('surprises')
                    .select('id, surprise_content')
                    .eq('user_id', user.id)
                    .eq('claimed', false)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .single();

                if (fetchError && fetchError.code !== 'PGRST116') { // Ignore 'exact one row' error
                    throw fetchError;
                }

                if (data) {
                    setSurprise(data);

                    // Mark as claimed
                    const { error: updateError } = await supabase
                        .from('surprises')
                        .update({ claimed: true })
                        .eq('id', data.id);
                    
                    if (updateError) {
                        console.error('Error marking surprise as claimed:', updateError);
                        // We still show the surprise even if claiming fails, to not penalize the user.
                    }
                } else {
                    setError("No new surprises available. Check back after your next purchase!");
                }
            } catch (err: any) {
                console.error("Error fetching surprise:", err);
                setError("Could not load your surprise. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchAndClaimSurprise();
    }, [user]);
    
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h2 className="text-xl font-bold">Unwrapping Your Surprise...</h2>
                <p className="text-muted-foreground">Please wait a moment.</p>
            </div>
        )
    }

    if (error) {
         return (
            <div className="flex flex-col items-center justify-center text-center p-8">
                <Gift className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-bold">{error}</h2>
            </div>
        )
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-headline">
                    Your Surprise Reward!
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Thank you for your purchase! Here is your special gift.
                </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border border-purple-200 rounded-xl p-8 text-center flex flex-col items-center">
                 <Gift className="h-16 w-16 text-primary mb-4" />
                 <h2 className="text-2xl font-bold font-headline text-gray-900">1000+ n8n Automation Templates</h2>
                 <p className="mt-2 text-gray-600 max-w-md">Get exclusive access to a massive library of automation templates worth $300, absolutely free!</p>
                 <Button asChild size="lg" className="mt-6 hover-shimmer-button">
                    <Link href="https://drive.google.com/file/d/1gLmlB76MBKDAh2zwU4jBSGH9fZbt7c-N/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-5 w-5" /> Download Now
                    </Link>
                 </Button>
                 <p className="text-xs text-gray-500 mt-3">Link opens in a new tab</p>
            </div>
        </div>
    );
}
