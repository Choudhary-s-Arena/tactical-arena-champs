
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Target, Trophy, Users, Zap, GamepadIcon, Crown, Star } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Arjun Choudhary',
      role: 'Founder & CEO',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Visionary leader with 10+ years in competitive gaming',
      specialties: ['Strategy', 'Leadership', 'Innovation']
    },
    {
      name: 'Priya Sharma',
      role: 'Tournament Director',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      bio: 'Expert in tournament organization and player experience',
      specialties: ['Operations', 'Player Relations', 'Event Management']
    },
    {
      name: 'Vikram Singh',
      role: 'Technical Lead',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Platform architect ensuring seamless gaming experiences',
      specialties: ['Development', 'System Architecture', 'Gaming Tech']
    },
    {
      name: 'Neha Gupta',
      role: 'Community Manager',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Building bridges between players and fostering community spirit',
      specialties: ['Community Building', 'Social Media', 'Player Support']
    }
  ];

  const rules = [
    {
      title: 'Fair Play Policy',
      description: 'All participants must adhere to ethical gaming practices. No cheating, exploiting, or unsportsmanlike conduct will be tolerated.',
      icon: Shield
    },
    {
      title: 'Tournament Structure',
      description: 'Tournaments follow a bracket-style elimination system with seeding based on player rankings and previous performance.',
      icon: Target
    },
    {
      title: 'Prize Distribution',
      description: 'Prizes are distributed within 48 hours of tournament completion. Winners receive digital certificates along with monetary rewards.',
      icon: Trophy
    },
    {
      title: 'Player Eligibility',
      description: 'Open to all skill levels. Players must register with valid information and agree to livestream verification if requested.',
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-tactical-teal to-electric-blue rounded-lg flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-tactical-teal">
              About Choudhary Tournaments
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Where champions are forged, legends are born, and the gaming community thrives in competitive excellence.
          </p>
        </div>

        {/* Founder's Story */}
        <div className="mb-20">
          <Card className="bg-tactical-gray border-tactical-teal/20 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=600&h=400&fit=crop" 
                  alt="Founder Vision" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-tactical-teal/20 to-electric-blue/20"></div>
              </div>
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="w-6 h-6 text-tactical-teal" />
                  <h2 className="text-3xl font-bold text-tactical-teal">Founder's Vision</h2>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Founded in 2020 by Arjun Choudhary, our platform was born from a simple yet powerful vision: 
                  to create the most inclusive, competitive, and rewarding gaming tournament experience in the industry.
                </p>
                <p className="text-muted-foreground mb-6">
                  After witnessing the fragmented nature of competitive gaming and the lack of opportunities for 
                  emerging players, Arjun set out to build a platform that would democratize esports competition 
                  while maintaining the highest standards of fair play and professionalism.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-tactical-teal text-white">Innovation</Badge>
                  <Badge className="bg-electric-blue text-white">Community First</Badge>
                  <Badge className="bg-purple-600 text-white">Fair Competition</Badge>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Tournament Format */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-tactical-teal mb-4">Tournament Format</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our carefully designed tournament structure ensures fair competition and maximum excitement for both players and spectators.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-tactical-gray border-tactical-teal/20 hover:border-tactical-teal transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-tactical-teal to-electric-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <GamepadIcon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-tactical-teal">Registration Phase</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Open registration 2 weeks before tournament</li>
                  <li>• Player verification and skill assessment</li>
                  <li>• Team formation for group events</li>
                  <li>• Payment processing and confirmation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-tactical-gray border-tactical-teal/20 hover:border-tactical-teal transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-electric-blue to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-electric-blue">Competition Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Single/Double elimination brackets</li>
                  <li>• Seeded based on player rankings</li>
                  <li>• Best-of-3 matches (Best-of-5 for finals)</li>
                  <li>• Live streaming for major matches</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-tactical-gray border-tactical-teal/20 hover:border-tactical-teal transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-tactical-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-purple-400">Prize Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 50% to 1st place winner</li>
                  <li>• 30% to 2nd place finisher</li>
                  <li>• 15% to 3rd place finisher</li>
                  <li>• 5% to 4th place finisher</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Rules & Regulations */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-tactical-teal mb-4">Rules & Regulations</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive guidelines to ensure fair play, competitive integrity, and an enjoyable experience for all participants.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {rules.map((rule, index) => {
              const Icon = rule.icon;
              return (
                <Card key={index} className="bg-tactical-gray border-tactical-teal/20 hover:border-tactical-teal transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-tactical-teal to-electric-blue rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-tactical-teal">{rule.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{rule.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-tactical-teal mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The passionate individuals behind Choudhary Tournaments, dedicated to creating the ultimate competitive gaming experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-tactical-gray border-tactical-teal/20 hover:border-tactical-teal transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-tactical-teal/20 group-hover:border-tactical-teal transition-all duration-300"
                    />
                    <div className="absolute inset-0 w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-tactical-teal/20 to-electric-blue/20 group-hover:from-tactical-teal/30 group-hover:to-electric-blue/30 transition-all duration-300"></div>
                  </div>
                  <h3 className="text-xl font-bold text-tactical-teal mb-1">{member.name}</h3>
                  <p className="text-electric-blue font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{member.bio}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.specialties.map((specialty, i) => (
                      <Badge key={i} variant="outline" className="text-xs border-tactical-teal/30 text-tactical-teal">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center bg-gradient-to-r from-tactical-teal/10 to-electric-blue/10 rounded-2xl p-12">
          <Zap className="w-16 h-16 text-tactical-teal mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-tactical-teal mb-4">Our Mission</h3>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            To revolutionize competitive gaming by providing a platform where skill meets opportunity, 
            where every player has a chance to prove themselves, and where the gaming community can 
            come together to celebrate the spirit of competition and sportsmanship.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;
