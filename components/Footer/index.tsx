'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-border/40">
            <div className="container mx-auto px-6 pb-4 md:pb-8">

                {/* Nav Links Row */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-2 md:mb-4"
                >
                    {[
                        { label: 'Menu', href: '/menu' },
                        { label: 'About', href: '/#about' },
                        { label: 'Contact', href: '/#contact' },
                        { label: 'Reservations', href: '/reservation' },
                    ].map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
                        >
                            {link.label}
                        </Link>
                    ))}
                </motion.div>

                {/* Divider */}
                <div className="w-full h-px bg-border/30 mb-8 md:mb-10" />

                {/* Bottom Row */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex flex-col items-center gap-6 md:grid md:grid-cols-3 md:items-center"
                >
                    {/* Socials — left */}
                    <div className="flex items-center justify-center gap-5 order-2 md:order-1 md:justify-start">
                        {[
                            { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/' },
                            { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/' },
                            { Icon: Twitter, label: 'Twitter', href: 'https://x.com/' },
                        ].map(({ Icon, label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                aria-label={label}
                                target="_blank"
                                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                            >
                                <Icon size={18} strokeWidth={1.5} />
                            </Link>
                        ))}
                    </div>

                    {/* Brand — true center */}
                    <h3 className="order-1 md:order-2 text-2xl font-light tracking-[0.35em] uppercase text-foreground text-center">
                        Qiolia
                    </h3>

                    {/* Copyright — right */}
                    <p className="order-3 text-xs tracking-wider text-muted-foreground/70 uppercase text-center md:text-right">
                        © {currentYear} All Rights Reserved
                    </p>
                </motion.div>

            </div>
        </footer>
    );
}