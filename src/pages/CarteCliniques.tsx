import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSEO } from "@/hooks/useSEO";

interface Clinic {
  id: string;
  name: string;
  city: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  rating: number | null;
  type: string;
  price_from: number | null;
}

// Coordonnées des villes européennes principales
const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  // Espagne
  "Madrid, Espagne": { lat: 40.4168, lng: -3.7038 },
  "Barcelone, Espagne": { lat: 41.3851, lng: 2.1734 },
  "Valence, Espagne": { lat: 39.4699, lng: -0.3763 },
  "Alicante, Espagne": { lat: 38.3452, lng: -0.4810 },
  "Bilbao, Espagne": { lat: 43.2630, lng: -2.9350 },
  "Marbella, Espagne": { lat: 36.5100, lng: -4.8860 },
  // France
  "Paris, France": { lat: 48.8566, lng: 2.3522 },
  "Lyon, France": { lat: 45.7640, lng: 4.8357 },
  "Marseille, France": { lat: 43.2965, lng: 5.3698 },
  "Bordeaux, France": { lat: 44.8378, lng: -0.5792 },
  "Toulouse, France": { lat: 43.6047, lng: 1.4442 },
  "Lille, France": { lat: 50.6292, lng: 3.0573 },
  "Nantes, France": { lat: 47.2184, lng: -1.5536 },
  "Nice, France": { lat: 43.7102, lng: 7.2620 },
  "Strasbourg, France": { lat: 48.5734, lng: 7.7521 },
  "Montpellier, France": { lat: 43.6108, lng: 3.8767 },
  "Rennes, France": { lat: 48.1173, lng: -1.6778 },
  "Rouen, France": { lat: 49.4432, lng: 1.0999 },
  "Besançon, France": { lat: 47.2378, lng: 6.0241 },
  "Clamart, France": { lat: 48.8000, lng: 2.2667 },
  // Allemagne
  "Berlin, Allemagne": { lat: 52.5200, lng: 13.4050 },
  "Munich, Allemagne": { lat: 48.1351, lng: 11.5820 },
  "Frankfurt, Allemagne": { lat: 50.1109, lng: 8.6821 },
  "Hamburg, Allemagne": { lat: 53.5511, lng: 9.9937 },
  "Cologne, Allemagne": { lat: 50.9375, lng: 6.9603 },
  "Düsseldorf, Allemagne": { lat: 51.2277, lng: 6.7735 },
  "Stuttgart, Allemagne": { lat: 48.7758, lng: 9.1829 },
  "Dortmund, Allemagne": { lat: 51.5136, lng: 7.4653 },
  "Leipzig, Allemagne": { lat: 51.3397, lng: 12.3731 },
  "Heidelberg, Allemagne": { lat: 49.3988, lng: 8.6724 },
  "Freiburg, Allemagne": { lat: 47.9990, lng: 7.8421 },
  // Grèce
  "Athènes, Grèce": { lat: 37.9838, lng: 23.7275 },
  "Thessalonique, Grèce": { lat: 40.6401, lng: 22.9444 },
  "Héraklion, Grèce": { lat: 35.3387, lng: 25.1442 },
  // Portugal
  "Lisbonne, Portugal": { lat: 38.7223, lng: -9.1393 },
  "Porto, Portugal": { lat: 41.1579, lng: -8.6291 },
  "Coimbra, Portugal": { lat: 40.2033, lng: -8.4103 },
  // Italie
  "Rome, Italie": { lat: 41.9028, lng: 12.4964 },
  "Milan, Italie": { lat: 45.4642, lng: 9.1900 },
  "Naples, Italie": { lat: 40.8518, lng: 14.2681 },
  "Florence, Italie": { lat: 43.7696, lng: 11.2558 },
  "Bologne, Italie": { lat: 44.4949, lng: 11.3426 },
  "Turin, Italie": { lat: 45.0703, lng: 7.6869 },
  "Padoue, Italie": { lat: 45.4064, lng: 11.8768 },
  // Royaume-Uni
  "Londres, Royaume-Uni": { lat: 51.5074, lng: -0.1278 },
  "Manchester, Royaume-Uni": { lat: 53.4808, lng: -2.2426 },
  "Birmingham, Royaume-Uni": { lat: 52.4862, lng: -1.8904 },
  "Glasgow, Royaume-Uni": { lat: 55.8642, lng: -4.2518 },
  "Édimbourg, Royaume-Uni": { lat: 55.9533, lng: -3.1883 },
  "Liverpool, Royaume-Uni": { lat: 53.4084, lng: -2.9916 },
  "Sheffield, Royaume-Uni": { lat: 53.3811, lng: -1.4701 },
  "Cambridge, Royaume-Uni": { lat: 52.2053, lng: 0.1218 },
  // Pologne
  "Varsovie, Pologne": { lat: 52.2297, lng: 21.0122 },
  "Cracovie, Pologne": { lat: 50.0647, lng: 19.9450 },
  "Wrocław, Pologne": { lat: 51.1079, lng: 17.0385 },
  "Poznań, Pologne": { lat: 52.4064, lng: 16.9252 },
  "Gdańsk, Pologne": { lat: 54.3520, lng: 18.6466 },
  "Łódź, Pologne": { lat: 51.7592, lng: 19.4560 },
  "Szczecin, Pologne": { lat: 53.4285, lng: 14.5528 },
  "Sosnowiec, Pologne": { lat: 50.2863, lng: 19.1040 },
  // Suisse
  "Zurich, Suisse": { lat: 47.3769, lng: 8.5417 },
  "Genève, Suisse": { lat: 46.2044, lng: 6.1432 },
  "Berne, Suisse": { lat: 46.9480, lng: 7.4474 },
  "Lausanne, Suisse": { lat: 46.5197, lng: 6.6323 },
  "Olten, Suisse": { lat: 47.3500, lng: 7.9000 },
  // Pays-Bas
  "Amsterdam, Pays-Bas": { lat: 52.3676, lng: 4.9041 },
  "Rotterdam, Pays-Bas": { lat: 51.9244, lng: 4.4777 },
  "Utrecht, Pays-Bas": { lat: 52.0907, lng: 5.1214 },
  "Maastricht, Pays-Bas": { lat: 50.8514, lng: 5.6909 },
  "Leiden, Pays-Bas": { lat: 52.1601, lng: 4.4970 },
  "Nimègue, Pays-Bas": { lat: 51.8126, lng: 5.8372 },
  // Suède
  "Stockholm, Suède": { lat: 59.3293, lng: 18.0686 },
  "Göteborg, Suède": { lat: 57.7089, lng: 11.9746 },
  "Malmö, Suède": { lat: 55.6050, lng: 13.0038 },
  "Uppsala, Suède": { lat: 59.8586, lng: 17.6389 },
  // Norvège
  "Oslo, Norvège": { lat: 59.9139, lng: 10.7522 },
  "Bergen, Norvège": { lat: 60.3913, lng: 5.3221 },
  "Trondheim, Norvège": { lat: 63.4305, lng: 10.3951 },
  // Finlande
  "Helsinki, Finlande": { lat: 60.1699, lng: 24.9384 },
  "Tampere, Finlande": { lat: 61.4978, lng: 23.7610 },
  // Irlande
  "Dublin, Irlande": { lat: 53.3498, lng: -6.2603 },
  "Cork, Irlande": { lat: 51.8985, lng: -8.4756 },
  // Hongrie
  "Budapest, Hongrie": { lat: 47.4979, lng: 19.0402 },
  // Roumanie
  "Bucarest, Roumanie": { lat: 44.4268, lng: 26.1025 },
  "Cluj-Napoca, Roumanie": { lat: 46.7712, lng: 23.6236 },
  "Timișoara, Roumanie": { lat: 45.7489, lng: 21.2087 },
  "Iași, Roumanie": { lat: 47.1585, lng: 27.6014 },
  // Serbie
  "Belgrade, Serbie": { lat: 44.7866, lng: 20.4489 },
  "Novi Sad, Serbie": { lat: 45.2671, lng: 19.8335 },
  // Slovaquie
  "Bratislava, Slovaquie": { lat: 48.1486, lng: 17.1077 },
  "Nitra, Slovaquie": { lat: 48.3069, lng: 18.0864 },
  // Slovénie
  "Ljubljana, Slovénie": { lat: 46.0569, lng: 14.5058 },
  "Maribor, Slovénie": { lat: 46.5547, lng: 15.6459 },
  "Postojna, Slovénie": { lat: 45.7741, lng: 14.2152 },
  // Lituanie
  "Vilnius, Lituanie": { lat: 54.6872, lng: 25.2797 },
  "Kaunas, Lituanie": { lat: 54.8985, lng: 23.9036 },
  // Lettonie
  "Riga, Lettonie": { lat: 56.9496, lng: 24.1052 },
  // Géorgie
  "Tbilisi, Géorgie": { lat: 41.7151, lng: 44.8271 },
  // Macédoine
  "Skopje, Macédoine du Nord": { lat: 41.9981, lng: 21.4254 },
  // Israël
  "Tel Aviv, Israël": { lat: 32.0853, lng: 34.7818 },
  "Jérusalem, Israël": { lat: 31.7683, lng: 35.2137 },
  "Haïfa, Israël": { lat: 32.7940, lng: 34.9896 },
  "Herzliya, Israël": { lat: 32.1663, lng: 34.8436 },
  "Ramat Gan, Israël": { lat: 32.0700, lng: 34.8240 },
  "Rehovot, Israël": { lat: 31.8928, lng: 34.8113 },
  // Russie
  "Moscou, Russie": { lat: 55.7558, lng: 37.6173 },
  "Saint-Pétersbourg, Russie": { lat: 59.9343, lng: 30.3351 },
  // Ukraine
  "Kyiv, Ukraine": { lat: 50.4501, lng: 30.5234 },
  "Kharkiv, Ukraine": { lat: 49.9935, lng: 36.2304 },
  // Turquie
  "Istanbul, Turquie": { lat: 41.0082, lng: 28.9784 },
  "Ankara, Turquie": { lat: 39.9334, lng: 32.8597 },
  "Nicosie, Turquie": { lat: 35.1856, lng: 33.3823 },
  "Famagouste, Turquie": { lat: 35.1174, lng: 33.9414 },
  "Chypre du Nord, Turquie": { lat: 35.2480, lng: 33.6577 },
  // Maroc
  "Casablanca, Maroc": { lat: 33.5731, lng: -7.5898 },
  "Rabat, Maroc": { lat: 34.0209, lng: -6.8416 },
  "Marrakech, Maroc": { lat: 31.6295, lng: -7.9811 },
  "Tanger, Maroc": { lat: 35.7595, lng: -5.8340 },
  "Agadir, Maroc": { lat: 30.4278, lng: -9.5981 },
  // Tunisie
  "Tunis, Tunisie": { lat: 36.8065, lng: 10.1815 },
  "Sousse, Tunisie": { lat: 35.8256, lng: 10.6084 },
  "Sfax, Tunisie": { lat: 34.7406, lng: 10.7603 },
};

