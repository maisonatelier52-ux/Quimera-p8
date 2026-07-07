import React from 'react';
import Link from 'next/link';

export default async function CategoryAd() {
    let adImage = "/images/adv.png";
    let adLink = "#";

    try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/appearance` : "http://127.0.0.1:5000/api/appearance", { cache: 'no-store' });
        if (res.ok) {
            const appearance = await res.json();
            if (appearance) {
                adImage = appearance.categoryAdImage || "/images/adv.png";
                adLink = appearance.categoryAdLink || "#";
            }
        }
    } catch (error) {
        console.error("Failed to fetch appearance settings for CategoryAd:", error);
    }

    return (
        <section className="max-w-[1330px] mx-auto px-4 md:px-8 mb-4">
            <Link href={adLink} className="block w-full overflow-hidden rounded-none shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99]" target={adLink !== '#' ? "_blank" : "_self"}>
                <img
                    src={adImage}
                    alt="Advertisement"
                    className="w-full h-auto object-cover"
                />
            </Link>
        </section>
    );
}
