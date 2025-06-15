
import { useState, useEffect } from 'react';
import { Trophy, Users, DollarSign, Calendar, Target, Zap, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTournaments: 0,
    activePlayers: 0,
    totalPrizePool: 0,
    upcomingEvents: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading stats
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalTournaments: 156,
        activePlayers: 8420,
        totalPrizePool: 250000,
        upcomingEvents: 12
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Sample data for charts
  const tournamentData = [
    { month: 'Jan', tournaments: 12, prize: 15000 },
    { month: 'Feb', tournaments: 18, prize: 22000 },
    { month: 'Mar', tournaments: 15, prize: 18000 },
    { month: 'Apr', tournaments: 20, prize: 28000 },
    { month: 'May', tournaments: 24, prize: 35000 },
    { month: 'Jun', tournaments: 22, prize: 32000 },
  ];

  const recentWinners = [
    { name: 'TacticalSniper', tournament: 'Spring Championship', prize: '$5,000', rank: 1 },
    { name: 'EliteGamer99', tournament: 'Combat Arena Pro', prize: '$3,500', rank: 2 },
    { name: 'WarriorX', tournament: 'Tactical Masters', prize: '$2,800', rank: 3 },
    { name: 'StealthMode', tournament: 'Arena Legends', prize: '$2,200', rank: 4 },
  ];

  const StatCard = ({ title, value, icon: Icon, description, trend }: any) => (
    <Card className="bg-card/50 border-tactical-teal/20 hover:border-tactical-teal/40 transition-all duration-300 tactical-glow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-tactical-teal" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-tactical-teal">
          {isLoading ? (
            <div className="h-8 w-16 bg-tactical-gray animate-pulse rounded" />
          ) : (
            value
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {description}
          {trend && (
            <span className="text-neon-green ml-1">
              +{trend}% from last month
            </span>
          )}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-tactical-teal to-electric-blue bg-clip-text text-transparent">
            TACTICAL ARENA
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Elite gaming tournaments where legends are forged. Join the battlefield and prove your tactical supremacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button className="btn-tactical text-white font-semibold px-8 py-3">
              <Target className="w-5 h-5 mr-2" />
              Join Tournament
            </Button>
            <Button variant="outline" className="border-tactical-teal text-tactical-teal hover:bg-tactical-teal hover:text-background px-8 py-3">
              <Trophy className="w-5 h-5 mr-2" />
              View Rankings
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Tournaments"
            value={isLoading ? '' : stats.totalTournaments}
            icon={Trophy}
            description="Completed events"
            trend={12}
          />
          <StatCard
            title="Active Players"
            value={isLoading ? '' : stats.activePlayers.toLocaleString()}
            icon={Users}
            description="Registered warriors"
            trend={8}
          />
          <StatCard
            title="Total Prize Pool"
            value={isLoading ? '' : `$${stats.totalPrizePool.toLocaleString()}`}
            icon={DollarSign}
            description="Distributed rewards"
            trend={24}
          />
          <StatCard
            title="Upcoming Events"
            value={isLoading ? '' : stats.upcomingEvents}
            icon={Calendar}
            description="This month"
            trend={15}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tournament Statistics */}
          <Card className="bg-card/50 border-tactical-teal/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-tactical-teal">
                <TrendingUp className="w-5 h-5" />
                <span>Tournament Activity</span>
              </CardTitle>
              <CardDescription>Monthly tournament and prize distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tournamentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--tactical-teal))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="tournaments" fill="hsl(var(--tactical-teal))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Prize Pool Trends */}
          <Card className="bg-card/50 border-tactical-teal/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-electric-blue">
                <DollarSign className="w-5 h-5" />
                <span>Prize Pool Trends</span>
              </CardTitle>
              <CardDescription>Monthly prize distribution overview</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={tournamentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--electric-blue))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="prize" 
                    stroke="hsl(var(--electric-blue))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--electric-blue))', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Winners */}
        <Card className="bg-card/50 border-tactical-teal/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-neon-green">
              <Award className="w-5 h-5" />
              <span>Recent Champions</span>
            </CardTitle>
            <CardDescription>Latest tournament winners and their achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentWinners.map((winner, index) => (
                <div 
                  key={index}
                  className="bg-tactical-gray/50 p-4 rounded-lg border border-tactical-teal/20 hover:border-tactical-teal/40 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      winner.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                      winner.rank === 2 ? 'bg-gray-500/20 text-gray-400' :
                      winner.rank === 3 ? 'bg-amber-600/20 text-amber-400' :
                      'bg-tactical-teal/20 text-tactical-teal'
                    }`}>
                      #{winner.rank}
                    </div>
                    <div>
                      <div className="font-semibold text-tactical-teal">{winner.name}</div>
                      <div className="text-xs text-muted-foreground">{winner.tournament}</div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-neon-green">{winner.prize}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-tactical-teal/10 to-electric-blue/10 rounded-lg p-8 text-center border border-tactical-teal/20">
          <h2 className="text-2xl font-bold text-tactical-teal mb-4">Ready to Enter the Arena?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of elite gamers competing for glory and massive prize pools. 
            Your tactical skills are your greatest weapon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-tactical text-white font-semibold px-8 py-3">
              <Zap className="w-5 h-5 mr-2" />
              Register Now
            </Button>
            <Button variant="outline" className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-background px-8 py-3">
              View Tournament Rules
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
