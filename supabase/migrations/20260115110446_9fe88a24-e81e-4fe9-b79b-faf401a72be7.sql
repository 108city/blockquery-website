-- Create articles table for thought leadership content
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  author_name TEXT NOT NULL DEFAULT 'Chainlabs Investigation',
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Public can read published articles
CREATE POLICY "Anyone can view published articles" 
ON public.articles 
FOR SELECT 
USING (published = true);

-- Service role can manage all articles (for admin operations via edge function)
CREATE POLICY "Service role can manage articles" 
ON public.articles 
FOR ALL
USING (((auth.jwt() ->> 'role'::text) = 'service_role'::text))
WITH CHECK (((auth.jwt() ->> 'role'::text) = 'service_role'::text));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_articles_updated_at();

-- Create index for faster slug lookups
CREATE INDEX idx_articles_slug ON public.articles(slug);
CREATE INDEX idx_articles_published ON public.articles(published);

-- Create storage bucket for article images
INSERT INTO storage.buckets (id, name, public) VALUES ('article-images', 'article-images', true);

-- Storage policies for article images
CREATE POLICY "Article images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'article-images');

CREATE POLICY "Service role can upload article images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'article-images' AND ((auth.jwt() ->> 'role'::text) = 'service_role'::text));

CREATE POLICY "Service role can update article images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'article-images' AND ((auth.jwt() ->> 'role'::text) = 'service_role'::text));

CREATE POLICY "Service role can delete article images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'article-images' AND ((auth.jwt() ->> 'role'::text) = 'service_role'::text));