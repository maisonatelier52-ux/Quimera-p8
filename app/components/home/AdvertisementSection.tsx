import React from 'react';

export default function AdvertisementSection() {
    return (
        <section className="w-full bg-white py-0">
            <div className="max-w-[1330px] mx-auto px-4">
                <div className="flex flex-col items-center">
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em] mb-3">
                        - Advertisement -
                    </span>
                    <div className="w-full max-w-[700px] overflow-hidden rounded-none shadow-sm">
                        <img
                            src="/images/adv2.png"
                            alt="Advertisement"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
