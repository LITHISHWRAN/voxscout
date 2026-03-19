'use client';

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleSignIn = () => {
    if (isSignedIn) {
      router.push('/dashboard');
    } else {
      router.push('/sign-in');
    }
  };

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/dashboard');
    } else {
      router.push('/sign-up');
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Phone className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold">VoxScout</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</a>
          <a href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">Benefits</a>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            className="hidden sm:inline-flex"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <Button onClick={handleGetStarted}>Get Started</Button>
        </div>
      </div>
    </nav>
  );
}
