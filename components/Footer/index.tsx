'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const SOCIAL_ACCENTS = [
    { border: "border-rose-400", bg: "bg-rose-50", text: "text-rose-600", hover: "hover:bg-rose-600" },
    { border: "border-blue-400", bg: "bg-blue-50", text: "text-blue-600", hover: "hover:bg-blue-600" },
    { border: "border-sky-400", bg: "bg-sky-50", text: "text-sky-500", hover: "hover:bg-sky-500" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { label: 'Menu', href: '/menu', emoji: '🍽️' },
        { label: 'About', href: '/#about', emoji: '✨' },
        { label: 'Contact', href: '/#contact', emoji: '📍' },
        { label: 'Reservations', href: '/reservation', emoji: '📅' },
    ];

    const socials = [
        { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/' },
        { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/' },
        { Icon: Twitter, label: 'Twitter', href: 'https://x.com/' },
    ];

    return (
        <footer
            className="relative overflow-hidden"
            style={{ background: "linear-gradient(160deg, #fff5f5 0%, #fff 50%, #fff8f0 100%)" }}
        >
            {/* Top zigzag border */}
            <div className="w-full overflow-hidden h-6 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 1200 24" preserveAspectRatio="none">
                    <polyline points="0,0 50,24 100,0 150,24 200,0 250,24 300,0 350,24 400,0 450,24 500,0 550,24 600,0 650,24 700,0 750,24 800,0 850,24 900,0 950,24 1000,0 1050,24 1100,0 1150,24 1200,0" fill="none" stroke="#dc2626" strokeWidth="3" />
                </svg>
            </div>

            {/* Background floating dots */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-red-100 opacity-40 blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-orange-100 opacity-40 blur-3xl" />
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full ${["bg-red-300", "bg-orange-300", "bg-yellow-300", "bg-rose-300", "bg-orange-200"][i]} opacity-20`}
                        style={{
                            width: [10, 14, 8, 12, 10][i],
                            height: [10, 14, 8, 12, 10][i],
                            top: `${[20, 50, 70, 30, 80][i]}%`,
                            left: `${[5, 15, 80, 88, 50][i]}%`,
                        }}
                        animate={{ y: [0, -10, 0], rotate: [0, 180, 360] }}
                        transition={{ duration: 3.5 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 pt-8 pb-6 relative z-10">

                {/* Brand centre */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center mb-7"
                >
                    <div className="relative inline-block mb-1">
                        <h3 className="font-heading text-4xl md:text-5xl uppercase text-gray-800">
                            Boom <span className="text-red-600">Boom</span>
                        </h3>
                        {/* Squiggle underline */}
                        <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 300 10">
                            <path d="M0,5 Q37.5,0 75,5 Q112.5,10 150,5 Q187.5,0 225,5 Q262.5,10 300,5" fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                    </div>
                    <p className="font-body text-sm text-gray-400 mt-4">Pakistan ka #1 Roll Paratha 🔥</p>
                </motion.div>

                {/* Nav links */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap items-center justify-center gap-2 mb-7"
                >
                    {navLinks.map((link, i) => (
                        <motion.div key={link.label} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href={link.href}
                                className="inline-flex items-center gap-1.5 font-body text-sm font-semibold px-4 py-2 rounded-full border-2 border-transparent text-gray-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all duration-200"
                            >
                                <span>{link.emoji}</span>
                                {link.label}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Divider — dotted red */}
                <div className="flex items-center gap-3 mb-7">
                    <div className="flex-1 border-t-2 border-dashed border-red-200" />
                    <span className="text-red-400 text-lg">🌶️</span>
                    <div className="flex-1 border-t-2 border-dashed border-red-200" />
                </div>

                {/* Bottom row */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col items-center gap-5 md:flex-row md:justify-between md:items-center"
                >
                    {/* Socials */}
                    <div className="flex items-center gap-3">
                        {socials.map(({ Icon, label, href }, i) => {
                            const a = SOCIAL_ACCENTS[i];
                            return (
                                <motion.a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.12, rotate: -6 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`w-9 h-9 flex items-center justify-center rounded-full border-2 ${a.border} ${a.bg} ${a.text} ${a.hover} hover:text-white transition-all duration-200 shadow-sm`}
                                >
                                    <Icon size={15} strokeWidth={2} />
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* Copyright */}
                    <p className="font-body text-xs text-gray-400 uppercase tracking-wider text-center">
                        © {currentYear} Boom Boom. All Rights Reserved.
                    </p>

                    {/* Made with love */}
                    <motion.div
                        animate={{ scale: [1, 1.12, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                        className="inline-flex items-center gap-1.5 bg-red-600 text-white font-body text-xs font-semibold px-3 py-1.5 rounded-full shadow-md shadow-red-300"
                    >
                        Made with ❤️ & 🌶️
                    </motion.div>
                </motion.div>

            </div>

            {/* Bottom stripe — red + orange */}
            <div className="flex h-2">
                <div className="flex-1 bg-red-500" />
                <div className="flex-1 bg-orange-400" />
                <div className="flex-1 bg-yellow-400" />
                <div className="flex-1 bg-rose-500" />
            </div>
        </footer>
    );
}