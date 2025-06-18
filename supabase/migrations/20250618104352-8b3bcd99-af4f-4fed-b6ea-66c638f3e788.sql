
-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  author_id UUID REFERENCES auth.users NOT NULL,
  author_name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'tournament-news',
  tags TEXT[] DEFAULT '{}',
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  views_count INTEGER DEFAULT 0
);

-- Create winners table
CREATE TABLE public.winners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tournament_id UUID NOT NULL,
  tournament_name TEXT NOT NULL,
  tournament_type TEXT NOT NULL,
  player_name TEXT NOT NULL,
  player_avatar_url TEXT,
  placement INTEGER NOT NULL,
  prize_amount DECIMAL(10,2),
  tournament_date DATE NOT NULL,
  tournament_size INTEGER NOT NULL,
  game_title TEXT NOT NULL,
  stats JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create comments table for blog posts
CREATE TABLE public.blog_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for blog posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read published blog posts
CREATE POLICY "Anyone can view published blog posts" 
  ON public.blog_posts 
  FOR SELECT 
  USING (status = 'published');

-- Allow authenticated users to create their own blog posts
CREATE POLICY "Authors can create their own blog posts" 
  ON public.blog_posts 
  FOR INSERT 
  WITH CHECK (auth.uid() = author_id);

-- Allow authors to update their own blog posts
CREATE POLICY "Authors can update their own blog posts" 
  ON public.blog_posts 
  FOR UPDATE 
  USING (auth.uid() = author_id);

-- Add RLS policies for winners (public read access)
ALTER TABLE public.winners ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view winners
CREATE POLICY "Anyone can view winners" 
  ON public.winners 
  FOR SELECT 
  TO public 
  USING (true);

-- Add RLS policies for comments
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view approved comments
CREATE POLICY "Anyone can view approved comments" 
  ON public.blog_comments 
  FOR SELECT 
  USING (status = 'approved');

-- Allow anyone to create comments
CREATE POLICY "Anyone can create comments" 
  ON public.blog_comments 
  FOR INSERT 
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_status_created ON public.blog_posts(status, created_at DESC);
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX idx_blog_posts_tags ON public.blog_posts USING GIN(tags);
CREATE INDEX idx_winners_tournament_date ON public.winners(tournament_date DESC);
CREATE INDEX idx_winners_tournament_type ON public.winners(tournament_type);
CREATE INDEX idx_blog_comments_post_id ON public.blog_comments(blog_post_id);

-- Insert sample winners data (no foreign key constraints)
INSERT INTO public.winners (tournament_id, tournament_name, tournament_type, player_name, placement, prize_amount, tournament_date, tournament_size, game_title, stats)
VALUES 
  (gen_random_uuid(), 'Spring Championship 2024', 'Championship', 'ProGamer123', 1, 5000.00, '2024-03-15', 128, 'Battle Arena', '{"kills": 45, "deaths": 12, "kd_ratio": 3.75}'),
  (gen_random_uuid(), 'Spring Championship 2024', 'Championship', 'ElitePlayer99', 2, 3000.00, '2024-03-15', 128, 'Battle Arena', '{"kills": 38, "deaths": 15, "kd_ratio": 2.53}'),
  (gen_random_uuid(), 'Spring Championship 2024', 'Championship', 'SkillMaster', 3, 1500.00, '2024-03-15', 128, 'Battle Arena', '{"kills": 32, "deaths": 18, "kd_ratio": 1.78}'),
  (gen_random_uuid(), 'Weekly Tournament #42', 'Weekly', 'QuickShot47', 1, 500.00, '2024-03-08', 64, 'Fast Combat', '{"accuracy": 85, "headshots": 23, "total_shots": 156}'),
  (gen_random_uuid(), 'Weekly Tournament #41', 'Weekly', 'ProGamer123', 1, 500.00, '2024-03-01', 64, 'Fast Combat', '{"accuracy": 88, "headshots": 31, "total_shots": 189}'),
  (gen_random_uuid(), 'Monthly Showdown Feb', 'Monthly', 'TacticalNinja', 1, 2000.00, '2024-02-28', 96, 'Strategic Warfare', '{"wins": 12, "losses": 2, "win_rate": 85.7}');
