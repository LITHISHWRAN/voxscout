import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Settings, User, Bell, Shield, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function SettingsPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const settingsSections = [
    {
      icon: User,
      title: "Profile Settings",
      description: "Manage your account information and preferences",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Configure your notification preferences",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Manage your password and security settings",
    },
    {
      icon: CreditCard,
      title: "Billing",
      description: "View and manage your subscription and billing",
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings" }
        ]}
      />
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {settingsSections.map((section) => (
            <Card key={section.title} className="cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                    <section.icon className="size-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {section.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your current account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <div className="text-sm font-medium">Email</div>
              <div className="text-sm text-muted-foreground">
                {user.emailAddresses[0]?.emailAddress}
              </div>
            </div>
            <div className="grid gap-2">
              <div className="text-sm font-medium">Name</div>
              <div className="text-sm text-muted-foreground">
                {user.firstName} {user.lastName}
              </div>
            </div>
            <div className="grid gap-2">
              <div className="text-sm font-medium">User ID</div>
              <div className="text-sm text-muted-foreground font-mono">
                {user.id}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
