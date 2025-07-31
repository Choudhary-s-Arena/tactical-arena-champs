import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const privacySections = [
  {
    id: "info-we-collect",
    title: "1. Information We Collect",
    content:
      "We collect personal data like BGMI ID, username, email, gameplay statistics, and device information to support tournament operations and platform integrity."
  },
  {
    id: "use-of-info",
    title: "2. How We Use Your Information",
    content:
      "Your data helps us manage tournaments, enhance user experience, ensure fair play, communicate updates, and comply with legal obligations."
  },
  {
    id: "info-sharing",
    title: "3. How We Share Your Information",
    content:
      "We do not sell your data. We only share it with verified partners for services like payment, analytics, or legal compliance."
  },
  {
    id: "security",
    title: "4. Data Security",
    content:
      "We employ encryption, secure protocols, and access controls to safeguard your data."
  },
  {
    id: "retention",
    title: "5. Data Retention",
    content:
      "We retain your data only for as long as necessary to fulfill the purposes stated in this policy."
  },
  {
    id: "user-rights",
    title: "6. Your Data Rights",
    content:
      "You have the right to access, correct, or request deletion of your personal data. You may also opt out of certain data uses."
  },
  {
    id: "cookies",
    title: "7. Cookies & Tracking Technologies",
    content:
      "We use cookies to understand platform usage, but you can control them via your browser settings."
  },
  {
    id: "children",
    title: "8. Children's Privacy",
    content:
      "Users under 16 must have parental consent to use our services. We do not knowingly collect data from children without permission."
  },
  {
    id: "international",
    title: "9. International Data Transfers",
    content:
      "If applicable, your data may be processed outside your country with adequate protection."
  },
  {
    id: "external-links",
    title: "10. Links to Other Websites",
    content:
      "Our platform may contain links to third-party websites. We are not responsible for their content or privacy practices."
  },
  {
    id: "changes",
    title: "11. Changes to This Policy",
    content:
      "We may update this policy. Continued use of our services after changes indicates acceptance."
  },
  {
    id: "contact",
    title: "12. Contact Us",
    content:
      "For any privacy-related concerns, contact us at privacy@tacticalarena.gg."
  }
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-tactical-teal to-electric-blue bg-clip-text text-transparent">
            Data Security Protocols
          </h1>
          <p className="text-muted-foreground text-lg slide-in-tactical">
            Your privacy is paramount. These protocols detail how your personal data is collected, used, and protected when you engage with our tournament platform. We are committed to safeguarding your information with the utmost diligence.
          </p>
          <p className="text-sm text-muted-foreground">Last Updated: July 31, 2025</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-electric-blue">Key Privacy Commitments</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-foreground space-y-2">
            <ul className="list-disc pl-5">
              <li className="text-electric-blue">We collect minimal data necessary for tournament operations</li>
              <li className="text-electric-blue">Your data is encrypted and access-controlled</li>
              <li className="text-neon-green">Your Data is Never Sold</li>
              <li className="text-electric-blue">You can request, correct, or delete your data at any time</li>
              <li className="text-neon-green">We are committed to full transparency and legal compliance</li>
            </ul>
            <p className="text-muted-foreground text-xs italic">
              This is a summary only. Please read the full policy below.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
          <div className="space-y-2 sticky top-24 self-start hidden md:block">
            <h2 className="text-sm font-semibold text-muted-foreground">Jump To</h2>
            <ul className="space-y-1 text-sm">
              {privacySections.map(section => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="hover:text-electric-blue transition-colors"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <ScrollArea className="space-y-6">
            {privacySections.map(section => (
              <Card key={section.id} id={section.id} className="border bg-card/70 scroll-mt-24">
                <CardHeader>
                  <CardTitle className="text-lg text-tactical-teal font-bold">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground text-sm leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
