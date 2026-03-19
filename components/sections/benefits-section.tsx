import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, TrendingUp, Users } from "lucide-react";

const benefits = [
  {
    title: "Save 80% of Screening Time",
    description:
      "Eliminate hours of manual phone screening. Focus on interviewing top candidates.",
  },
  {
    title: "Consistent Quality",
    description:
      "Every candidate gets the same professional experience. No more inconsistent screening.",
  },
  {
    title: "Scale Effortlessly",
    description:
      "Handle 10 or 10,000 candidates with the same ease. Grow without hiring more recruiters.",
  },
  {
    title: "Data-Driven Decisions",
    description:
      "Get actionable insights and analytics to continuously improve your hiring process.",
  },
];

const metrics = [
  { label: "Time Saved", value: "80%", width: "80%" },
  { label: "Candidate Response Rate", value: "95%", width: "95%" },
  { label: "Cost Reduction", value: "65%", width: "65%" },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="container mx-auto px-4 py-20 bg-primary/5 rounded-3xl my-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Badge className="mb-4" variant="secondary">Benefits</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Transform Your Recruitment Process
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Save time, reduce costs, and hire better candidates with AI-powered automation.
          </p>

          <div className="space-y-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <Card className="p-8 border-2">
            <div className="space-y-6">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <span className="text-2xl font-bold text-primary">{metric.value}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full"
                      style={{ width: metric.width }}
                    />
                  </div>
                </div>
              ))}

              <div className="pt-6 border-t">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">3.5x</div>
                    <div className="text-sm text-muted-foreground">Faster Hiring</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm text-muted-foreground">Companies Trust Us</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
