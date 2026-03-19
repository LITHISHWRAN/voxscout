import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Home" }
        ]}
      />
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user.firstName || 'User'}!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Here&apos;s your VoxScout dashboard overview
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Profile Information</h3>
            <div className="mt-4 space-y-2">
              <p className="text-sm">
                <span className="font-medium">Email:</span> {user.emailAddresses[0]?.emailAddress}
              </p>
              <p className="text-sm">
                <span className="font-medium">Name:</span> {user.firstName} {user.lastName}
              </p>
              <p className="text-sm">
                <span className="font-medium">User ID:</span> {user.id}
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Quick Stats</h3>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                Your dashboard statistics will appear here
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                Your recent activities will appear here
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Getting Started</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <div>
                <h4 className="font-medium">Complete Your Profile</h4>
                <p className="text-sm text-muted-foreground">
                  Add more information to your profile to get started
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                2
              </div>
              <div>
                <h4 className="font-medium">Explore Features</h4>
                <p className="text-sm text-muted-foreground">
                  Discover all the features VoxScout has to offer
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                3
              </div>
              <div>
                <h4 className="font-medium">Start Using VoxScout</h4>
                <p className="text-sm text-muted-foreground">
                  Begin your journey with AI-powered voice agents
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
