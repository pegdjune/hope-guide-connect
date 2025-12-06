import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path: string;
}

const routeLabels: Record<string, string> = {
  "": "Accueil",
  "blog": "Blog",
  "simulateurs": "Simulateurs",
  "comparateur": "Comparateur",
  "carte-cliniques": "Carte des cliniques",
  "diagnostic": "Diagnostic",
  "dashboard": "Tableau de bord",
  "a-propos": "À propos",
  "remboursement": "Remboursement",
  "cout-pays": "Coût par pays",
  "chances-succes": "Chances de succès",
  "budget-global": "Budget global",
};

export const useBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  useEffect(() => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": `${baseUrl}${item.path}`,
      })),
    };

    // Remove existing breadcrumb schema
    const existingScript = document.querySelector('script[data-schema="breadcrumb"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new schema
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "breadcrumb");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-schema="breadcrumb"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [items]);
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Accueil", path: "/" },
  ];

  let currentPath = "";
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = routeLabels[segment] || segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    breadcrumbItems.push({ label, path: currentPath });
  });

  // Add schema
  useBreadcrumbSchema(breadcrumbItems);

  if (pathSegments.length === 0) return null;

  return (
    <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-muted-foreground">
      {breadcrumbItems.map((item, index) => (
        <div key={item.path} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4" />}
          {index === breadcrumbItems.length - 1 ? (
            <span className="font-medium text-foreground" aria-current="page">
              {index === 0 && <Home className="w-4 h-4 inline mr-1" />}
              {item.label}
            </span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-primary transition-colors"
            >
              {index === 0 && <Home className="w-4 h-4 inline mr-1" />}
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
