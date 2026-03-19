import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, MessageSquare, Clock, BarChart3, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Screen hundreds of candidates simultaneously. No more waiting days for initial responses.",
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description:
      "Advanced AI that understands context, handles objections, and adapts to candidate responses.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Reach candidates across time zones. AI works around the clock to connect with talent.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description:
      "Get insights on candidate quality, response rates, and screening effectiveness.",
  },
  {
    icon: Shield,
    title: "Compliant & Secure",
    description:
      "GDPR compliant with enterprise-grade security. Your candidate data is protected.",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Conduct interviews in 50+ languages. Expand your talent pool globally.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <Badge className="mb-4" variant="secondary">Features</Badge>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Everything You Need to Scale Recruitment
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Powerful features designed to streamline your hiring process
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
                <CardContent className="px-0">{feature.description}</CardContent>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
