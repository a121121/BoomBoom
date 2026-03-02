// components/FeaturedDishes.tsx
'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MenuItem } from '@/data/menu';

interface FeaturedDishesProps {
    items: MenuItem[];
}

const FeaturedDishes: React.FC<FeaturedDishesProps> = ({ items }) => {
    const router = useRouter();
    const sliderRef = useRef<Slider>(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false, // disable built-in ugly arrows
        autoplay: false,
        pauseOnHover: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    return (
        <section className="py-10 md:py-14 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-6xl font-bold boomboom">
                        Pakistan ka Best Roll Paratha
                    </h2>

                    <div className="flex items-center gap-3">
                        {/* Custom prev/next buttons */}
                        <button
                            onClick={() => sliderRef.current?.slickPrev()}
                            aria-label="Previous"
                            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 shadow-sm transition-all duration-200"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => sliderRef.current?.slickNext()}
                            aria-label="Next"
                            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 shadow-sm transition-all duration-200"
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

                {/* Carousel */}
                <div className="-mx-2 sm:-mx-3">
                    <Slider ref={sliderRef} {...settings}>
                        {items.slice(0, 6).map((item) => (
                            <div key={item.id} className="px-2 sm:px-3">
                                <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                                    {/* Image + Badges */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default FeaturedDishes;