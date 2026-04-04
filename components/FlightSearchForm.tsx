'use client';

import { useEffect, useRef } from 'react';

export default function FlightSearchForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the script element
    const script = document.createElement('script');
    script.src =
      'https://tpembd.com/content?currency=usd&trs=514975&shmarker=297036&show_hotels=true&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%2332a8dd&color_button=%2332a8dd&color_icons=%2332a8dd&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&plain=false&promo_id=7879&campaign_id=100';
    script.async = true;
    script.setAttribute('charset', 'utf-8');

    // Append script to the container
    containerRef.current.appendChild(script);

    // Cleanup: remove script when component unmounts
    return () => {
      if (containerRef.current && script.parentNode === containerRef.current) {
        containerRef.current.removeChild(script);
      }
    };
  }, []);

  return <div ref={containerRef} className="flight-search-widget" />;
}