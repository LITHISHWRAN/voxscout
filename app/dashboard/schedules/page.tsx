import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function SchedulesPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Schedules / Interview" }
        ]}
      />
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Schedules / Interview</h1>
            <p className="mt-2 text-muted-foreground">
              Manage interview schedules and appointments
            </p>
          </div>
          <Button>
            <Plus className="mr-2 size-4" />
            Schedule Interview
          </Button>
        </div>

        <div className="rounded-lg border bg-card p-12 text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-muted">
            <Calendar className="size-10 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No interviews scheduled</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Schedule your first interview to get started
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 size-4" />
            Schedule Your First Interview
          </Button>
        </div>
      </main>
    </div>
  );
}
