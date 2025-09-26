'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { ArrowRight, User, CreditCard } from "lucide-react";

const dashboardCards = [
    {
        title: "My Account",
        description: "Edit your name or change your password.",
        href: "/my-account/account-details",
        icon: <User className="h-8 w-8 text-primary" />,
    },
    {
        title: "Billing Address",
        description: "Setup your billing address.",
        href: "/my-account/billing",
        icon: <CreditCard className="h-8 w-8 text-primary" />,
    }
]

export default function MyAccountPage() {
  const { user } = useAuth();

  return (
    <div>
        <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-headline">
                Welcome, {user?.user_metadata.full_name || user?.email?.split('@')[0]}!
            </h1>
            <p className="mt-2 text-muted-foreground">
                From your dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
            </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dashboardCards.map((card) => (
                <Link href={card.href} key={card.title} className="group">
                    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/20 bg-gray-50/50">
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4 sm:p-6">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                {card.icon}
                            </div>
                            <div className="flex-1">
                                <CardTitle className="font-headline text-base sm:text-lg">{card.title}</CardTitle>
                                <CardDescription className="text-xs sm:text-sm">{card.description}</CardDescription>
                            </div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
        
        <div className="mt-12">
            <h2 className="text-2xl font-bold font-headline mb-4">Your Products</h2>
            <Card className="bg-gray-50/50">
                <CardContent className="p-6">
                     <p className="text-muted-foreground">You haven't purchased any products yet.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
