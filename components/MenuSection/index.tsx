'use client'

import React from "react";
import { motion } from "framer-motion";
import { MenuCategory, MenuItem } from "@/data/menu";
import MenuItemCard from "@/components/MenuItemCard";

interface MenuSectionProps {
    category: MenuCategory;
}

const MenuSection: React.FC<MenuSectionProps> = ({ category }) => {
    return (
        <section
            className="relative py-10 md:py-14 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #fff5f5 0%, #fff 50%, #fff8f0 100%)" }}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-red-100 opacity-40 blur-3xl" />
                <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-orange-100 opacity-40 blur-3xl" />
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full ${["bg-red-300", "bg-orange-300", "bg-yellow-300", "bg-rose-300", "bg-orange-200"][i]} opacity-25`}
                        style={{
                            width: [10, 14, 10, 8, 12][i],
                            height: [10, 14, 10, 8, 12][i],
                            top: `${[10, 22, 72, 14, 82][i]}%`,
                            left: `${[3, 10, 5, 90, 88][i]}%`,
                        }}
                        animate={{ y: [0, -12, 0], rotate: [0, 180, 360] }}
                        transition={{ duration: 3 + i * 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    />
                ))}
                <svg className="absolute top-0 left-0 w-full opacity-10" height="24" viewBox="0 0 1200 24" preserveAspectRatio="none">
                    <polyline points="0,24 50,0 100,24 150,0 200,24 250,0 300,24 350,0 400,24 450,0 500,24 550,0 600,24 650,0 700,24 750,0 800,24 850,0 900,24 950,0 1000,24 1050,0 1100,24 1150,0 1200,24" fill="none" stroke="#dc2626" strokeWidth="3" />
                </svg>
                <svg className="absolute bottom-0 left-0 w-full opacity-10" height="24" viewBox="0 0 1200 24" preserveAspectRatio="none">
                    <polyline points="0,0 50,24 100,0 150,24 200,0 250,24 300,0 350,24 400,0 450,24 500,0 550,24 600,0 650,24 700,0 750,24 800,0 850,24 900,0 950,24 1000,0 1050,24 1100,0 1150,24 1200,0" fill="none" stroke="#dc2626" strokeWidth="3" />
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section header */}
                <motion.div
                    className="mb-8 md:mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div className="inline-block relative">
                        <h2 className="font-heading text-3xl md:text-5xl uppercase text-gray-800 leading-tight">
                            {category.category}
                        </h2>
                        {/* Squiggle underline */}
                        <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 300 10">
                            <path d="M0,5 Q37.5,0 75,5 Q112.5,10 150,5 Q187.5,0 225,5 Q262.5,10 300,5" fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                    </div>
                </motion.div>

                {/* Mobile: horizontal scroll carousel */}
                <div className="sm:hidden -mx-4 px-4">
                    <div
                        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {category.items.map((item: MenuItem, i: number) => (
                            <div
                                key={item.id}
                                className="shrink-0 w-[72vw] max-w-[280px] snap-start"
                            >
                                <MenuItemCard item={item} index={i} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tablet+: responsive grid */}
                <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {category.items.map((item: MenuItem, i: number) => (
                        <MenuItemCard key={item.id} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MenuSection;