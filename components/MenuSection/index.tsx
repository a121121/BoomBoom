'use client'

import React, { useState } from "react";
import { Plus, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuCategory, MenuItem } from "@/data/menu";

interface MenuSectionProps {
    category: MenuCategory;
}

const CARD_ACCENTS = [
    { border: "border-red-400", top: "bg-red-500", text: "text-red-600", light: "bg-red-50", btn: "bg-red-600 hover:bg-red-700 shadow-red-300", shadow: "hover:shadow-red-200" },
    { border: "border-orange-400", top: "bg-orange-400", text: "text-orange-500", light: "bg-orange-50", btn: "bg-orange-500 hover:bg-orange-600 shadow-orange-300", shadow: "hover:shadow-orange-200" },
    { border: "border-yellow-400", top: "bg-yellow-400", text: "text-yellow-600", light: "bg-yellow-50", btn: "bg-yellow-500 hover:bg-yellow-600 shadow-yellow-300", shadow: "hover:shadow-yellow-200" },
    { border: "border-rose-400", top: "bg-rose-500", text: "text-rose-600", light: "bg-rose-50", btn: "bg-rose-600 hover:bg-rose-700 shadow-rose-300", shadow: "hover:shadow-rose-200" },
];

function MenuItemCard({ item, index }: { item: MenuItem; index: number }) {
    const [added, setAdded] = useState(false);
    const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

    const discountPercent =
        item.originalPrice && item.originalPrice > item.price
            ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
            : null;

    const handleAdd = () => {
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: (index % 4) * 0.07, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ y: -6, rotate: 0.3 }}
            className={`group bg-white rounded-3xl overflow-hidden border-2 ${accent.border} shadow-lg ${accent.shadow} transition-shadow duration-300 flex flex-col h-full`}
        >
            {/* Top stripe */}
            <div className={`h-1.5 w-full ${accent.top} shrink-0`} />

            {/* Image */}
            <div className="relative aspect-4/3 overflow-hidden bg-gray-100 shrink-0">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />

                {/* Item badge */}
                {item.badge && (
                    <div className="absolute top-3 left-3">
                        <motion.span
                            initial={{ scale: 0, rotate: -15 }}
                            whileInView={{ scale: 1, rotate: -4 }}
                            transition={{ type: "spring", stiffness: 350, delay: 0.15 + (index % 4) * 0.06 }}
                            viewport={{ once: true }}
                            className={`inline-block px-2.5 py-1 text-xs font-heading ${accent.top} text-white rounded-full shadow-md`}
                        >
                            {item.badge}
                        </motion.span>
                    </div>
                )}

                {/* Discount badge */}
                {discountPercent && (
                    <div className="absolute top-3 right-3">
                        <motion.span
                            initial={{ scale: 0, rotate: 15 }}
                            whileInView={{ scale: 1, rotate: 4 }}
                            transition={{ type: "spring", stiffness: 350, delay: 0.2 + (index % 4) * 0.06 }}
                            viewport={{ once: true }}
                            className="inline-block px-2.5 py-1 text-xs font-heading bg-green-500 text-white rounded-full shadow-md"
                        >
                            {discountPercent}% OFF
                        </motion.span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <h3 className={`font-heading text-xl text-gray-800 group-hover:${accent.text} transition-colors line-clamp-2 leading-snug mb-1.5`}>
                    {item.name}
                </h3>

                {item.ingredients && (
                    <p className="font-body text-sm text-gray-500 line-clamp-2 flex-1 mb-4">
                        {item.ingredients}
                    </p>
                )}

                <div className="flex items-center justify-between gap-2 mt-auto pt-1">
                    {/* Pricing */}
                    <div className="flex items-baseline gap-2">
                        <span className="font-heading text-xl text-gray-800">
                            ${item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                            <span className="font-body text-sm text-gray-400 line-through">
                                ${item.originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>

                    {/* Add to cart */}
                    <motion.button
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.91 }}
                        onClick={handleAdd}
                        className={`
                            cursor-pointer rounded-full px-4 py-2 flex items-center gap-1.5 font-body text-sm font-semibold
                            text-white shadow-md transition-colors duration-200
                            ${added ? "bg-green-500 shadow-green-300" : accent.btn}
                        `}
                    >
                        <AnimatePresence mode="wait">
                            {added ? (
                                <motion.span
                                    key="check"
                                    initial={{ scale: 0, rotate: -15 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                    className="flex items-center gap-1"
                                >
                                    <Check className="w-3.5 h-3.5" /> Added!
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="add"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="flex items-center gap-1"
                                >
                                    <Plus className="w-3.5 h-3.5" /> Add
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* Bottom stripe */}
            <div className={`h-1.5 w-full ${accent.top} shrink-0`} />
        </motion.div>
    );
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