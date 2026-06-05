import React from 'react';
import Link from 'next/link';

export default function CategoryAd() {
    return (
        <section className="max-w-[1330px] mx-auto px-4 md:px-8 mb-4">
            <Link href="#" className="block w-full overflow-hidden rounded-none shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99]">
                <img
                    src="/images/adv.png"
                    alt="Advertisement"
                    className="w-full h-auto object-cover"
                />
            </Link>
        </section>
    );
}
