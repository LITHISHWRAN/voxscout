'use client';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function CTASection() {
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
    <section className="container mx-auto px-4 py-20">
      <Card className="bg-linear-to-r from-primary to-primary/80 text-primary-foreground border-0">
        <CardHeader className="text-center py-16 px-4">
          <CardTitle className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Recruitment?
          </CardTitle>
          <CardDescription className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies using VoxScout to automate candidate screening and hire faster.
          </CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg"
              onClick={handleStartFreeTrial}
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/80 mt-6">
            No credit card required &bull; 14-day free trial &bull; Cancel anytime
          </p>
        </CardHeader>
      </Card>
    </section>
  );
}
