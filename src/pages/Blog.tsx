
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Calendar, User, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ['blog-posts', searchTerm, selectedCategory, currentPage],
    queryFn: async () => {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
      }

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query
        .range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1);

      if (error) throw error;
      return data;
    },
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'tournament-news', label: 'Tournament News' },
    { value: 'player-spotlights', label: 'Player Spotlights' },
    { value: 'game-updates', label: 'Game Updates' },
    { value: 'announcements', label: 'Announcements' }
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'tournament-news': 'bg-tactical-teal text-white',
      'player-spotlights': 'bg-electric-blue text-white',
      'game-updates': 'bg-purple-600 text-white',
      'announcements': 'bg-orange-600 text-white'
    };
    return colors[category] || 'bg-gray-600 text-white';
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-tactical-teal mb-4">
            Gaming Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest tournament news, player spotlights, and gaming insights from the arena.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-tactical-gray border-tactical-teal/20 focus:border-tactical-teal"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48 bg-tactical-gray border-tactical-teal/20">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-tactical-gray border-tactical-teal/20 animate-pulse">
                <div className="h-48 bg-tactical-teal/20 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-tactical-teal/20 rounded mb-2"></div>
                  <div className="h-4 bg-tactical-teal/20 rounded mb-4 w-3/4"></div>
                  <div className="h-3 bg-tactical-teal/20 rounded mb-2"></div>
                  <div className="h-3 bg-tactical-teal/20 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts?.map((post) => (
              <Card key={post.id} className="bg-tactical-gray border-tactical-teal/20 hover:border-tactical-teal transition-all duration-300 group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={post.featured_image_url || '/placeholder.svg'}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className={`absolute top-3 left-3 ${getCategoryColor(post.category)}`}>
                    {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-tactical-teal mb-2 group-hover:text-electric-blue transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{post.author_name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(post.created_at), 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      <span>{post.views_count || 0} views</span>
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm" className="text-tactical-teal hover:text-electric-blue">
                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border-tactical-teal/20 hover:bg-tactical-teal hover:text-white"
            >
              Previous
            </Button>
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 
                    ? "bg-tactical-teal text-white" 
                    : "border-tactical-teal/20 hover:bg-tactical-teal hover:text-white"
                  }
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              className="border-tactical-teal/20 hover:bg-tactical-teal hover:text-white"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
