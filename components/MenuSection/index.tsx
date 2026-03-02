// components/MenuSection.tsx
'use client'

import React from "react";
import Slider from "react-slick";
import { MenuCategory, MenuItem } from "@/data/menu"; // adjust path

interface MenuSectionProps {
    category: MenuCategory;
    // You can later pass all categories and map them if needed
}

const MenuSection: React.FC<MenuSectionProps> = ({ category }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024, // lg
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, // md
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640, // sm
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true, // still show arrows on mobile (can hide if you prefer)
                },
            },
        ],
    };

    return (
        <section className="py-10 md:py-14 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold boomboom">
                        {category.category}
                    </h2>

                    <button
                        className="
              text-primary-600 hover:text-primary-700 
              font-medium text-sm md:text-base
              flex items-center gap-1.5 transition-colors
            "
                        onClick={() => {
                            // TODO: navigate to full category page
                            console.log("View all", category.category);
                        }}
                    >
                        View all
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>

                {/* Carousel */}
                <div className="menu-carousel -mx-2 sm:-mx-3">
                    <Slider {...settings}>
                        {category.items.map((item: MenuItem) => (
                            <div key={item.id} className="px-2 sm:px-3">
                                <div
                                    className="
                    group bg-white rounded-xl overflow-hidden 
                    shadow-sm hover:shadow-md transition-all duration-300
                    h-full flex flex-col
                  "
                                >
                                    {/* Image */}
                                    <div className="relative aspect-4/3 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="
                        w-full h-full object-cover 
                        group-hover:scale-105 transition-transform duration-500
                      "
                                            loading="lazy"
                                        />

                                        {/* Badge */}
                                        {item.badge && (
                                            <div className="absolute top-3 left-3">
                                                <span
                                                    className="
                            inline-block px-2.5 py-1 text-xs font-semibold
                            bg-red-500 text-white rounded-full
                            shadow-sm
                          "
                                                >
                                                    {item.badge}
                                                </span>
                                            </div>
                                        )}

                                        {/* Discount pill if originalPrice exists */}
                                        {item.originalPrice && item.originalPrice > item.price && (
                                            <div className="absolute top-3 right-3">
                                                <span
                                                    className="
                            inline-block px-2.5 py-1 text-xs font-bold
                            bg-green-600 text-white rounded-full
                            shadow-sm
                          "
                                                >
                                                    {Math.round(
                                                        ((item.originalPrice - item.price) /
                                                            item.originalPrice) *
                                                        100
                                                    )}
                                                    % OFF
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 flex flex-col grow">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-2 min-h-10 ">
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
                                                className="
                          px-4 py-2 bg-primary-600 text-white text-sm font-medium
                          rounded-lg hover:bg-primary-700 transition-colors
                        "
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

export default MenuSection;