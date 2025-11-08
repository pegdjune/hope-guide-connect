import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Star } from 'lucide-react';

interface Clinic {
  id: number;
  name: string;
  country: string;
  city: string;
  rating: number;
  successRate: string;
  priceFrom: number;
  coordinates: [number, number]; // [longitude, latitude]
}

interface InteractiveMapProps {
  clinics: Clinic[];
  onClinicSelect?: (clinicId: number) => void;
}

const InteractiveMap = ({ clinics, onClinicSelect }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const initializeMap = () => {
    if (!mapContainer.current || !apiKey) return;

    mapboxgl.accessToken = apiKey;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [13.4, 49.5], // Centre de l'Europe
        zoom: 4,
        pitch: 30,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.on('load', () => {
        setIsMapInitialized(true);
        addClinicsToMap();
      });
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la carte:', error);
    }
  };

  const addClinicsToMap = () => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    clinics.forEach((clinic) => {
      const el = document.createElement('div');
      el.className = 'clinic-marker';
      el.innerHTML = `
        <div class="relative cursor-pointer group">
          <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg transition-all group-hover:scale-110 group-hover:shadow-xl">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="absolute -top-2 -right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
            ${clinic.rating}
          </div>
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
        .setHTML(`
          <div class="p-3 min-w-[200px]">
            <h3 class="font-semibold text-lg mb-2">${clinic.name}</h3>
            <p class="text-sm text-muted-foreground mb-2">${clinic.city}, ${clinic.country}</p>
            <div class="flex items-center gap-2 mb-2">
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="font-medium">${clinic.rating}</span>
              </div>
              <span class="text-xs">•</span>
              <span class="text-sm">${clinic.successRate} réussite</span>
            </div>
            <div class="text-sm font-semibold text-primary">À partir de ${clinic.priceFrom.toLocaleString()}€</div>
          </div>
        `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat(clinic.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      el.addEventListener('click', () => {
        if (onClinicSelect) {
          onClinicSelect(clinic.id);
        }
      });

      markersRef.current.push(marker);
    });
  };

  useEffect(() => {
    return () => {
      markersRef.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, []);

  if (!isMapInitialized && !apiKey) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Carte interactive des cliniques</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Visualisez l'emplacement de toutes les cliniques européennes sur une carte interactive. 
                Pour activer cette fonctionnalité, veuillez entrer votre clé API Mapbox.
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Obtenez gratuitement votre clé sur{' '}
                <a 
                  href="https://mapbox.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  mapbox.com
                </a>
              </p>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="pk.eyJ1IjoieW91ci1hcGkta2V5..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={initializeMap} disabled={!apiKey}>
                  Activer la carte
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-large">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg shadow-soft p-3">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium">{clinics.length} cliniques</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;