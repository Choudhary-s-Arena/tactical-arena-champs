import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, MessageSquare, Users, HelpCircle, Gamepad2, DollarSign, Settings2 } from "lucide-react";

const SupportCenter = () => {
  const [search, setSearch] = useState("");

  const faqs = [
    {
      category: "Registration & Account",
      icon: Users,
      questions: [
        { q: "How do I register?", a: "Click on the 'Register Now' button on the home page and fill out the form." },
        { q: "I forgot my password. What should I do?", a: "Click on 'Forgot Password' on the login page and follow instructions." },
      ],
    },
    {
      category: "Tournament Rules",
      icon: HelpCircle,
      questions: [
        { q: "Where can I find full rules?", a: "You can view all rules in the 'Rules & Regulations' page from the top menu." },
        { q: "How do I report a rule violation?", a: "Use the contact form below to report with evidence." },
      ],
    },
    {
      category: "Match Issues",
      icon: Gamepad2,
      questions: [
        { q: "Opponent didn’t show up?", a: "Report the no-show with a screenshot in the support form." },
        { q: "Match lagged heavily.", a: "Make sure to record the game and send it to our admin team." },
      ],
    },
    {
      category: "Payments & Prizes",
      icon: DollarSign,
      questions: [
        { q: "When will I receive my prize?", a: "Payouts are processed within 7 business days after verification." },
        { q: "What are the tax deductions?", a: "Applicable taxes will be deducted as per Indian law." },
      ],
    },
    {
      category: "Technical Support",
      icon: Settings2,
      questions: [
        { q: "Site not loading?", a: "Try clearing your browser cache or checking your internet connection." },
        { q: "What specs are needed?", a: "The site is optimized for all modern browsers and standard gaming hardware." },
      ],
    },
  ];

  const filteredFaqs = faqs.map(section => ({
    ...section,
    questions: section.questions.filter(({ q, a }) => q.toLowerCase().includes(search.toLowerCase()) || a.toLowerCase().includes(search.toLowerCase()))
  })).filter(section => section.questions.length > 0);

  return (
    <div className="min-h-screen bg-background pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-electric-blue mb-4">Support Center</h1>
          <p className="text-muted-foreground mb-6">We're here to help. Find answers or reach out to us directly.</p>
          <Input
            placeholder="Search for help..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-2/3 mx-auto ring-1 ring-border focus:ring-2 focus:ring-tactical-teal focus:outline-none transition-all"
          />
        </div>

        {filteredFaqs.map((section, idx) => (
          <Card key={idx} className="bg-card/50 border-tactical-teal/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-tactical-teal">
                <section.icon className="w-5 h-5" />
                {section.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple">
                {section.questions.map((faq, qIdx) => (
                  <AccordionItem value={`${idx}-${qIdx}`} key={qIdx}>
                    <AccordionTrigger>{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}

        <div className="pt-12 text-center">
          <h2 className="text-2xl font-bold text-tactical-teal mb-4">Still need help?</h2>
          <p className="text-muted-foreground mb-6">Reach out through one of the following channels:</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button className="btn-tactical">
              <Mail className="mr-2 w-4 h-4" /> support@choudharytournaments.gg
            </Button>
            <Button variant="outline" className="border-tactical-teal text-tactical-teal">
              <MessageSquare className="mr-2 w-4 h-4" /> Join Discord
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportCenter;
