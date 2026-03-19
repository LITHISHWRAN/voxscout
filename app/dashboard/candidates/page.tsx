import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Users, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function CandidatesPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Candidates" }
        ]}
      />
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
            <p className="mt-2 text-muted-foreground">
              View and manage your candidate database
            </p>
          </div>
          <Button>
            <UserPlus className="mr-2 size-4" />
            Add Candidate
          </Button>
        </div>

        <div className="rounded-lg border bg-card p-12 text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-muted">
            <Users className="size-10 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No candidates yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Start building your candidate database
          </p>
          <Button className="mt-4">
            <UserPlus className="mr-2 size-4" />
            Add Your First Candidate
          </Button>
        </div>
      </main>
    </div>
  );
}
