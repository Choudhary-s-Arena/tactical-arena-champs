
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Search, Medal, Crown, Star, TrendingUp, Calendar, Users, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Winners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedGame, setSelectedGame] = useState('all');

  const { data: winners, isLoading } = useQuery({
    queryKey: ['winners', searchTerm, selectedType, selectedGame],
    queryFn: async () => {
      let query = supabase
        .from('winners')
        .select('*')
        .order('tournament_date', { ascending: false });

      if (searchTerm) {
        query = query.or(`player_name.ilike.%${searchTerm}%,tournament_name.ilike.%${searchTerm}%`);
      }

      if (selectedType !== 'all') {
        query = query.eq('tournament_type', selectedType);
      }

      if (selectedGame !== 'all') {
        query = query.eq('game_title', selectedGame);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Analytics data
  const { data: analytics } = useQuery({
    queryKey: ['winners-analytics'],
    queryFn: async () => {
      const { data: allWinners, error } = await supabase
        .from('winners')
        .select('*');

      if (error) throw error;

      // Tournament size distribution
      const sizeDistribution = allWinners.reduce((acc: any, winner) => {
        const size = winner.tournament_size;
        const existing = acc.find((item: any) => item.size === size);
        if (existing) {
          existing.count++;
        } else {
          acc.push({ size, count: 1 });
        }
        return acc;
      }, []).sort((a: any, b: any) => a.size - b.size);

      // Prize money over time
      const prizeOverTime = allWinners
        .filter(w => w.prize_amount && w.placement === 1)
        .reduce((acc: any, winner) => {
          const month = format(new Date(winner.tournament_date), 'MMM yyyy');
          const existing = acc.find((item: any) => item.month === month);
          if (existing) {
            existing.total += Number(winner.prize_amount);
          } else {
            acc.push({ month, total: Number(winner.prize_amount) });
          }
          return acc;
        }, [])
        .sort((a: any, b: any) => new Date(a.month).getTime() - new Date(b.month).getTime());

      // Game distribution
      const gameDistribution = allWinners.reduce((acc: any, winner) => {
        const game = winner.game_title;
        const existing = acc.find((item: any) => item.name === game);
        if (existing) {
          existing.value++;
        } else {
          acc.push({ name: game, value: 1 });
        }
        return acc;
      }, []);

      // Hall of Fame (players with multiple first place wins)
      const hallOfFame = allWinners
        .filter(w => w.placement === 1)
        .reduce((acc: any, winner) => {
          const existing = acc.find((item: any) => item.player_name === winner.player_name);
          if (existing) {
            existing.wins++;
            existing.totalPrize += Number(winner.prize_amount || 0);
          } else {
            acc.push({
              player_name: winner.player_name,
              player_avatar_url: winner.player_avatar_url,
              wins: 1,
              totalPrize: Number(winner.prize_amount || 0),
              latestWin: winner.tournament_date
            });
          }
          return acc;
        }, [])
        .filter((player: any) => player.wins > 1)
        .sort((a: any, b: any) => b.wins - a.wins);

      return {
        sizeDistribution,
        prizeOverTime,
        gameDistribution,
        hallOfFame
      };
    },
  });

  const getPlacementIcon = (placement: number) => {
    switch (placement) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Trophy className="w-5 h-5 text-orange-600" />;
      default:
        return <Star className="w-5 h-5 text-tactical-teal" />;
    }
  };

  const getPlacementColor = (placement: number) => {
    switch (placement) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600';
      default:
        return 'bg-gradient-to-r from-tactical-teal to-electric-blue';
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-tactical-teal mb-4">
            Champions Hall
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Celebrating our tournament champions and their legendary achievements in the arena.
          </p>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Tournament Size Distribution */}
          <Card className="bg-tactical-gray border-tactical-teal/20">
            <CardHeader>
              <CardTitle className="text-tactical-teal flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Tournament Size Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics?.sizeDistribution || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="size" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Prize Money Over Time */}
          <Card className="bg-tactical-gray border-tactical-teal/20">
            <CardHeader>
              <CardTitle className="text-tactical-teal flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Prize Money Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics?.prizeOverTime || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Prize Money']} />
                  <Line type="monotone" dataKey="total" stroke="#0ea5e9" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Game Distribution */}
          <Card className="bg-tactical-gray border-tactical-teal/20">
            <CardHeader>
              <CardTitle className="text-tactical-teal">Game Popularity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics?.gameDistribution || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics?.gameDistribution?.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Hall of Fame */}
          <Card className="bg-tactical-gray border-tactical-teal/20">
            <CardHeader>
              <CardTitle className="text-tactical-teal flex items-center">
                <Crown className="w-5 h-5 mr-2" />
                Hall of Fame
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.hallOfFame?.slice(0, 5).map((player: any, index: number) => (
                  <div key={player.player_name} className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl font-bold text-tactical-teal">#{index + 1}</div>
                      <Avatar>
                        <AvatarImage src={player.player_avatar_url} />
                        <AvatarFallback>{player.player_name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-tactical-teal">{player.player_name}</p>
                        <p className="text-sm text-muted-foreground">{player.wins} championships</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">${player.totalPrize.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        Latest: {format(new Date(player.latestWin), 'MMM yyyy')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search players or tournaments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-tactical-gray border-tactical-teal/20 focus:border-tactical-teal"
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full md:w-48 bg-tactical-gray border-tactical-teal/20">
              <SelectValue placeholder="Tournament Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Championship">Championship</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedGame} onValueChange={setSelectedGame}>
            <SelectTrigger className="w-full md:w-48 bg-tactical-gray border-tactical-teal/20">
              <SelectValue placeholder="Game" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Games</SelectItem>
              <SelectItem value="Battle Arena">Battle Arena</SelectItem>
              <SelectItem value="Fast Combat">Fast Combat</SelectItem>
              <SelectItem value="Strategic Warfare">Strategic Warfare</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Winners Timeline */}
        {isLoading ? (
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="bg-tactical-gray border-tactical-teal/20 animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-tactical-teal/20 rounded mb-4 w-1/3"></div>
                  <div className="h-4 bg-tactical-teal/20 rounded mb-2"></div>
                  <div className="h-4 bg-tactical-teal/20 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {winners?.map((winner) => (
              <Card key={winner.id} className={`border-l-4 ${getPlacementColor(winner.placement).replace('bg-gradient-to-r', 'border-l')} bg-tactical-gray border-tactical-teal/20 hover:border-tactical-teal transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      <div className="flex items-center space-x-2">
                        {getPlacementIcon(winner.placement)}
                        <span className="text-2xl font-bold text-tactical-teal">
                          {winner.placement === 1 ? '1st' : winner.placement === 2 ? '2nd' : winner.placement === 3 ? '3rd' : `${winner.placement}th`}
                        </span>
                      </div>
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={winner.player_avatar_url} />
                        <AvatarFallback>{winner.player_name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold text-tactical-teal">{winner.player_name}</h3>
                        <p className="text-muted-foreground">{winner.tournament_name}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      <Badge variant="outline" className="border-tactical-teal text-tactical-teal">
                        {winner.game_title}
                      </Badge>
                      <Badge variant="outline">
                        {winner.tournament_type}
                      </Badge>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(winner.tournament_date), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{winner.tournament_size} players</span>
                      </div>
                      {winner.prize_amount && (
                        <div className="flex items-center space-x-2 text-green-600 font-semibold">
                          <DollarSign className="w-4 h-4" />
                          <span>${winner.prize_amount.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Player Stats */}
                  {winner.stats && Object.keys(winner.stats).length > 0 && (
                    <div className="mt-4 pt-4 border-t border-tactical-teal/20">
                      <h4 className="text-sm font-semibold text-tactical-teal mb-2">Performance Stats</h4>
                      <div className="flex flex-wrap gap-4">
                        {Object.entries(winner.stats as Record<string, any>).map(([key, value]) => (
                          <div key={key} className="bg-background px-3 py-1 rounded">
                            <span className="text-xs text-muted-foreground capitalize">
                              {key.replace('_', ' ')}:
                            </span>
                            <span className="ml-1 text-sm font-semibold text-tactical-teal">
                              {typeof value === 'number' ? value.toLocaleString() : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {winners?.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">No winners found</h3>
            <p className="text-muted-foreground">Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Winners;
