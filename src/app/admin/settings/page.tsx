// src/app/admin/settings/page.tsx
'use client';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettingsPage() {
    return (
        <div>
            <div className="mb-4">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage your application settings.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>Application-wide settings will appear here.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
