import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { transformRichTextHtml } from "@/lib/richtext";
import DOMPurify from "dompurify";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  author_name: string;
  published_at: string | null;
}

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setArticle(data as Article);
      }
      setIsLoading(false);
    };

    fetchArticle();
  }, [slug]);

  const renderedHtml = useMemo(() => {
    const transformed = transformRichTextHtml(article?.content || "");
    return DOMPurify.sanitize(transformed, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'blockquote', 'pre', 'code', 'img', 'div', 'iframe', 'hr', 'span', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'class', 'title', 'allow', 'allowfullscreen', 'referrerpolicy', 'style'],
      ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    });
  }, [article?.content]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="max-w-3xl mx-auto animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4 mb-4" />
            <div className="h-4 bg-muted rounded w-1/4 mb-8" />
            <div className="h-64 bg-muted rounded mb-8" />
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/insights">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Insights
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <article className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link to="/insights" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Insights
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article?.title}</h1>
            
            <div className="flex items-center gap-4 text-muted-foreground mb-8">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {article?.author_name}
              </span>
              {article?.published_at && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>

            {article?.cover_image_url && (
              <img
                src={article.cover_image_url}
                alt={article.title}
                className="w-full rounded-lg mb-8 max-h-96 object-cover"
              />
            )}

            <div 
              className="cms-richtext prose prose-lg max-w-none text-foreground [&_*]:text-foreground [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 [&_li]:mb-2 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:my-4 [&_a]:text-primary [&_a]:underline [&_img]:rounded-lg [&_img]:my-4 [&_hr]:my-6 [&_hr]:border-border [&_.youtube-embed]:my-6 [&_.article-table]:w-full [&_.article-table]:border-collapse [&_.article-table]:my-6 [&_.article-table_th]:border [&_.article-table_th]:border-border [&_.article-table_th]:bg-muted [&_.article-table_th]:px-4 [&_.article-table_th]:py-3 [&_.article-table_th]:text-left [&_.article-table_th]:font-semibold [&_.article-table_td]:border [&_.article-table_td]:border-border [&_.article-table_td]:px-4 [&_.article-table_td]:py-3 [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-semibold [&_td]:border [&_td]:border-border [&_td]:px-4 [&_td]:py-3"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default ArticleDetail;