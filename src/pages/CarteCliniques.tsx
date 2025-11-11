import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, X } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { updateClinicsWithCoordinates } from "@/scripts/updateClinicsWithCoordinates";

interface Clinic {
  id: string;
  name: string;
  city: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  rating: number | null;
  type: string;
}

const getStoredToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('mapbox_token') || '';
  }
  return '';
};

const CarteCliniques = () => {
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapboxToken, setMapboxToken] = useState(getStoredToken);
  const [showTokenInput, setShowTokenInput] = useState(!getStoredToken());
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [isGeocoding, setIsGeocoding] = useState(false);

  // Fetch clinics from database
  useEffect(() => {
    const fetchClinics = async () => {
      const { data, error } = await supabase
        .from('clinics')
        .select('id, name, city, country, latitude, longitude, rating, type');
      
      if (error) {
        console.error('Error fetching clinics:', error);
        toast.error('Erreur lors du chargement des cliniques');
        return;
      }
      
      setClinics(data || []);
    };
    
    fetchClinics();
  }, []);

  // Geocode clinics without coordinates
  const geocodeClinic = async (clinic: Clinic) => {
    if (!mapboxToken) return null;
    
    try {
      const query = encodeURIComponent(`${clinic.city}, ${clinic.country}`);
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxToken}&limit=1`
      );
      
      if (!response.ok) throw new Error('Geocoding failed');
      
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        
        // Update database
        const { error } = await supabase
          .from('clinics')
          .update({ latitude, longitude })
          .eq('id', clinic.id);
        
        if (error) {
          console.error('Error updating coordinates:', error);
          return null;
        }
        
        return { ...clinic, latitude, longitude };
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
    return null;
  };

  const geocodeAllClinics = async () => {
    setIsGeocoding(true);
    const clinicsToGeocode = clinics.filter(c => !c.latitude || !c.longitude);
    
    toast.info(`Géocodage de ${clinicsToGeocode.length} cliniques...`);
    
    let successCount = 0;
    for (const clinic of clinicsToGeocode) {
      const updated = await geocodeClinic(clinic);
      if (updated) {
        successCount++;
        setClinics(prev => prev.map(c => c.id === updated.id ? updated : c));
      }
      // Delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setIsGeocoding(false);
    toast.success(`${successCount} cliniques géocodées avec succès`);
  };

  useEffect(() => {
    if (!mapContainer.current || map.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;

      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/light-v11",
        center: [10, 48],
        zoom: 4.5,
        pitch: 45,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        "top-right"
      );

      map.current.on("load", () => {
        setMapLoaded(true);
        setShowTokenInput(false);
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      setShowTokenInput(true);
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Add markers when clinics data changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers
    const markers = document.querySelectorAll('.marker');
    markers.forEach(marker => marker.remove());

    // Add markers for clinics with coordinates
    clinics
      .filter(clinic => clinic.latitude && clinic.longitude)
      .forEach((clinic) => {
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

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-3">
            <h3 class="font-bold text-lg text-foreground">${clinic.name}</h3>
            <p class="text-sm text-muted-foreground">${clinic.city}, ${clinic.country}</p>
            ${clinic.rating ? `
              <div class="flex items-center gap-1 mt-2">
                <span class="text-yellow-500">★</span>
                <span class="font-semibold">${clinic.rating}</span>
              </div>
            ` : ''}
          </div>
        `);

        new mapboxgl.Marker(el)
          .setLngLat([clinic.longitude!, clinic.latitude!])
          .setPopup(popup)
          .addTo(map.current!);
      });
  }, [clinics, mapLoaded]);

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('token') as string;
    if (token) {
      localStorage.setItem('mapbox_token', token);
      setMapboxToken(token);
      setShowTokenInput(false);
      window.location.reload();
    }
  };

  const handleUpdateCoordinates = async () => {
    setIsGeocoding(true);
    try {
      const result = await updateClinicsWithCoordinates();
      toast.success(`✅ ${result.updated} cliniques mises à jour avec succès!`);
      
      // Recharger les cliniques
      const { data, error } = await supabase
        .from('clinics')
        .select('id, name, city, country, latitude, longitude, rating, type');
      
      if (!error && data) {
        setClinics(data);
      }
    } catch (error) {
      console.error('Error updating coordinates:', error);
      toast.error('Erreur lors de la mise à jour des coordonnées');
    } finally {
      setIsGeocoding(false);
    }
  };

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

        {/* Map */}
        <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
        
        {/* Token input overlay */}
        {showTokenInput && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm z-30">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-foreground">
                  Configuration Mapbox
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/")}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
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

        {/* Info panel */}
        {mapLoaded && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border-2 border-primary/10 max-w-lg">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {clinics.filter(c => c.latitude && c.longitude).length} / {clinics.length} cliniques localisées
            </h2>
            <p className="text-muted-foreground mb-3">
              Cliquez sur les marqueurs pour découvrir les cliniques FIV en Europe
            </p>
            {clinics.some(c => !c.latitude || !c.longitude) && (
              <div className="space-y-2">
                <Button 
                  onClick={handleUpdateCoordinates} 
                  disabled={isGeocoding}
                  size="sm"
                  variant="default"
                  className="w-full"
                >
                  {isGeocoding ? 'Mise à jour en cours...' : 'Mettre à jour depuis CSV'}
                </Button>
                <Button 
                  onClick={geocodeAllClinics} 
                  disabled={isGeocoding}
                  size="sm"
                  variant="outline"
                  className="w-full"
                >
                  {isGeocoding ? 'Géocodage en cours...' : 'Géocoder automatiquement'}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CarteCliniques;
