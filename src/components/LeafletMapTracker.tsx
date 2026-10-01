import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Compass, LocateFixed, CheckCircle2 } from 'lucide-react';

interface LeafletMapTrackerProps {
  originName: string;
  destinationName: string;
  waypoints: { x: number; y: number }[];
  isTracking: boolean;
}

export const LeafletMapTracker: React.FC<LeafletMapTrackerProps> = ({
  originName,
  destinationName,
  waypoints,
  isTracking,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsStatus, setGpsStatus] = useState<string>('Ready for GPS');

  // Default COEP University coordinates if GPS not requested
  const defaultLat = 18.5280;
  const defaultLng = 73.8550;
  const targetLat = userLocation ? userLocation.lat : defaultLat;
  const targetLng = userLocation ? userLocation.lng : defaultLng;

  const endLat = targetLat + 0.0035;
  const endLng = targetLng + 0.0040;

  // Real HTML5 Geolocation API trigger
  const handleFetchCurrentLocation = () => {
    if (!('geolocation' in navigator)) {
      setGpsStatus('Geolocation not supported');
      return;
    }

    setGpsStatus('Locating GPS...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserLocation(coords);
        setGpsStatus('GPS Location Fixed! 🟢');

        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([coords.lat, coords.lng], 16);
        }
      },
      (err) => {
        console.warn('Geolocation error:', err.message);
        setGpsStatus('Using Campus Coordinates');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView([targetLat, targetLng], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Start Pin 🟢
      const startIcon = L.divIcon({
        className: 'custom-start-pin',
        html: `<div style="background-color:#10B981; color:white; padding:4px 8px; border-radius:12px; font-weight:bold; font-size:10px; border:2px solid white; white-space:nowrap; box-shadow:0 2px 4px rgba(0,0,0,0.3);">🟢 START: ${originName}</div>`,
        iconSize: [120, 24],
        iconAnchor: [10, 12],
      });
      L.marker([targetLat, targetLng], { icon: startIcon }).addTo(map);

      // Destination Pin 🔴
      const endIcon = L.divIcon({
        className: 'custom-end-pin',
        html: `<div style="background-color:#E11D48; color:white; padding:4px 8px; border-radius:12px; font-weight:bold; font-size:10px; border:2px solid white; white-space:nowrap; box-shadow:0 2px 4px rgba(0,0,0,0.3);">🔴 END: ${destinationName}</div>`,
        iconSize: [120, 24],
        iconAnchor: [110, 12],
      });
      L.marker([endLat, endLng], { icon: endIcon }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [originName, destinationName, userLocation]);

  // Update polyline and marker
  useEffect(() => {
    if (!mapInstanceRef.current || waypoints.length === 0) return;

    const latLngs: L.LatLngTuple[] = waypoints.map((pt) => {
      const progress = (pt.x - 15) / 70;
      const interpolatedLat = targetLat + progress * (endLat - targetLat);
      const interpolatedLng = targetLng + progress * (endLng - targetLng);
      return [interpolatedLat, interpolatedLng];
    });

    if (polylineRef.current) {
      polylineRef.current.setLatLngs(latLngs);
    } else {
      polylineRef.current = L.polyline(latLngs, {
        color: '#84CC16',
        weight: 5,
        opacity: 0.9,
      }).addTo(mapInstanceRef.current);
    }

    const currentPos = latLngs[latLngs.length - 1];

    if (markerRef.current) {
      markerRef.current.setLatLng(currentPos);
    } else {
      const liveIcon = L.divIcon({
        className: 'custom-live-marker',
        html: `<div style="background-color:#84CC16; width:18px; height:18px; border-radius:50%; border:3px solid #0F172A; box-shadow: 0 0 10px #84CC16;"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });
      markerRef.current = L.marker(currentPos, { icon: liveIcon }).addTo(mapInstanceRef.current);
    }
  }, [waypoints, userLocation]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <button
          onClick={handleFetchCurrentLocation}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <LocateFixed className="w-3.5 h-3.5" />
          <span>Use Real GPS Location</span>
        </button>

        <span className="text-[11px] text-slate-300 font-mono">
          {gpsStatus} {userLocation && `(${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)})`}
        </span>
      </div>

      <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-slate-700 z-10">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
    </div>
  );
};
