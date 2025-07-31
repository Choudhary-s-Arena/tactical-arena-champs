import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

const dummyData = [
  { rank: 1, name: "TacticalSniper", matches: 20, kills: 60, movement: "up" },
  { rank: 2, name: "EliteGamer99", matches: 22, kills: 55, movement: "down" },
  { rank: 3, name: "WarriorX", matches: 18, kills: 54, movement: "up" },
  { rank: 4, name: "StealthMode", matches: 25, kills: 58, movement: "none" },
  { rank: 5, name: "GhostRider", matches: 21, kills: 50, movement: "up" },
  { rank: 6, name: "SharpShooter", matches: 19, kills: 47, movement: "down" },
  { rank: 7, name: "NightOwl", matches: 23, kills: 48, movement: "none" },
  { rank: 8, name: "Firestorm", matches: 20, kills: 45, movement: "up" },
  { rank: 9, name: "Blitzkrieg", matches: 22, kills: 42, movement: "down" },
  { rank: 10, name: "IronFist", matches: 24, kills: 46, movement: "none" },
];

const PlayerRanking = () => {
  const getMovementIcon = (movement: string) => {
    if (movement === "up") return <ArrowUp className="w-4 h-4 text-neon-green" />;
    if (movement === "down") return <ArrowDown className="w-4 h-4 text-destructive" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const calculateKDRatio = (kills: number, matches: number) => {
    return (kills / matches).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-background pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-tactical-teal to-electric-blue bg-clip-text text-transparent">
            GLOBAL STANDINGS
          </h1>
          <p className="text-lg text-muted-foreground mt-2 slide-in-tactical">
            Top 100 Players This Season
          </p>
        </div>

        {/* Leaderboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {dummyData.map((player) => (
            <Card
              key={player.rank}
              className={`border-tactical-teal/30 bg-card/70 p-4 rounded-xl relative overflow-hidden hover:scale-[1.02] hover:shadow-lg transition-all duration-300 group ${
                player.rank === 1
                  ? "border-4 border-electric-blue shadow-electric-blue/50"
                  : player.rank === 2
                  ? "border-2 border-tactical-teal"
                  : player.rank === 3
                  ? "border-2 border-electric-blue"
                  : "border"
              }`}
            >
              <div className="absolute top-2 right-2">
                {getMovementIcon(player.movement)}
              </div>
              <CardHeader>
                <CardTitle className="text-3xl font-extrabold text-tactical-teal">
                  #{player.rank}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <h2 className="text-xl font-bold text-foreground group-hover:text-electric-blue">
                  {player.name}
                </h2>
                <p className="text-muted-foreground text-sm">
                  Matches: <span className="text-foreground font-semibold">{player.matches}</span>
                </p>
                <p className="text-muted-foreground text-sm">
                  Kills: <span className="text-foreground font-semibold">{player.kills}</span>
                </p>
                <p className="text-muted-foreground text-sm">
                  K/D Ratio: <span className="text-neon-green font-semibold">{calculateKDRatio(player.kills, player.matches)}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerRanking;
