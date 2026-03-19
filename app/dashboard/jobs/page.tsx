import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Briefcase, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function JobsPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Jobs" }
        ]}
      />
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your job postings and recruitment campaigns
            </p>
          </div>
          <Button>
            <Plus className="mr-2 size-4" />
            Create Job
          </Button>
        </div>

        <div className="rounded-lg border bg-card p-12 text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-muted">
            <Briefcase className="size-10 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No jobs yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Get started by creating your first job posting
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 size-4" />
            Create Your First Job
          </Button>
        </div>
      </main>
    </div>
  );
}
