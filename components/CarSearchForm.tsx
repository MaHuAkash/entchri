'use client';

import { useEffect, useRef } from 'react';

export default function CarSearchForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src =
      'https://tpembd.com/content?trs=504856&shmarker=297036&locale=en&default_pick_up_location=Vancouver%20International%20Airport&powered_by=true&border_radius=0&plain=false&show_logo=true&color_background=%232563EBFF&color_button=%2355a539&color_text=%23000000&color_input_text=%23000000&color_button_text=%23ffffff&promo_id=4480&campaign_id=10';
    script.async = true;
    script.setAttribute('charset', 'utf-8');

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current && script.parentNode === containerRef.current) {
        containerRef.current.removeChild(script);
      }
    };
  }, []);

  return <div ref={containerRef} className="car-search-widget" />;
}