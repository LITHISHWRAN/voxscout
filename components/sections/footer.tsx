import { Phone } from "lucide-react";

const productLinks = ["Features", "Pricing", "Integrations", "API"];
const companyLinks = ["About", "Blog", "Careers", "Contact"];
const legalLinks = ["Privacy", "Terms", "Security", "Compliance"];

export function Footer() {
  return (
    <footer className="border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">VoxScout</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered recruitment automation for modern hiring teams.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {productLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {legalLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 VoxScout. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
