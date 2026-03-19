'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleStartFreeTrial = () => {
    if (isSignedIn) {
      router.push('/dashboard');
    } else {
      router.push('/sign-up');
    }
  };

  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <Badge className="w-fit" variant="secondary">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Recruitment
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Automate Your Candidate Screening with{" "}
            <span className="text-primary">AI Voice Agents</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Import candidate contacts and let our AI voice agent automatically call, conduct initial
            screening interviews, and schedule follow-ups. Save hours of manual work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg" onClick={handleStartFreeTrial}>
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              Watch Demo
            </Button>
          </div>
          <div className="flex items-center gap-8 pt-4">
            <div>
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-sm text-muted-foreground">Calls Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold">80%</div>
              <div className="text-sm text-muted-foreground">Time Saved</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative bg-linear-to-br from-primary/20 to-primary/5 rounded-3xl p-8 border-2 border-primary/20">
            <div className="space-y-4">
              <div className="bg-background rounded-xl p-6 shadow-lg border animate-fade-in-up">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">AI Agent Calling...</div>
                    <div className="text-sm text-muted-foreground">John Doe</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-primary/10 rounded-lg p-3 text-sm">
                    &ldquo;Hi John, I&apos;m calling regarding the Senior Developer position...&rdquo;
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-sm ml-8">
                    &ldquo;Yes, I&apos;m interested!&rdquo;
                  </div>
                </div>
              </div>
              <div className="bg-background rounded-xl p-6 shadow-lg border animate-fade-in-up animation-delay-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Interview Scheduled</span>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-sm text-muted-foreground">Tomorrow at 2:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
