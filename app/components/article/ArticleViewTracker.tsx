"use client";

import { useEffect, useRef } from "react";

export default function ArticleViewTracker({ slug }: { slug: string }) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!slug || hasTracked.current) return;
    
    const recordView = async () => {
      try {
        hasTracked.current = true;
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://localhost:5000')}/api/public/articles/${slug}/view`, {
          method: 'POST',
        });
      } catch (error) {
        console.error("Failed to record article view:", error);
      }
    };

    recordView();
  }, [slug]);

  return null;
}
