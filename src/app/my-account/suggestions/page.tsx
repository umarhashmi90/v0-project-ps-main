'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { GlowingInput } from "@/components/ui/glowing-input";
import { Label } from "@/components/ui/label";
import { GlowingTextarea } from "@/components/ui/glowing-textarea";
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function SuggestionsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata.full_name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a suggestion.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('suggestions')
      .insert({ 
        title: title, 
        details: details,
        user_id: user.id,
      });

    setLoading(false);
    if (error) {
      toast({
        title: "Error submitting suggestion",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Thank you! Your suggestion has been submitted.",
      });
      setTitle('');
      setDetails('');
    }
  };

  return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-headline">
                    Share a Suggestion
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Have an idea to improve our service? We'd love to hear it!
                </p>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="full-name">Full Name</Label>
                            <GlowingInput 
                                id="full-name" 
                                className="mt-2" 
                                value={fullName}
                                readOnly
                                disabled
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email Address</Label>
                            <GlowingInput 
                                id="email" 
                                type="email"
                                className="mt-2" 
                                value={email}
                                readOnly
                                disabled
                            />
                        </div>
                    </div>
                     <div>
                        <Label htmlFor="suggestion-title">Suggestion Title</Label>
                        <GlowingInput 
                            id="suggestion-title" 
                            placeholder="e.g., Add a new product category" 
                            className="mt-2" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                     <div>
                        <Label htmlFor="suggestion-details">Details</Label>
                        <GlowingTextarea 
                            id="suggestion-details" 
                            placeholder="Please describe your suggestion in detail..." 
                            className="mt-2 min-h-32" 
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                     <Button type="submit" size="lg" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {loading ? 'Submitting...' : 'Submit Suggestion'}
                    </Button>
                </div>
            </form>
        </div>
  );
}
