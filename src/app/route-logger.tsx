'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteLogger() {
  const pathname = usePathname();

  useEffect(() => {
    console.log('Route changed to:', pathname);
  }, [pathname]);

  return null;
}