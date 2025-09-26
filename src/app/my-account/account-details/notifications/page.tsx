'use client';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function NotificationsPage() {
  return (
      <div>
        <div className="mb-8">
            <h2 className="text-xl font-bold tracking-tight text-foreground font-headline">
                Notifications
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
                Manage how you receive notifications.
            </p>
        </div>
        
        <form>
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <div className="md:text-right">
                        <Label>Communication</Label>
                        <p className="text-xs text-muted-foreground mt-1">Select how you want to receive updates.</p>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="email-notifications" defaultChecked />
                            <Label htmlFor="email-notifications">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="push-notifications" />
                            <Label htmlFor="push-notifications">Push notifications</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="sms-notifications" />
                            <Label htmlFor="sms-notifications">Text messages (SMS)</Label>
                        </div>
                    </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <div className="md:text-right">
                        <Label>Product Updates</Label>
                         <p className="text-xs text-muted-foreground mt-1">Receive news about new features and products.</p>
                    </div>
                    <div className="md:col-span-2 flex items-center space-x-2">
                         <Switch id="product-updates" defaultChecked />
                         <Label htmlFor="product-updates">Enable product updates</Label>
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
