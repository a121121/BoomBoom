'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
    '/assets/hero1.webp',
    '/assets/hero2.webp',
];

export default function HeroSection() {
    const [current, setCurrent] = useState(0);

    // Auto change image every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000); // 5000ms = 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            className="relative mx-auto w-full overflow-hidden"
            role="banner"
            aria-label="Boom Boom Website Banner"
            style={{ height: '65vh', maxHeight: '65vh' }}
        >
            {/* Image Carousel */}
            {images.map((src, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <Image
                        src={src}
                        alt={`Banner ${index + 1}`}
                        fill
                        className="object-fill object-center"
                        priority={index === 0} // prioritize first image
                    />
                </div>
            ))}

            {/* Optional Content */}
            <div className="relative flex flex-col items-center justify-center h-full px-4">
                {/* You can put headings, buttons, etc. here */}
            </div>
        </section>
    );
}