const CarteCliniques = () => {
  useSEO({
    title: "Carte des Cliniques FIV en Europe",
    description: "Explorez la carte interactive des cliniques de fertilité en Europe. Localisez les meilleures cliniques FIV proches de chez vous.",
    type: "website",
  });

  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Mapbox token from Edge Function
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-mapbox-token');
        
        if (error) throw error;
        if (data?.token) {
          setMapboxToken(data.token);
        } else {
          throw new Error('Token not found');
        }
      } catch (err) {
        console.error('Error fetching Mapbox token:', err);
        setError('Impossible de charger la carte. Token Mapbox manquant.');
      }
    };
    
    fetchToken();
  }, []);

  // Fetch clinics from database
  useEffect(() => {
    const fetchClinics = async () => {
      const { data, error } = await supabase
        .from('clinics')
        .select('id, name, city, country, latitude, longitude, rating, type, price_from');
      
      if (error) {
        console.error('Error fetching clinics:', error);
        toast.error('Erreur lors du chargement des cliniques');
        return;
      }
      
      // Enrichir les cliniques sans coordonnées avec les coordonnées statiques
      const enrichedClinics = (data || []).map(clinic => {
        if (!clinic.latitude || !clinic.longitude) {
          const key = `${clinic.city}, ${clinic.country}`;
          const coords = CITY_COORDINATES[key];
          if (coords) {
            return {
              ...clinic,
              latitude: coords.lat + (Math.random() - 0.5) * 0.02, // Petit offset pour éviter superposition
              longitude: coords.lng + (Math.random() - 0.5) * 0.02,
            };
          }
        }
        return clinic;
      });
      
      setClinics(enrichedClinics);
      setLoading(false);
    };
    
    fetchClinics();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;

      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/light-v11",
        center: [10, 48],
        zoom: 4,
        pitch: 30,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        "top-right"
      );

      // Hide Mapbox attribution
      map.current.on("load", () => {
        setMapLoaded(true);
        
        // Masquer le logo et l'attribution Mapbox
        const attribControls = document.querySelectorAll('.mapboxgl-ctrl-attrib, .mapboxgl-ctrl-logo');
        attribControls.forEach(el => {
          (el as HTMLElement).style.display = 'none';
        });
      });
    } catch (err) {
      console.error("Error initializing map:", err);
      setError('Erreur lors de l\'initialisation de la carte');
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Add markers when clinics data changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers
    const markers = document.querySelectorAll('.clinic-marker');
    markers.forEach(marker => marker.remove());

    // Add markers for clinics with coordinates
    const clinicsWithCoords = clinics.filter(clinic => clinic.latitude && clinic.longitude);
    
    clinicsWithCoords.forEach((clinic) => {
      const el = document.createElement("div");
      el.className = "clinic-marker";
      el.style.width = "36px";
      el.style.height = "36px";
      el.style.cursor = "pointer";
      
      const markerIcon = document.createElement("div");
      markerIcon.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: hsl(var(--primary)); border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 2px solid white; transition: transform 0.2s;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
      `;
      el.appendChild(markerIcon);
      
      el.addEventListener('mouseenter', () => {
        const inner = el.querySelector('div > div') as HTMLElement;
        if (inner) inner.style.transform = 'scale(1.2)';
      });
      el.addEventListener('mouseleave', () => {
        const inner = el.querySelector('div > div') as HTMLElement;
        if (inner) inner.style.transform = 'scale(1)';
      });

      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(`
        <div style="padding: 12px; min-width: 200px;">
          <h3 style="font-weight: 700; font-size: 16px; margin-bottom: 4px;">${clinic.name}</h3>
          <p style="font-size: 13px; color: #666; margin-bottom: 8px;">${clinic.city}, ${clinic.country}</p>
          <div style="display: flex; align-items: center; gap: 12px;">
            ${clinic.rating ? `
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="color: #f59e0b;">★</span>
                <span style="font-weight: 600;">${clinic.rating}</span>
              </div>
            ` : ''}
            ${clinic.price_from ? `
              <div style="font-weight: 600; color: hsl(var(--primary));">
                À partir de ${clinic.price_from.toLocaleString()}€
              </div>
            ` : ''}
          </div>
        </div>
      `);

      new mapboxgl.Marker(el)
        .setLngLat([clinic.longitude!, clinic.latitude!])
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [clinics, mapLoaded]);

  const clinicsWithCoords = clinics.filter(c => c.latitude && c.longitude);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="flex-1 relative pt-16">
        {/* Back button */}
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          size="lg"
          className="absolute top-24 left-4 z-20 bg-white/95 backdrop-blur-sm shadow-lg hover:scale-105 transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour
        </Button>

        {/* Comparateur button */}
        <Button
          onClick={() => navigate("/comparateur")}
          variant="default"
          size="lg"
          className="absolute top-24 right-4 z-20 bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-all"
        >
          Comparateur de cliniques
        </Button>

        {/* Map container */}
        <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
        
        {/* Error overlay */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm z-30">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Erreur de chargement
              </h3>
              <p className="text-muted-foreground mb-6">
                {error}
              </p>
              <Button onClick={() => navigate("/")} variant="outline">
                Retour à l'accueil
              </Button>
            </div>
          </div>
        )}
        
        {/* Loading indicator */}
        {(loading || (!mapLoaded && !error)) && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20">
            <div className="text-center">
              <RefreshCw className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
              <p className="text-lg font-semibold text-foreground">Chargement de la carte...</p>
              <p className="text-sm text-muted-foreground mt-2">{clinics.length} cliniques à afficher</p>
            </div>
          </div>
        )}

        {/* Info panel */}
        {mapLoaded && !error && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border-2 border-primary/10 max-w-lg">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {clinicsWithCoords.length} cliniques sur la carte
            </h2>
            <p className="text-muted-foreground">
              Cliquez sur les marqueurs pour découvrir les cliniques FIV en Europe
            </p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CarteCliniques;
