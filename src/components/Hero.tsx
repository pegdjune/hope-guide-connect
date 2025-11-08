import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, MapPin } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Cliniques FIV en Europe
const clinics = [
  { name: "Clinique Eugin", city: "Barcelona", country: "Espagne", coordinates: [2.1734, 41.3851], rating: 4.8 },
  { name: "IVI Madrid", city: "Madrid", country: "Espagne", coordinates: [-3.7038, 40.4168], rating: 4.9 },
  { name: "Prague Fertility Centre", city: "Prague", country: "République Tchèque", coordinates: [14.4378, 50.0755], rating: 4.7 },
  { name: "Gennet", city: "Prague", country: "République Tchèque", coordinates: [14.4208, 50.0875], rating: 4.8 },
  { name: "Instituto Bernabeu", city: "Alicante", country: "Espagne", coordinates: [-0.4890, 38.3460], rating: 4.9 },
  { name: "Serum IVF", city: "Athènes", country: "Grèce", coordinates: [23.7275, 37.9838], rating: 4.6 },
  { name: "North Cyprus IVF", city: "Nicosie", country: "Chypre", coordinates: [33.3823, 35.1856], rating: 4.7 },
  { name: "Invicta Fertility", city: "Gdansk", country: "Pologne", coordinates: [18.6466, 54.3520], rating: 4.5 },
  { name: "Next Fertility", city: "Barcelone", country: "Espagne", coordinates: [2.1686, 41.3879], rating: 4.8 },
  { name: "Reprogenesis", city: "Athènes", country: "Grèce", coordinates: [23.7369, 37.9795], rating: 4.6 },
];

// Récupération du token depuis localStorage
const getStoredToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('mapbox_token') || '';
  }
  return '';
};

const Hero = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapboxToken, setMapboxToken] = useState(getStoredToken);
  const [showTokenInput, setShowTokenInput] = useState(!getStoredToken());

  useEffect(() => {
    if (!mapContainer.current || map.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;

      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/light-v11",
        center: [10, 48],
        zoom: 4,
        pitch: 45,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        "top-right"
      );

      map.current.on("load", () => {
        setMapLoaded(true);
        setShowTokenInput(false);

        // Add markers for each clinic
        clinics.forEach((clinic) => {
          const el = document.createElement("div");
          el.className = "marker";
          el.style.width = "40px";
          el.style.height = "40px";
          el.style.cursor = "pointer";
          
          const markerIcon = document.createElement("div");
          markerIcon.innerHTML = `
            <div class="flex items-center justify-center w-10 h-10 bg-primary rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
          `;
          el.appendChild(markerIcon);

          // Create popup
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-3">
              <h3 class="font-bold text-lg text-foreground">${clinic.name}</h3>
              <p class="text-sm text-muted-foreground">${clinic.city}, ${clinic.country}</p>
              <div class="flex items-center gap-1 mt-2">
                <span class="text-yellow-500">★</span>
                <span class="font-semibold">${clinic.rating}</span>
              </div>
            </div>
          `);

          new mapboxgl.Marker(el)
            .setLngLat(clinic.coordinates as [number, number])
            .setPopup(popup)
            .addTo(map.current!);
        });
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      setShowTokenInput(true);
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('token') as string;
    if (token) {
      localStorage.setItem('mapbox_token', token);
      setMapboxToken(token);
      setShowTokenInput(false);
      // Force reload
      window.location.reload();
    }
  };

  return (
    <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
      {/* Mapbox Map Background */}
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
      
      {/* Token input overlay */}
      {showTokenInput && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm z-20">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Configuration Mapbox
            </h3>
            <p className="text-muted-foreground mb-6">
              Pour afficher la carte, veuillez entrer votre token Mapbox public.
              <br />
              <a 
                href="https://account.mapbox.com/access-tokens/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                Obtenir un token Mapbox →
              </a>
            </p>
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <Input
                name="token"
                placeholder="pk.eyJ1..."
                required
                className="w-full"
              />
              <Button type="submit" className="w-full">
                Valider
              </Button>
            </form>
          </div>
        </div>
      )}
      
      {/* Loading indicator */}
      {!mapLoaded && !showTokenInput && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-lg font-semibold text-foreground">Chargement de la carte...</p>
          </div>
        </div>
      )}
      
      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-2xl space-y-8 animate-fade-in">
          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            <span className="px-5 py-2.5 rounded-full bg-white shadow-large text-success text-base font-bold border-2 border-success/20">
              🔒 100% Indépendant
            </span>
            <span className="px-5 py-2.5 rounded-full bg-white shadow-large text-accent text-base font-bold border-2 border-accent/20">
              ✅ 0% Commission
            </span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-foreground leading-tight font-heading drop-shadow-lg">
            Comparez les{" "}
            <span className="text-primary relative inline-block">
              meilleures cliniques FIV
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                <path d="M2 10C60 2, 140 2, 198 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
            {" "}d'Europe
          </h1>
          
          {/* Description */}
          <p className="text-xl text-foreground leading-relaxed font-medium drop-shadow">
            <span className="font-bold">Plateforme 100% indépendante.</span> Nous ne recevons aucune commission. 
            Recevez des devis personnalisés et parlez à une experte - gratuitement.
          </p>

          {/* Features */}
          <div className="space-y-4 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-large border-2 border-primary/10">
            {[
              "Aucune commission sur les cliniques",
              "Conseils 100% objectifs et personnalisés",
              "Devis détaillés et appel expert gratuit"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="bg-success p-2 rounded-full group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-foreground font-semibold text-lg">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 pt-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-glow group text-lg font-bold px-8 py-7 hover:scale-105 transition-all"
            >
              <NavLink to="/diagnostic" className="flex items-center gap-3">
                📋 Recevoir mes devis gratuits
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </NavLink>
            </Button>
            
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="bg-white/95 border-3 border-accent text-accent hover:bg-accent hover:text-white text-lg font-bold px-8 py-7 hover:scale-105 transition-all"
            >
              <a href="tel:+33123456789">
                📞 Parler à une experte PMA (gratuit)
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-6 pt-4">
            <div className="bg-white/95 p-5 rounded-2xl shadow-large border-2 border-primary/10">
              <div className="text-3xl font-extrabold text-primary font-heading">+50</div>
              <div className="text-sm font-semibold text-muted-foreground">Cliniques</div>
            </div>
            <div className="bg-white/95 p-5 rounded-2xl shadow-large border-2 border-accent/10">
              <div className="text-3xl font-extrabold text-accent font-heading">95%</div>
              <div className="text-sm font-semibold text-muted-foreground">Satisfaction</div>
            </div>
            <div className="bg-white/95 p-5 rounded-2xl shadow-large border-2 border-success/10">
              <div className="text-3xl font-extrabold text-success font-heading flex items-center gap-1">
                <MapPin className="w-6 h-6" />
                {clinics.length}
              </div>
              <div className="text-sm font-semibold text-muted-foreground">Pays</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
