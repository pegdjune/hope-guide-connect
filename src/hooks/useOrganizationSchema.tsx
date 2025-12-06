import { useEffect } from "react";

export const useOrganizationSchema = () => {
  useEffect(() => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "FertilEurope",
      "alternateName": "FertilEurope - Parcours FIV en Europe",
      "url": baseUrl,
      "logo": `${baseUrl}/favicon.ico`,
      "description": "FertilEurope accompagne les couples dans leur parcours de PMA en Europe. Comparaison de cliniques FIV, diagnostic personnalisé et accompagnement humain.",
      "foundingDate": "2024",
      "sameAs": [],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["French"],
      },
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 48.8566,
          "longitude": 2.3522,
        },
        "geoRadius": "2000 km",
      },
      "knowsAbout": [
        "FIV",
        "ICSI",
        "Don d'ovocytes",
        "PMA",
        "Fertilité",
        "Cliniques européennes",
      ],
    };

    // Remove existing organization schema
    const existingScript = document.querySelector('script[data-schema="organization"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new schema
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "organization");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-schema="organization"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);
};

interface FAQItem {
  question: string;
  answer: string;
}

export const useFAQSchema = (faqs: FAQItem[]) => {
  useEffect(() => {
    if (faqs.length === 0) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    };

    // Remove existing FAQ schema
    const existingScript = document.querySelector('script[data-schema="faq"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new schema
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "faq");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-schema="faq"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [faqs]);
};

interface MedicalClinicSchemaProps {
  name: string;
  city: string;
  country: string;
  rating?: number;
  reviewCount?: number;
  priceFrom?: number;
  website?: string;
}

export const useMedicalClinicSchema = (clinic: MedicalClinicSchemaProps) => {
  useEffect(() => {
    const schema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "name": clinic.name,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": clinic.city,
        "addressCountry": clinic.country,
      },
      "medicalSpecialty": "Reproductive Medicine",
    };

    if (clinic.rating && clinic.reviewCount) {
      schema["aggregateRating"] = {
        "@type": "AggregateRating",
        "ratingValue": clinic.rating,
        "reviewCount": clinic.reviewCount,
        "bestRating": 5,
        "worstRating": 1,
      };
    }

    if (clinic.priceFrom) {
      schema["priceRange"] = `À partir de ${clinic.priceFrom}€`;
    }

    if (clinic.website) {
      schema["url"] = clinic.website;
    }

    // Remove existing clinic schema
    const existingScript = document.querySelector(`script[data-schema="clinic-${clinic.name}"]`);
    if (existingScript) {
      existingScript.remove();
    }

    // Add new schema
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", `clinic-${clinic.name}`);
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector(`script[data-schema="clinic-${clinic.name}"]`);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [clinic]);
};
