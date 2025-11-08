import React, { useState } from 'react';
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
  const [selectedClinic, setSelectedClinic] = useState<number | null>(null);
  const [hoveredClinic, setHoveredClinic] = useState<number | null>(null);

  // Position mapping for visual representation (percentage-based)
  const cityPositions: { [key: string]: { left: string; top: string } } = {
    'Prague': { left: '52%', top: '35%' },
    'Barcelone': { left: '24%', top: '58%' },
    'Athènes': { left: '68%', top: '68%' },
  };

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-large bg-gradient-to-br from-primary/5 via-accent-light/5 to-background">
      {/* Background map illustration */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 800 600" className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border"/>
            </pattern>
          </defs>
          <rect width="800" height="600" fill="url(#grid)" />
          
          {/* Simplified Europe map paths */}
          <path d="M 200 250 Q 250 200 300 220 L 350 200 L 400 240 L 450 230 L 500 280 L 480 350 L 400 380 L 350 360 L 300 340 L 250 320 Z" 
                className="fill-primary/10 stroke-primary/30" strokeWidth="2"/>
          <path d="M 450 400 L 500 420 L 550 450 L 520 480 L 480 460 Z" 
                className="fill-primary/10 stroke-primary/30" strokeWidth="2"/>
        </svg>
      </div>

      {/* Clinic markers */}
      {clinics.map((clinic) => {
        const position = cityPositions[clinic.city];
        const isHovered = hoveredClinic === clinic.id;
        const isSelected = selectedClinic === clinic.id;

        return (
          <div
            key={clinic.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer z-10"
            style={{ left: position.left, top: position.top }}
            onMouseEnter={() => setHoveredClinic(clinic.id)}
            onMouseLeave={() => setHoveredClinic(null)}
            onClick={() => {
              setSelectedClinic(clinic.id === selectedClinic ? null : clinic.id);
              if (onClinicSelect) onClinicSelect(clinic.id);
            }}
          >
            {/* Marker pulse animation */}
            <div className={`absolute inset-0 rounded-full bg-primary/30 animate-ping ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
            
            {/* Marker */}
            <div className={`relative transition-all duration-300 ${isHovered || isSelected ? 'scale-110' : 'scale-100'}`}>
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-large hover:shadow-xl">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold shadow-soft">
                <Star className="w-3 h-3 fill-current" />
              </div>
            </div>

            {/* Popup */}
            {(isHovered || isSelected) && (
              <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 w-64 bg-background/98 backdrop-blur-sm rounded-lg shadow-large p-4 border border-border animate-in fade-in slide-in-from-top-2 duration-200 z-20">
                <h3 className="font-semibold text-lg mb-2 text-foreground">{clinic.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {clinic.city}, {clinic.country}
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent fill-current" />
                    <span className="font-medium text-foreground">{clinic.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{clinic.successRate} réussite</span>
                </div>
                <div className="text-sm font-semibold text-primary">
                  À partir de {clinic.priceFrom.toLocaleString()}€
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Info badge */}
      <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg shadow-soft p-3">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium text-foreground">{clinics.length} cliniques</span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg shadow-soft p-3">
        <div className="text-xs text-muted-foreground mb-2">Cliquez sur un marqueur</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-full" />
          <span className="text-xs text-foreground">Clinique partenaire</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;