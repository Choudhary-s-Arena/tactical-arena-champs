import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const termsSections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using our platform, you agree to be bound by these Terms of Service. If you do not agree with any part of the terms, you may not use our services."
  },
  {
    id: "eligibility",
    title: "2. User Eligibility & Accounts",
    content:
      "You must be at least 16 years old to participate. All users must register with a valid BGMI ID and provide accurate account details."
  },
  {
    id: "rules",
    title: "3. Tournament Participation Rules",
    content:
      "All participants are expected to follow fair play guidelines. Any form of cheating, including use of third-party tools, will result in disqualification."
  },
  {
    id: "ipr",
    title: "4. Intellectual Property Rights",
    content:
      "All content and materials provided are owned by the tournament platform unless otherwise stated. Reproduction is prohibited without permission."
  },
  {
    id: "liability",
    title: "5. Disclaimers & Limitations of Liability",
    content:
      "We are not liable for any damages or losses resulting from participation or technical issues beyond our control."
  },
  {
    id: "indemnification",
    title: "6. Indemnification",
    content:
      "Users agree to indemnify and hold harmless the platform from any claims or damages arising from misuse or violations."
  },
  {
    id: "privacy",
    title: "7. Privacy Policy",
    content:
      "Please refer to our Privacy Policy for details on how we handle your data."
  },
  {
    id: "prizes",
    title: "8. Prize & Payment Terms",
    content:
      "Eligible winners must provide valid details for prize distribution. Taxes may be applicable as per law."
  },
  {
    id: "termination",
    title: "9. Termination of Service",
    content:
      "Accounts may be suspended or terminated for violation of these terms or misconduct."
  },
  {
    id: "dispute",
    title: "10. Dispute Resolution & Governing Law",
    content:
      "Any disputes shall be resolved through arbitration under local jurisdiction."
  },
  {
    id: "updates",
    title: "11. Changes to Terms",
    content:
      "We reserve the right to update these terms. Continued use after updates implies acceptance."
  },
  {
    id: "contact",
    title: "12. Contact Information",
    content:
      "For legal inquiries, contact legal@tacticalarena.gg."
  }
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-background pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-tactical-teal to-electric-blue bg-clip-text text-transparent">
            Operational Directives
          </h1>
          <p className="text-muted-foreground text-lg slide-in-tactical">
            Welcome to our platform. These directives outline the terms governing your participation in our tournaments and use of our services. Please review them carefully to ensure a fair and consistent experience for all combatants.
          </p>
          <p className="text-sm text-muted-foreground">Last Updated: July 31, 2025</p>
        </div>

        {/* Key Highlights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-electric-blue">Key Highlights</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-foreground space-y-2">
            <ul className="list-disc pl-5">
              <li className="text-neon-green">Minimum age and verified BGMI ID required</li>
              <li className="text-destructive">Cheating or toxic behavior results in a permanent ban</li>
              <li className="text-neon-green">Claim prizes via valid submission and within deadlines</li>
              <li className="text-destructive">Misuse may lead to account termination</li>
              <li className="text-neon-green">Arbitration in case of disputes</li>
            </ul>
            <p className="text-muted-foreground text-xs italic">
              This is a summary only. The full Terms below govern your usage.
            </p>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
          {/* Sticky Sidebar */}
          <div className="space-y-2 sticky top-24 self-start hidden md:block">
            <h2 className="text-sm font-semibold text-muted-foreground">Navigate</h2>
            <ul className="space-y-1 text-sm">
              {termsSections.map(section => (
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

          {/* Terms Section */}
          <ScrollArea className="space-y-6">
            {termsSections.map(section => (
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
