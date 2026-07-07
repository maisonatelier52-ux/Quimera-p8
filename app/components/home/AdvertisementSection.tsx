import React from 'react';

export default async function AdvertisementSection() {
    let adImage = "/images/adv2.png";
    let adLink = "#";

    try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/appearance` : "http://127.0.0.1:5000/api/appearance", { cache: 'no-store' });
        if (res.ok) {
            const appearance = await res.json();
            if (appearance) {
                adImage = appearance.homeAdImage || "/images/adv2.png";
                adLink = appearance.homeAdLink || "#";
            }
        }
    } catch (error) {
        console.error("Failed to fetch appearance settings for AdvertisementSection:", error);
    }

    return (
        <section className="w-full bg-white py-0">
            <div className="max-w-[1330px] mx-auto px-4">
                <div className="flex flex-col items-center">
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em] mb-3">
                        - Advertisement -
                    </span>
                    <div className="w-full max-w-[700px] overflow-hidden rounded-none shadow-sm">
                        <a href={adLink} target="_blank" rel="noopener noreferrer">
                            <img
                                src={adImage}
                                alt="Advertisement"
                                className="w-full h-auto object-cover hover:opacity-95 transition-opacity"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
