
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Users, Trophy, Clock, DollarSign, GamepadIcon, Crown, Star, Zap } from 'lucide-react';
import { format } from 'date-fns';

const Tournaments = () => {
  const upcomingTournaments = [
    {
      id: 1,
      name: 'Summer Championship 2024',
      game: 'Battle Arena Pro',
      date: '2024-07-15',
      registrationEnd: '2024-07-10',
      prizePool: 10000,
      participants: 256,
      currentRegistrations: 189,
      status: 'Registering',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=300&fit=crop',
      description: 'The biggest tournament of the summer featuring the latest Battle Arena Pro championship. Elite players from around the world will compete for glory and substantial prizes.',
      format: 'Single Elimination',
      duration: '3 days'
    },
    {
      id: 2,
      name: 'Weekly Lightning Cup #45',
      game: 'Fast Combat',
      date: '2024-06-25',
      registrationEnd: '2024-06-23',
      prizePool: 1500,
      participants: 64,
      currentRegistrations: 38,
      status: 'Registering',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=300&fit=crop',
      description: 'Fast-paced weekly tournament perfect for competitive players looking to test their skills in quick matches.',
      format: 'Double Elimination',
      duration: '6 hours'
    },
    {
      id: 3,
      name: 'Monthly Strategic Warfare',
      game: 'Strategic Warfare',
      date: '2024-06-30',
      registrationEnd: '2024-06-28',
      prizePool: 3000,
      participants: 128,
      currentRegistrations: 95,
      status: 'Registering',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=300&fit=crop',
      description: 'Strategic minds unite in this monthly championship featuring complex tactical gameplay and team coordination.',
      format: 'Swiss System + Playoffs',
      duration: '2 days'
    }
  ];

  const pastTournaments = [
    {
      id: 1,
      name: 'Spring Championship 2024',
      game: 'Battle Arena',
      date: '2024-03-15',
      prizePool: 8000,
      participants: 128,
      winner: 'ProGamer123',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=300&fit=crop',
      description: 'An epic spring tournament that showcased incredible skill and determination. ProGamer123 emerged victorious after intense battles.',
      highlights: ['Record-breaking viewership', 'Closest finals in tournament history', 'New meta strategies emerged'],
      finalScore: '3-2',
      totalViews: 45000
    },
    {
      id: 2,
      name: 'Winter Showdown 2023',
      game: 'Battle Arena',
      date: '2023-12-20',
      prizePool: 6000,
      participants: 96,
      winner: 'TacticalNinja',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=300&fit=crop',
      description: 'The winter finale that brought together the best players of 2023. TacticalNinja dominated with innovative strategies.',
      highlights: ['Perfect run by winner', 'Upset victories in semifinals', 'New attendance record'],
      finalScore: '3-0',
      totalViews: 38000
    },
    {
      id: 3,
      name: 'Autumn Clash 2023',
      game: 'Strategic Warfare',
      date: '2023-09-10',
      prizePool: 4500,
      participants: 80,
      winner: 'ElitePlayer99',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=300&fit=crop',
      description: 'A strategic masterclass where ElitePlayer99 showcased superior tactical thinking and execution.',
      highlights: ['Longest match duration record', 'Most strategic plays', 'Innovative team compositions'],
      finalScore: '2-1',
      totalViews: 29000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Registering': return 'bg-neon-green text-black';
      case 'Completed': return 'bg-tactical-teal text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-tactical-teal to-electric-blue rounded-lg flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-tactical-teal">
              Tournaments
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compete in our featured tournaments and prove your skills against the best players in the gaming community.
          </p>
        </div>

        {/* Tournament Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-tactical-gray">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-tactical-teal data-[state=active]:text-white">
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-tactical-teal data-[state=active]:text-white">
              Past Tournaments
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Tournaments */}
          <TabsContent value="upcoming">
            <div className="grid gap-8">
              {upcomingTournaments.map((tournament) => (
                <Card key={tournament.id} className="bg-tactical-gray border-tactical-teal/20 hover:border-tactical-teal transition-all duration-300 overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative">
                      <img 
                        src={tournament.image} 
                        alt={tournament.name}
                        className="w-full h-64 md:h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <Badge className={`absolute top-4 right-4 ${getStatusColor(tournament.status)}`}>
                        {tournament.status}
                      </Badge>
                    </div>
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-2 mb-2">
                        <GamepadIcon className="w-5 h-5 text-tactical-teal" />
                        <span className="text-tactical-teal font-medium">{tournament.game}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{tournament.name}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{tournament.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-tactical-teal" />
                          <span className="text-sm">{format(new Date(tournament.date), 'MMM dd, yyyy')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-tactical-teal" />
                          <span className="text-sm">{tournament.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-tactical-teal" />
                          <span className="text-sm">${tournament.prizePool.toLocaleString()} Prize Pool</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-tactical-teal" />
                          <span className="text-sm">{tournament.currentRegistrations}/{tournament.participants} Players</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Registration ends: {format(new Date(tournament.registrationEnd), 'MMM dd')}
                        </div>
                        <Button className="btn-tactical text-white font-semibold">
                          Register Now
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Past Tournaments */}
          <TabsContent value="past">
            <div className="grid gap-8">
              {pastTournaments.map((tournament) => (
                <Card key={tournament.id} className="bg-tactical-gray border-tactical-teal/20 hover:border-tactical-teal transition-all duration-300 overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative">
                      <img 
                        src={tournament.image} 
                        alt={tournament.name}
                        className="w-full h-64 md:h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <Badge className={`absolute top-4 right-4 ${getStatusColor(tournament.status)}`}>
                        {tournament.status}
                      </Badge>
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center space-x-2">
                          <Crown className="w-5 h-5 text-yellow-400" />
                          <span className="font-bold">{tournament.winner}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-2 mb-2">
                        <GamepadIcon className="w-5 h-5 text-tactical-teal" />
                        <span className="text-tactical-teal font-medium">{tournament.game}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{tournament.name}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{tournament.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-tactical-teal" />
                          <span className="text-sm">{format(new Date(tournament.date), 'MMM dd, yyyy')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-tactical-teal" />
                          <span className="text-sm">{tournament.participants} Players</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-tactical-teal" />
                          <span className="text-sm">${tournament.prizePool.toLocaleString()} Prize Pool</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-4 h-4 text-tactical-teal" />
                          <span className="text-sm">Final: {tournament.finalScore}</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-tactical-teal font-semibold mb-2">Tournament Highlights:</h4>
                        <ul className="space-y-1">
                          {tournament.highlights.map((highlight, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                              <Star className="w-3 h-3 text-yellow-400" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          {tournament.totalViews?.toLocaleString()} total views
                        </div>
                        <Button variant="outline" className="border-tactical-teal text-tactical-teal hover:bg-tactical-teal hover:text-white">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-tactical-teal/10 to-electric-blue/10 rounded-2xl p-12">
          <Zap className="w-16 h-16 text-tactical-teal mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-tactical-teal mb-4">Ready to Compete?</h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join thousands of players in our competitive tournaments. Whether you're a beginner or a pro, 
            there's a tournament waiting for you.
          </p>
          <Button size="lg" className="btn-tactical text-white font-semibold">
            Register for Next Tournament
          </Button>
        </div>

      </div>
    </div>
  );
};

export default Tournaments;
