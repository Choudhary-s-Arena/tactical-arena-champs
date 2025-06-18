
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, User, Eye, Share2, Heart, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      
      // Increment view count
      await supabase
        .from('blog_posts')
        .update({ views_count: (data.views_count || 0) + 1 })
        .eq('id', data.id);

      return data;
    },
  });

  const { data: comments } = useQuery({
    queryKey: ['blog-comments', post?.id],
    queryFn: async () => {
      if (!post?.id) return [];
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('blog_post_id', post.id)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!post?.id,
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ['related-posts', post?.category, post?.id],
    queryFn: async () => {
      if (!post) return [];
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', post.category)
        .eq('status', 'published')
        .neq('id', post.id)
        .limit(3);

      if (error) throw error;
      return data;
    },
    enabled: !!post,
  });

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !commentName || !commentEmail || !commentContent) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('blog_comments')
        .insert({
          blog_post_id: post.id,
          author_name: commentName,
          author_email: commentEmail,
          content: commentContent,
        });

      if (error) throw error;

      toast({
        title: "Comment submitted!",
        description: "Your comment is pending approval.",
      });

      setCommentName('');
      setCommentEmail('');
      setCommentContent('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Article link copied to clipboard.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-tactical-teal/20 rounded mb-4 w-1/4"></div>
            <div className="h-12 bg-tactical-teal/20 rounded mb-6"></div>
            <div className="h-64 bg-tactical-teal/20 rounded mb-6"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-tactical-teal/20 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-tactical-teal mb-4">Post Not Found</h1>
          <Link to="/blog">
            <Button className="btn-tactical">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <Link to="/blog" className="inline-flex items-center text-tactical-teal hover:text-electric-blue mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="bg-tactical-gray rounded-lg overflow-hidden mb-8">
          <img
            src={post.featured_image_url || '/placeholder.svg'}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="p-8">
            <Badge className="mb-4 bg-tactical-teal text-white">
              {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-tactical-teal mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{post.author_name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(post.created_at), 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>{post.views_count || 0} views</span>
              </div>
            </div>

            {/* Social Actions */}
            <div className="flex items-center space-x-4 mb-8">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Like
              </Button>
            </div>

            <Separator className="mb-8" />

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-foreground">
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-tactical-teal/20">
                <h3 className="text-lg font-semibold text-tactical-teal mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Comments Section */}
        <Card className="bg-tactical-gray border-tactical-teal/20 mb-8">
          <CardContent className="p-8">
            <div className="flex items-center space-x-2 mb-6">
              <MessageCircle className="w-5 h-5 text-tactical-teal" />
              <h3 className="text-xl font-bold text-tactical-teal">
                Comments ({comments?.length || 0})
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8 p-6 bg-background rounded-lg">
              <h4 className="text-lg font-semibold text-tactical-teal mb-4">Leave a Comment</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  placeholder="Your Name"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  required
                />
              </div>
              <Textarea
                placeholder="Your Comment"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                rows={4}
                className="mb-4"
                required
              />
              <Button type="submit" disabled={isSubmitting} className="btn-tactical">
                {isSubmitting ? 'Submitting...' : 'Submit Comment'}
              </Button>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments?.map((comment) => (
                <div key={comment.id} className="p-4 bg-background rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-tactical-teal">{comment.author_name}</h5>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(comment.created_at), 'MMM dd, yyyy')}
                    </span>
                  </div>
                  <p className="text-foreground">{comment.content}</p>
                </div>
              ))}
              {comments?.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-tactical-teal mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="bg-tactical-gray border-tactical-teal/20 hover:border-tactical-teal transition-all">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={relatedPost.featured_image_url || '/placeholder.svg'}
                      alt={relatedPost.title}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-tactical-teal mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <Link to={`/blog/${relatedPost.slug}`}>
                      <Button variant="ghost" size="sm" className="text-tactical-teal hover:text-electric-blue p-0">
                        Read More →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
