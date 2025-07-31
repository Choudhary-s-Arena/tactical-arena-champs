import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Instagram, Youtube, Twitter, Facebook, Twitch, Mail, MessageSquare, Users } from "lucide-react";

const commsOptions = [
  { key: "general", label: "General Inquiries", icon: Mail },
  { key: "support", label: "Tournament Support", icon: MessageSquare },
  { key: "partnerships", label: "Partnerships & Sponsorships", icon: Users },
  { key: "press", label: "Media & Press", icon: Users },
  { key: "report", label: "Report an Issue", icon: MessageSquare },
];

const ContactUs = () => {
  const [selected, setSelected] = useState("general");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-tactical-teal to-electric-blue bg-clip-text text-transparent">
            Initiate Comms
          </h1>
          <p className="text-muted-foreground mt-3 slide-in-tactical">
            Whether you have a query, feedback, or a partnership proposal, our team is ready to assist. Choose your comms channel below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {commsOptions.map((opt) => (
            <Card
              key={opt.key}
              className={`cursor-pointer transition-transform hover:scale-105 ${selected === opt.key ? "border-tactical-teal bg-card/70" : "bg-card/40"}`}
              onClick={() => setSelected(opt.key)}
            >
              <CardHeader className="flex flex-col items-center">
                <opt.icon className="w-8 h-8 text-tactical-teal mb-2" />
                <CardTitle className="text-center text-lg font-semibold">
                  {opt.label}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="bg-card/60 p-6">
            <CardHeader>
              <CardTitle className="text-tactical-teal text-xl font-semibold">
                {commsOptions.find((opt) => opt.key === selected)?.label} Form
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <Textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
              <Button className="btn-tactical mt-2" type="submit">
                Send Message
              </Button>
              {submitted && (
                <p className="text-neon-green slide-in-tactical">Message sent successfully!</p>
              )}
            </CardContent>
          </Card>
        </form>

        <div className="text-center space-y-6">
          <h2 className="text-2xl font-semibold text-tactical-teal">Join Our Community</h2>
          <div className="flex justify-center gap-6">
            <a href="#" target="_blank" className="hover:scale-110 transition-transform">
              <Instagram className="w-8 h-8 text-electric-blue" />
            </a>
            <a href="#" target="_blank" className="hover:scale-110 transition-transform">
              <Youtube className="w-8 h-8 text-tactical-teal" />
            </a>
            <a href="#" target="_blank" className="hover:scale-110 transition-transform">
              <Twitter className="w-8 h-8 text-electric-blue" />
            </a>
            <a href="#" target="_blank" className="hover:scale-110 transition-transform">
              <Facebook className="w-8 h-8 text-tactical-teal" />
            </a>
            <a href="#" target="_blank" className="hover:scale-110 transition-transform">
              <Twitch className="w-8 h-8 text-electric-blue" />
            </a>
          </div>
          <p className="text-muted-foreground text-sm">Expect responses within 24–48 hours (M–F, 9AM–5PM IST).</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
