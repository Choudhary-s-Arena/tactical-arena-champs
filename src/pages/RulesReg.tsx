import { useState } from 'react';
import { ChevronDown, ChevronUp, FileDown, ShieldCheck, ScrollText, Settings2, Users, Gavel, AlertTriangle, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { saveAs } from 'file-saver';

const ruleSections = [
  {
    id: 'eligibility',
    title: 'General Eligibility & Registration',
    icon: Users,
    content: [
      'Players must be 16+ years old with a valid BGMI ID.',
      'Team roster must include 4–6 players.',
      'Accounts must be level 30+ with Tier Platinum or higher.',
      'Players must register with real details (BGMI ID, contact info).'
    ]
  },
  {
    id: 'game-settings',
    title: 'Game Rules & Settings',
    icon: Settings2,
    content: [
      'Only mobile devices allowed. Emulators are banned.',
      'Map pool includes Erangel, Miramar, Sanhok.',
      'Aim Assist is allowed; Red Zone is disabled.',
      'TTP mode only. FPP will not be used.'
    ]
  },
  {
    id: 'fair-play',
    title: 'Match Conduct & Fair Play',
    icon: AlertTriangle,
    accent: 'text-destructive',
    content: [
      'Cheating, scripting, or third-party tools lead to immediate disqualification.',
      'Stream sniping or ghosting is strictly prohibited.',
      'Toxic communication or harassment will result in bans.',
      'Bug exploitation (e.g., glitch spots) is not allowed.'
    ]
  },
  {
    id: 'disputes',
    title: 'Disputes & Appeals',
    icon: Gavel,
    content: [
      'All disputes must be raised within 30 minutes post-match.',
      'Submit video evidence or screenshots for any claims.',
      'Decisions by tournament admins are final and binding.'
    ]
  },
  {
    id: 'prize',
    title: 'Prize Distribution & Taxation',
    icon: DollarSign,
    content: [
      'Winners will receive prize payouts within 7–10 working days.',
      'Taxes (TDS) will be applicable as per Indian law.',
      'Players must submit UPI or bank details accurately.'
    ]
  },
  {
    id: 'conduct',
    title: 'Code of Conduct',
    icon: ScrollText,
    content: [
      'Maintain respectful behavior toward teammates, opponents, and admins.',
      'Abusive language on stream or chat is punishable.',
      'Tarnishing the tournament\'s image on social media can result in permanent bans.'
    ]
  }
];

const RulesReg = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((sec) => sec !== id) : [...prev, id]
    );
  };

  const downloadPDF = () => {
    const pdfContent = ruleSections.map((section) => `\n${section.title}\n` + section.content.map(rule => `- ${rule}`).join('\n')).join('\n\n');
    const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'Tournament_Rules.txt');
  };

  return (
    <div className="min-h-screen bg-background pt-20 px-4 sm:px-6 lg:px-24 pb-12">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Navigation */}
        <aside className="lg:w-1/4 sticky top-28 hidden lg:block">
          <ul className="space-y-4 text-sm">
            {ruleSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="hover:text-primary text-muted-foreground transition-colors"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <div className="text-center slide-in-tactical">
            <h1 className="text-5xl font-bold text-electric-blue">Tournament Directives</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Fair play. Fierce competition. Read our tournament rules and ensure you’re ready to battle with integrity.
            </p>
            <p className="text-sm text-muted-foreground mt-2">Last Updated: July 31, 2025</p>
            <Button className="btn-tactical mt-4" onClick={downloadPDF}>
              <FileDown className="w-4 h-4 mr-2" /> Download Rules
            </Button>
          </div>

          {ruleSections.map((section) => (
            <Card
              key={section.id}
              id={section.id}
              className="border border-tactical-teal/30 bg-card/40"
            >
              <CardHeader
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center gap-2">
                  <section.icon className="text-tactical-teal w-5 h-5" />
                  <CardTitle className="text-xl hover:underline">
                    {section.title}
                  </CardTitle>
                </div>
                {openSections.includes(section.id) ? <ChevronUp /> : <ChevronDown />}
              </CardHeader>
              {openSections.includes(section.id) && (
                <CardContent className="slide-in-tactical">
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    {section.content.map((rule, idx) => (
                      <li key={idx} className={section.accent || ''}>{rule}</li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RulesReg;
