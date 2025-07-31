// Scaffold for Tactical Registration Page
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const steps = ["Team Intel", "Roster Verification", "Comms Setup", "Review & Confirm"];

export default function Registration() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    teamName: "",
    teamTag: "",
    squadLeader: "",
    email: "",
    password: "",
    players: [{ name: "", bgmiId: "" }],
    discord: "",
    comms: "",
    agreeTerms: false,
    agreePrivacy: false,
  });

  const addPlayer = () => {
    setFormData({ ...formData, players: [...formData.players, { name: "", bgmiId: "" }] });
  };
  const removePlayer = (index) => {
    const updated = [...formData.players];
    updated.splice(index, 1);
    setFormData({ ...formData, players: updated });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePlayerChange = (index, field, value) => {
    const updated = [...formData.players];
    updated[index][field] = value;
    setFormData({ ...formData, players: updated });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-tactical-teal to-electric-blue bg-clip-text text-transparent">
            ENLIST YOUR SQUAD
          </h1>
          <p className="text-foreground mt-2">The Battle Awaits. Complete Your Enlistment Protocol to Join the Elite.</p>
          <p className="mt-1 text-muted-foreground text-sm italic">Are You Ready to Dominate?</p>
        </div>

        <Card className="border-tactical-teal">
          <CardHeader>
            <CardTitle className="text-electric-blue">Phase {step + 1}: {steps[step]}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 0 && (
              <>
                <Input placeholder="Team Name" name="teamName" value={formData.teamName} onChange={handleInputChange} />
                <Input placeholder="Team Tag (Optional)" name="teamTag" value={formData.teamTag} onChange={handleInputChange} />
                <Input placeholder="Squad Leader Name" name="squadLeader" value={formData.squadLeader} onChange={handleInputChange} />
                <Input placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} />
                <Input placeholder="Password" name="password" type="password" value={formData.password} onChange={handleInputChange} />
              </>
            )}

            {step === 1 && (
              <>
                {formData.players.map((player, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-2 items-center">
                    <Input
                      placeholder={`Player ${idx + 1} Name`}
                      value={player.name}
                      onChange={(e) => handlePlayerChange(idx, "name", e.target.value)}
                    />
                    <Input
                      placeholder={`Player ${idx + 1} BGMI ID`}
                      value={player.bgmiId}
                      onChange={(e) => handlePlayerChange(idx, "bgmiId", e.target.value)}
                    />
                    {idx > 0 && (
                      <Button variant="ghost" className="text-destructive" onClick={() => removePlayer(idx)}>
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" onClick={addPlayer}>
                  + Add Player
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <Input placeholder="Discord ID (Optional)" name="discord" value={formData.discord} onChange={handleInputChange} />
                <div className="space-y-2">
                  <Label>Preferred Communication Method</Label>
                  <RadioGroup
                    defaultValue={formData.comms}
                    onValueChange={(val) => setFormData({ ...formData, comms: val })}
                  >
                    <RadioGroupItem value="discord" label="Discord" />
                    <RadioGroupItem value="in-game" label="In-Game Chat" />
                  </RadioGroup>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.agreeTerms}
                    onCheckedChange={(val) => setFormData({ ...formData, agreeTerms: val })}
                  />
                  <Label>I agree to the <span className="text-tactical-teal">Terms of Service</span></Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.agreePrivacy}
                    onCheckedChange={(val) => setFormData({ ...formData, agreePrivacy: val })}
                  />
                  <Label>I agree to the <span className="text-tactical-teal">Privacy Policy</span></Label>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-tactical-teal">Review Your Details</h3>
                  <Separator />
                  <p><strong>Team:</strong> {formData.teamName} ({formData.teamTag})</p>
                  <p><strong>Leader:</strong> {formData.squadLeader} - {formData.email}</p>
                  <p><strong>Players:</strong></p>
                  <ul className="pl-4 list-disc">
                    {formData.players.map((p, i) => <li key={i}>{p.name} - {p.bgmiId}</li>)}
                  </ul>
                  <p><strong>Discord:</strong> {formData.discord || "N/A"}</p>
                  <p><strong>Preferred Comms:</strong> {formData.comms}</p>
                </div>
              </>
            )}

            <div className="flex justify-between">
              {step > 0 && <Button onClick={prevStep} variant="secondary">Back</Button>}
              {step < steps.length - 1 ? (
                <Button onClick={nextStep} className="btn-tactical">Next</Button>
              ) : (
                <Button className="btn-tactical">Initiate Deployment</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
