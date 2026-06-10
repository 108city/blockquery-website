import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, User } from "lucide-react";
import ArticleCover, { cleanBrand } from "@/components/ArticleCover";
import type { Article } from "@/lib/articles";

const ArticleCard = ({ article }: { article: Article }) => (
  <Link to={`/insights/${article.slug}`}>
    <Card className="h-full hover:border-primary transition-colors overflow-hidden group">
      <div className="h-48 overflow-hidden border-b border-border">
        <ArticleCover title={article.title} compact />
      </div>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {cleanBrand(article.title)}
        </h2>
        {article.excerpt && (
          <p className="text-muted-foreground mb-4 line-clamp-2">{cleanBrand(article.excerpt)}</p>
        )}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {cleanBrand(article.author_name)}
            </span>
            {article.published_at && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(article.published_at).toLocaleDateString()}
              </span>
            )}
          </div>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default ArticleCard;
