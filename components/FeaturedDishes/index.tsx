// components/FeaturedDishes.tsx
'use client';

import React, { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { MenuItem } from '@/data/menu';

interface FeaturedDishesProps {
    items: MenuItem[];
}

const CARD_ACCENTS = [
    { border: "border-red-400", top: "bg-red-500", badge: "bg-red-500", btn: "bg-red-600 hover:bg-red-700 shadow-red-300", shadow: "hover:shadow-red-200" },
    { border: "border-orange-400", top: "bg-orange-400", badge: "bg-orange-500", btn: "bg-orange-500 hover:bg-orange-600 shadow-orange-300", shadow: "hover:shadow-orange-200" },
    { border: "border-yellow-400", top: "bg-yellow-400", badge: "bg-yellow-500", btn: "bg-yellow-500 hover:bg-yellow-600 shadow-yellow-300", shadow: "hover:shadow-yellow-200" },
    { border: "border-rose-400", top: "bg-rose-500", badge: "bg-rose-500", btn: "bg-rose-600 hover:bg-rose-700 shadow-rose-300", shadow: "hover:shadow-rose-200" },
];

const FeaturedDishes: React.FC<FeaturedDishesProps> = ({ items }) => {
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const featured = items.slice(0, 6);

    const updateScrollState = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 8);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    }, []);

    const scroll = useCallback((dir: 'left' | 'right') => {
        const el = scrollRef.current;
        if (!el) return;
        const cardWidth = el.querySelector<HTMLElement>('[data-card]')?.offsetWidth ?? 280;
        el.scrollBy({ left: dir === 'left' ? -(cardWidth + 16) : (cardWidth + 16), behavior: 'smooth' });
    }, []);

    return (
        <section
            className="relative py-12 md:py-16 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #fff5f5 0%, #fff 50%, #fff8f0 100%)" }}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-red-100 opacity-50 blur-3xl" />
                <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-orange-100 opacity-50 blur-3xl" />
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full ${["bg-red-300", "bg-orange-300", "bg-yellow-300", "bg-rose-300", "bg-red-200", "bg-orange-200"][i]} opacity-25`}
                        style={{
                            width: [10, 16, 12, 8, 14, 10][i],
                            height: [10, 16, 12, 8, 14, 10][i],
                            top: `${[8, 20, 75, 12, 85, 55][i]}%`,
                            left: `${[4, 12, 6, 88, 85, 94][i]}%`,
                        }}
                        animate={{ y: [0, -12, 0], rotate: [0, 180, 360] }}
                        transition={{ duration: 3 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    />
                ))}
                {/* Zigzag top */}
                <svg className="absolute top-0 left-0 w-full opacity-10" height="24" viewBox="0 0 1200 24" preserveAspectRatio="none">
                    <polyline points="0,24 50,0 100,24 150,0 200,24 250,0 300,24 350,0 400,24 450,0 500,24 550,0 600,24 650,0 700,24 750,0 800,24 850,0 900,24 950,0 1000,24 1050,0 1100,24 1150,0 1200,24" fill="none" stroke="#dc2626" strokeWidth="3" />
                </svg>
                {/* Zigzag bottom */}
                <svg className="absolute bottom-0 left-0 w-full opacity-10" height="24" viewBox="0 0 1200 24" preserveAspectRatio="none">
                    <polyline points="0,0 50,24 100,0 150,24 200,0 250,24 300,0 350,24 400,0 450,24 500,0 550,24 600,0 650,24 700,0 750,24 800,0 850,24 900,0 950,24 1000,0 1050,24 1100,0 1150,24 1200,0" fill="none" stroke="#dc2626" strokeWidth="3" />
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <motion.div
                    className="flex items-center justify-between mb-8 md:mb-10 gap-4"
                    initial={{ opacity: 0, y: -24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div className="relative">
                        <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl uppercase text-gray-800 leading-tight">
                            Pakistan ka Best{" "}
                            <span className="text-red-600 relative inline-block">
                                Roll Paratha
                                {/* squiggle underline */}
                                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 300 10">
                                    <path d="M0,5 Q37.5,0 75,5 Q112.5,10 150,5 Q187.5,0 225,5 Q262.5,10 300,5" fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-2.5 flex-shrink-0">
                        {/* Prev */}
                        <motion.button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            aria-label="Previous"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.92 }}
                            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-red-400 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-md shadow-red-100 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </motion.button>

                        {/* Next */}
                        <motion.button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            aria-label="Next"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.92 }}
                            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-red-400 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-md shadow-red-100 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </motion.button>

                        {/* View menu */}
                        <motion.button
                            onClick={() => router.push('/menu')}
                            whileHover={{ scale: 1.04, rotate: -1 }}
                            whileTap={{ scale: 0.96 }}
                            className="ml-1 inline-flex items-center gap-1.5 bg-red-600 text-white font-body text-sm font-semibold px-4 py-2 rounded-full shadow-lg shadow-red-300 hover:bg-red-700 transition-colors"
                        >
                            View full menu
                            <ChevronRight className="w-4 h-4" />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Carousel */}
                <div
                    ref={scrollRef}
                    onScroll={updateScrollState}
                    className="
                        flex gap-4
                        overflow-x-auto
                        scroll-smooth
                        snap-x snap-mandatory
                        pb-4
                        -mx-4 px-4
                        sm:-mx-6 sm:px-6
                        lg:mx-0 lg:px-0
                        [scrollbar-width:none]
                        [&::-webkit-scrollbar]:hidden
                    "
                >
                    {featured.map((item, idx) => {
                        const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];
                        return (
                            <motion.div
                                key={item.id}
                                data-card
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="
                                    snap-start shrink-0
                                    w-[calc(100%-2rem)]
                                    sm:w-[calc(50%-8px)]
                                    md:w-[calc(33.333%-11px)]
                                    lg:w-[calc(25%-12px)]
                                "
                            >
                                <motion.div
                                    whileHover={{ y: -6, rotate: 0.4 }}
                                    transition={{ duration: 0.22 }}
                                    className={`group bg-white rounded-3xl overflow-hidden border-2 ${accent.border} shadow-lg ${accent.shadow} transition-shadow duration-300 h-full flex flex-col`}
                                >
                                    {/* Top accent stripe */}
                                    <div className={`h-1.5 w-full ${accent.top}`} />

                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            sizes="(max-width: 640px) 90vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                            className="object-cover group-hover:scale-108 transition-transform duration-500"
                                            loading="lazy"
                                        />

                                        {/* Badge */}
                                        {item.badge && (
                                            <div className="absolute top-3 left-3">
                                                <motion.span
                                                    initial={{ scale: 0, rotate: -15 }}
                                                    whileInView={{ scale: 1, rotate: -4 }}
                                                    transition={{ type: "spring", stiffness: 350, delay: 0.2 + idx * 0.06 }}
                                                    viewport={{ once: true }}
                                                    className={`inline-block px-2.5 py-1 text-xs font-heading ${accent.badge} text-white rounded-full shadow-md`}
                                                >
                                                    {item.badge}
                                                </motion.span>
                                            </div>
                                        )}

                                        {/* Discount */}
                                        {item.originalPrice && item.originalPrice > item.price && (
                                            <div className="absolute top-3 right-3">
                                                <motion.span
                                                    initial={{ scale: 0, rotate: 15 }}
                                                    whileInView={{ scale: 1, rotate: 4 }}
                                                    transition={{ type: "spring", stiffness: 350, delay: 0.25 + idx * 0.06 }}
                                                    viewport={{ once: true }}
                                                    className="inline-block px-2.5 py-1 text-xs font-heading bg-green-500 text-white rounded-full shadow-md"
                                                >
                                                    {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                                                </motion.span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 flex flex-col grow">
                                        <h3 className="font-heading text-lg text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 min-h-[2.5rem] leading-snug">
                                            {item.name}
                                        </h3>
                                        <p className="font-body mt-1.5 text-sm text-gray-500 line-clamp-2 grow">
                                            {item.ingredients}
                                        </p>

                                        {/* Price + Add */}
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-baseline gap-2">
                                                <span className="font-heading text-xl text-gray-800">
                                                    ${item.price.toFixed(2)}
                                                </span>
                                                {item.originalPrice && (
                                                    <span className="font-body text-sm text-gray-400 line-through">
                                                        ${item.originalPrice.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.07 }}
                                                whileTap={{ scale: 0.93 }}
                                                className={`px-4 py-2 ${accent.btn} text-white font-body text-sm font-semibold rounded-full shadow-md transition-colors`}
                                                onClick={() => console.log(`Added ${item.name} to cart`)}
                                            >
                                                Add +
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Bottom accent stripe */}
                                    <div className={`h-1.5 w-full ${accent.top}`} />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedDishes;