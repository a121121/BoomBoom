'use client'

import React, { useState } from "react";
import { Plus, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/data/menu";
import { useCart } from "../CartProvider";

export const CARD_ACCENTS = [
    { border: "border-red-400", top: "bg-red-500", text: "text-red-600", light: "bg-red-50", btn: "bg-red-600 hover:bg-red-700 shadow-red-300", shadow: "hover:shadow-red-200" },
    { border: "border-orange-400", top: "bg-orange-400", text: "text-orange-500", light: "bg-orange-50", btn: "bg-orange-500 hover:bg-orange-600 shadow-orange-300", shadow: "hover:shadow-orange-200" },
    { border: "border-yellow-400", top: "bg-yellow-400", text: "text-yellow-600", light: "bg-yellow-50", btn: "bg-yellow-500 hover:bg-yellow-600 shadow-yellow-300", shadow: "hover:shadow-yellow-200" },
    { border: "border-rose-400", top: "bg-rose-500", text: "text-rose-600", light: "bg-rose-50", btn: "bg-rose-600 hover:bg-rose-700 shadow-rose-300", shadow: "hover:shadow-rose-200" },
];

export interface MenuItemCardProps {
    item: MenuItem;
    /** Index used for accent colour cycling and stagger animation delay */
    index: number;
    /** Override the animation entrance delay (seconds). Defaults to (index % 4) * 0.07 */
    animationDelay?: number;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, index, animationDelay }) => {
    const [added, setAdded] = useState(false);
    const { addItem } = useCart();
    const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

    const discountPercent =
        item.originalPrice && item.originalPrice > item.price
            ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
            : null;

    const delay = animationDelay ?? (index % 4) * 0.07;

    const handleAdd = () => {
        addItem(item);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay, ease: "easeOut" }}
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
};

export default MenuItemCard;