
import { useState, useEffect } from 'react';
import { Target, Crosshair } from 'lucide-react';

interface LoadingAnimationProps {
  onComplete?: () => void;
}

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => {
            onComplete?.();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${
      isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tactical-teal/5 to-electric-blue/5" />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-tactical-teal rounded-full tactical-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-electric-blue rounded-full tactical-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-neon-green rounded-full tactical-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-tactical-teal rounded-full tactical-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Rotating Tactical Badge */}
        <div className="relative">
          <div className="w-24 h-24 relative">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-4 border-tactical-teal/30 rounded-full animate-spin" />
            
            {/* Inner Crosshair */}
            <div className="absolute inset-4 flex items-center justify-center">
              <div className="relative">
                <Target className="w-12 h-12 text-tactical-teal tactical-glow animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Crosshair className="w-6 h-6 text-electric-blue animate-spin" style={{ animationDirection: 'reverse' }} />
                </div>
              </div>
            </div>

            {/* Progress Ring */}
            <svg className="absolute inset-0 w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="44"
                fill="none"
                stroke="hsl(var(--tactical-teal))"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.76} 276`}
                className="transition-all duration-300 ease-out"
              />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-4">
          <div className="text-2xl font-bold text-tactical-teal tracking-wider">
            CHOUDHARY TOURNAMENTS
          </div>
          <div className="text-sm text-electric-blue tracking-widest font-mono">
            INITIALIZING TACTICAL ARENA
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-2 bg-tactical-gray rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-tactical-teal to-electric-blue transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress Percentage */}
          <div className="text-lg font-mono text-tactical-teal">
            {Math.floor(progress)}%
          </div>

          {/* Loading Messages */}
          <div className="text-xs text-muted-foreground font-mono">
            {progress < 25 && "CONNECTING TO BATTLEFIELD..."}
            {progress >= 25 && progress < 50 && "LOADING TOURNAMENT DATA..."}
            {progress >= 50 && progress < 75 && "SYNCING PLAYER STATS..."}
            {progress >= 75 && progress < 95 && "PREPARING COMBAT ARENA..."}
            {progress >= 95 && "TACTICAL SYSTEMS ONLINE"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
