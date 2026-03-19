import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Phone, MessageSquare, Calendar } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Import Candidates",
    description: "Upload your candidate list via CSV, Excel, or integrate with your ATS",
  },
  {
    icon: Phone,
    title: "AI Calls Automatically",
    description: "Our AI voice agent calls candidates at optimal times with natural conversation",
  },
  {
    icon: MessageSquare,
    title: "Conducts Screening",
    description: "AI asks relevant questions, evaluates responses, and assesses candidate fit",
  },
  {
    icon: Calendar,
    title: "Schedules Interviews",
    description: "Automatically books qualified candidates for interviews with your team",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="container mx-auto px-4 py-20 bg-muted/30 rounded-3xl my-20">
      <div className="text-center mb-16">
        <Badge className="mb-4" variant="secondary">How It Works</Badge>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple 4-Step Process</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          From candidate import to interview scheduling, everything is automated
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card key={step.title} className="relative border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {index + 1}
                </div>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
