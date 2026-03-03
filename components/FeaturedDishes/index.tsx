'use client'

import React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "@/data/menu";
import MenuItemCard from "@/components/MenuItemCard";

interface FeaturedDishesProps {
    /** Array of featured menu items to display */
    items: MenuItem[];
    /** Section heading. Defaults to "Featured Dishes" */
    title?: string;
    /** Section sub-heading */
    subtitle?: string;
}

const FeaturedDishes: React.FC<FeaturedDishesProps> = ({
    items,
    title = "Pakistan ka best roll paratha",
    subtitle = "",
}) => {
    const featured = items.slice(0, 6);

    return (
        <section
            className="relative py-12 md:py-20 overflow-hidden"
            style={{ background: "linear-gradient(160deg, #fff8f0 0%, #fff 40%, #fff5f5 100%)" }}
        >
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-orange-100 opacity-50 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-red-100 opacity-40 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-yellow-100 opacity-40 blur-3xl" />

                {/* Floating dots */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full ${["bg-red-300", "bg-orange-300", "bg-yellow-300", "bg-rose-300", "bg-orange-200", "bg-red-200"][i]} opacity-30`}
                        style={{
                            width: [8, 12, 6, 10, 14, 8][i],
                            height: [8, 12, 6, 10, 14, 8][i],
                            top: `${[8, 18, 75, 85, 12, 70][i]}%`,
                            left: `${[5, 92, 3, 94, 48, 50][i]}%`,
                        }}
                        animate={{ y: [0, -10, 0], rotate: [0, 180, 360] }}
                        transition={{ duration: 3.5 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    />
                ))}

                {/* Top zigzag */}
                <svg className="absolute top-0 left-0 w-full opacity-10" height="24" viewBox="0 0 1200 24" preserveAspectRatio="none">
                    <polyline points="0,24 50,0 100,24 150,0 200,24 250,0 300,24 350,0 400,24 450,0 500,24 550,0 600,24 650,0 700,24 750,0 800,24 850,0 900,24 950,0 1000,24 1050,0 1100,24 1150,0 1200,24" fill="none" stroke="#f97316" strokeWidth="3" />
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <motion.div
                    className="text-center mb-10 md:mb-14"
                    initial={{ opacity: 0, y: -24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    {/* Decorative label */}


                    <div className="inline-block relative">
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

                    {subtitle && (
                        <p className="font-body text-gray-500 mt-5 text-base md:text-lg max-w-xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </motion.div>

                {/* Responsive carousel — 1 card mobile, 2 tablet, 3 desktop */}
                <div className="-mx-4 px-4">
                    <div
                        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {featured.map((item, i) => (
                            <div
                                key={item.id}
                                className="shrink-0 snap-start
                                    w-[78vw]
                                    sm:w-[46vw]
                                    lg:w-[30vw]
                                    xl:w-[calc(100%/3.2)]
                                    max-w-[360px]"
                            >
                                <MenuItemCard item={item} index={i} animationDelay={i * 0.08} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedDishes;