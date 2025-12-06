import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  canonicalUrl?: string;
}

export const useSEO = ({
  title,
  description,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  canonicalUrl,
}: SEOProps) => {
  useEffect(() => {
    const siteName = "FertilEurope";
    const fullTitle = `${title} | ${siteName}`;
    const baseUrl = window.location.origin;
    const currentUrl = canonicalUrl || window.location.href;

    // Update document title
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Basic meta tags
    setMeta("description", description);
    setMeta("author", author || siteName);

    // Open Graph tags
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:type", type, true);
    setMeta("og:url", currentUrl, true);
    setMeta("og:site_name", siteName, true);
    if (image) {
      setMeta("og:image", image.startsWith("http") ? image : `${baseUrl}${image}`, true);
    }

    // Article-specific Open Graph
    if (type === "article") {
      if (publishedTime) setMeta("article:published_time", publishedTime, true);
      if (modifiedTime) setMeta("article:modified_time", modifiedTime, true);
      if (author) setMeta("article:author", author, true);
      if (section) setMeta("article:section", section, true);
      tags.forEach((tag, idx) => {
        setMeta(`article:tag:${idx}`, tag, true);
      });
    }

    // Twitter Card tags
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    if (image) {
      setMeta("twitter:image", image.startsWith("http") ? image : `${baseUrl}${image}`);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", currentUrl);

    // Cleanup function - reset to defaults
    return () => {
      document.title = `${siteName} - Votre parcours FIV en Europe simplifié`;
    };
  }, [title, description, image, type, publishedTime, modifiedTime, author, section, tags, canonicalUrl]);
};

interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  url: string;
}

export const useArticleSchema = ({
  title,
  description,
  image,
  author,
  publishedDate,
  modifiedDate,
  url,
}: ArticleSchemaProps) => {
  useEffect(() => {
    const baseUrl = window.location.origin;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: description,
      image: image.startsWith("http") ? image : `${baseUrl}${image}`,
      author: {
        "@type": "Person",
        name: author,
      },
      publisher: {
        "@type": "Organization",
        name: "FertilEurope",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/favicon.ico`,
        },
      },
      datePublished: publishedDate,
      dateModified: modifiedDate || publishedDate,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
    };

    // Remove existing article schema
    const existingScript = document.querySelector('script[data-schema="article"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new schema
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "article");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-schema="article"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, image, author, publishedDate, modifiedDate, url]);
};
