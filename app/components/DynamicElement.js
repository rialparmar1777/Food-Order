'use client';

import { useState, useEffect } from 'react';

export default function DynamicElement({ children, style, className }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
} 