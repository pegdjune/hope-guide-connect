import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BASE_URL = 'https://fertileurope.com';

// Static pages with their priorities and change frequencies
const staticPages = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/diagnostic', changefreq: 'monthly', priority: '0.9' },
  { path: '/comparateur', changefreq: 'weekly', priority: '0.9' },
  { path: '/carte-cliniques', changefreq: 'weekly', priority: '0.8' },
  { path: '/blog', changefreq: 'daily', priority: '0.9' },
  { path: '/simulateurs', changefreq: 'monthly', priority: '0.8' },
  { path: '/simulateurs/remboursement', changefreq: 'monthly', priority: '0.7' },
  { path: '/simulateurs/cout-pays', changefreq: 'monthly', priority: '0.7' },
  { path: '/simulateurs/chances-succes', changefreq: 'monthly', priority: '0.7' },
  { path: '/simulateurs/budget-global', changefreq: 'monthly', priority: '0.7' },
  { path: '/a-propos', changefreq: 'monthly', priority: '0.5' },
];

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Generating dynamic sitemap...');

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all published blog articles
    const { data: articles, error } = await supabase
      .from('blog_articles')
      .select('slug, updated_at, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }

    console.log(`Found ${articles?.length || 0} published articles`);

    // Build XML sitemap
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Pages principales -->`;

    // Add static pages
    for (const page of staticPages) {
      xml += `
  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }

    // Add blog articles
    if (articles && articles.length > 0) {
      xml += `
  
  <!-- Articles de blog (générés dynamiquement) -->`;
      
      for (const article of articles) {
        const lastmod = article.updated_at || article.created_at;
        const formattedDate = lastmod ? new Date(lastmod).toISOString().split('T')[0] : '';
        
        xml += `
  <url>
    <loc>${BASE_URL}/blog/${article.slug}</loc>
    <lastmod>${formattedDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
      }
    }

    xml += `
</urlset>`;

    console.log('Sitemap generated successfully');

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to generate sitemap' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
