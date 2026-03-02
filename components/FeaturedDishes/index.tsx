// components/FeaturedDishes.tsx
'use client';

import React, { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MenuItem } from '@/data/menu';

interface FeaturedDishesProps {
    items: MenuItem[];
}

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
        // scroll by one card width (~card + gap)
        const cardWidth = el.querySelector<HTMLElement>('[data-card]')?.offsetWidth ?? 280;
        el.scrollBy({ left: dir === 'left' ? -(cardWidth + 16) : (cardWidth + 16), behavior: 'smooth' });
    }, []);

    return (
        <section className="py-10 md:py-14 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-6xl font-bold boomboom">
                        Pakistan ka Best Roll Paratha
                    </h2>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            aria-label="Previous"
                            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 shadow-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            aria-label="Next"
                            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 shadow-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() => router.push('/menu')}
                            className="text-primary-600 hover:text-primary-700 font-medium text-sm md:text-base flex items-center gap-1.5 transition-colors ml-1"
                        >
                            View full menu
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Carousel — pure CSS scroll snap, no library */}
                <div
                    ref={scrollRef}
                    onScroll={updateScrollState}
                    className="
                        flex gap-4
                        overflow-x-auto
                        scroll-smooth
                        snap-x snap-mandatory
                        pb-2
                        -mx-4 px-4
                        sm:-mx-6 sm:px-6
                        lg:mx-0 lg:px-0
                        [scrollbar-width:none]
                        [&::-webkit-scrollbar]:hidden
                    "
                >
                    {featured.map((item) => (
                        <div
                            key={item.id}
                            data-card
                            className="
                                snap-start shrink-0
                                w-[calc(100%-2rem)]
                                sm:w-[calc(50%-8px)]
                                md:w-[calc(33.333%-11px)]
                                lg:w-[calc(25%-12px)]
                            "
                        >
                            <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                                {/* Image + Badges */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="(max-width: 640px) 90vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    {item.badge && (
                                        <div className="absolute top-3 left-3">
                                            <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-red-500 text-white rounded-full shadow-sm">
                                                {item.badge}
                                            </span>
                                        </div>
                                    )}
                                    {item.originalPrice && item.originalPrice > item.price && (
                                        <div className="absolute top-3 right-3">
                                            <span className="inline-block px-2.5 py-1 text-xs font-bold bg-green-600 text-white rounded-full shadow-sm">
                                                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4 flex flex-col grow">
                                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-2 min-h-10">
                                        {item.name}
                                    </h3>
                                    <p className="mt-1.5 text-sm text-gray-600 line-clamp-2 grow">
                                        {item.ingredients}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-lg font-bold text-gray-900">
                                                ${item.price.toFixed(2)}
                                            </span>
                                            {item.originalPrice && (
                                                <span className="text-sm text-gray-500 line-through">
                                                    ${item.originalPrice.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                                            onClick={() => console.log(`Added ${item.name} to cart`)}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedDishes;