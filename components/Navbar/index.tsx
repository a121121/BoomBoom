'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, ShoppingCart, LogIn, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useCart } from '../CartProvider'; // adjust path as needed

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { totalItems, setIsOpen: openCart } = useCart();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { href: '/menu', label: 'Menu', emoji: '' },
        { href: '/reservation', label: 'Reservation', emoji: '' },
        { href: '#contact', label: 'Contact', emoji: '' },
    ];

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    scrolled
                        ? 'bg-white/90 backdrop-blur-md shadow-md shadow-red-100 border-b-2 border-red-300'
                        : 'bg-white/70 backdrop-blur-sm border-b-2 border-red-200'
                )}
            >
                {/* Top zigzag accent */}


                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                    {/* Left: Hamburger (mobile) + Logo */}
                    <div className="flex items-center gap-3">
                        <motion.button
                            whileTap={{ scale: 0.88 }}
                            onClick={() => setOpen(true)}
                            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border-2 border-red-400 bg-red-50 text-red-600 shadow-sm"
                            aria-label="Open menu"
                        >
                            <Menu className="h-5 w-5" />
                        </motion.button>

                        <Link href="/" className="flex items-center gap-2.5 group">
                            <motion.div whileHover={{ rotate: -8, scale: 1.08 }} transition={{ type: 'spring', stiffness: 400 }}>
                                <Image src="/assets/logo.svg" alt="Logo" width={40} height={40} />
                            </motion.div>
                            <span className="font-heading text-2xl text-gray-800 group-hover:text-red-600 transition-colors">
                                Boom Boom
                            </span>
                        </Link>
                    </div>

                    {/* Desktop nav links */}
                    <nav className="hidden md:flex items-center gap-2">
                        {navLinks.map((item) => (
                            <motion.div key={item.href} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'font-body text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200',
                                        'text-gray-600 hover:text-red-600 hover:bg-red-50 hover:border-red-300 border-2 border-transparent'
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Right: Login + Cart */}
                    <div className="flex items-center gap-2">
                        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.94 }} className="hidden sm:block">
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-1.5 font-body text-sm font-semibold px-4 py-2 rounded-full border-2 border-red-300 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-colors duration-200 shadow-sm shadow-red-100"
                            >
                                <LogIn className="h-4 w-4" />
                                Login
                            </Link>
                        </motion.div>

                        {/* Cart button — opens sheet instead of navigating */}
                        <motion.button
                            whileHover={{ scale: 1.08, rotate: -6 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => openCart(true)}
                            aria-label="View cart"
                            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-white shadow-md shadow-red-300 hover:bg-red-700 transition-colors"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            {/* Badge */}
                            <AnimatePresence>
                                {totalItems > 0 && (
                                    <motion.span
                                        key="badge"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                                        className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-orange-400 text-white text-[10px] font-bold shadow"
                                    >
                                        {totalItems > 99 ? '99+' : totalItems}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                        />

                        <motion.div
                            key="drawer"
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                            className="fixed top-0 left-0 bottom-0 z-50 w-[300px] sm:w-[340px] flex flex-col"
                            style={{ background: "linear-gradient(160deg, #fff5f5 0%, #fff 60%, #fff8f0 100%)" }}
                        >
                            <div className="h-1.5 w-full bg-red-500 shrink-0" />

                            <div className="flex items-center justify-between px-6 py-5 border-b-2 border-red-100">
                                <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
                                    <Image src="/assets/logo.svg" alt="Logo" width={40} height={40} />
                                    <span className="font-heading text-2xl text-gray-800">Boom Boom</span>
                                </Link>
                                <motion.button
                                    whileHover={{ rotate: 90 }}
                                    whileTap={{ scale: 0.88 }}
                                    onClick={() => setOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-red-300 bg-red-50 text-red-600"
                                    aria-label="Close menu"
                                >
                                    <X className="h-4 w-4" />
                                </motion.button>
                            </div>

                            <nav className="flex flex-col px-4 py-6 gap-2 flex-1">
                                {navLinks.map((item, i) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.08 + i * 0.07, duration: 0.35 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-body font-semibold text-base text-gray-700 hover:bg-red-50 hover:text-red-600 border-2 border-transparent hover:border-red-200 transition-all duration-200"
                                        >
                                            <span className="text-xl">{item.emoji}</span>
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <div className="px-4 py-6 border-t-2 border-red-100 space-y-3">
                                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
                                    <Link
                                        href="/login"
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl border-2 border-red-300 bg-red-50 text-red-600 font-body font-semibold text-sm hover:bg-red-600 hover:text-white transition-colors duration-200"
                                    >
                                        <LogIn className="h-5 w-5" />
                                        Login / Register
                                    </Link>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                                    <button
                                        onClick={() => { setOpen(false); openCart(true); }}
                                        className="relative flex items-center gap-3 w-full px-4 py-3 rounded-2xl bg-red-600 text-white font-body font-semibold text-sm hover:bg-red-700 shadow-md shadow-red-300 transition-colors duration-200"
                                    >
                                        <ShoppingCart className="h-5 w-5" />
                                        View Cart
                                        {totalItems > 0 && (
                                            <span className="ml-auto px-2 py-0.5 rounded-full bg-orange-400 text-white text-xs font-bold">
                                                {totalItems}
                                            </span>
                                        )}
                                    </button>
                                </motion.div>
                            </div>

                            <div className="h-1.5 w-full bg-orange-400 shrink-0" />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <div className="h-16" />
        </>
    );
}