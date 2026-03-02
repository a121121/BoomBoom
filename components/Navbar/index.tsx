'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll for minor styling adjustments if needed (optional)
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/menu', label: 'MENU' },
        { href: '/', label: 'ABOUT' },
    ];

    return (
        <>
            {/* Desktop/Tablet Navbar 
              Positioned Top-Left (fixed) as requested.
              Styled as a floating 'pill' container.
            */}
            <nav
                className={`fixed top-4 left-4 right-4 md:right-auto md:top-8 md:left-8 z-50 transition-all duration-300`}
            >
                <div className="bg-background border border-white/10 rounded-2xl shadow-2xl px-2 py-1 max-w-full md:w-max flex items-center justify-between md:gap-6 royal-card">

                    {/* Left Section: Menu Toggle & Logo */}
                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Hamburger Menu Button (Boxed Style) */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-white/10 rounded-xl  hover:bg-white/5 hover:border-white/20 transition-all duration-300 group"
                            aria-label="Open menu"
                        >
                            <Menu strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <span className="font-heading text-2xl md:text-3xl text-[#E8E6D9] tracking-widest uppercase">
                                Qiolia
                            </span>
                        </Link>
                    </div>

                    {/* Center Section: Navigation Links (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm tracking-[0.2em] text-[#E8E6D9]/80 hover:text-[#E8E6D9] transition-colors font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Section: CTA Button */}
                    <div className="ml-4 md:ml-0">
                        <Link
                            href="/reservation"
                            className="inline-flex items-center justify-center px-4 py-2 md:px-6 md:py-3 border border-white/20 rounded-xl text-xs md:text-sm tracking-[0.15em] text-[#E8E6D9] hover:bg-[#E8E6D9] hover:text-black transition-all duration-300 uppercase whitespace-nowrap"
                        >
                            Book a Table
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile/Full Screen Menu Overlay */}
            <div
                className={`fixed inset-0 z-60 bg-[#0C0C0C] transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Close Button Positioned to match the Menu Button location */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-4 left-4 md:top-8 md:left-8 w-12 h-12 flex items-center justify-center border border-white/10 rounded-xl text-[#E8E6D9] hover:bg-white/5 transition-colors z-50"
                >
                    <X strokeWidth={1.5} className="w-6 h-6" />
                </button>

                {/* Menu Content */}
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                    <Link
                        href="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="mb-8 font-heading text-4xl text-[#E8E6D9] tracking-widest uppercase"
                    >
                        Qiolia
                    </Link>

                    {/* Mobile Links */}
                    {[...navLinks, { href: '/reservation', label: 'BOOK A TABLE' }].map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-2xl md:text-4xl font-light text-[#E8E6D9] tracking-[0.2em] hover:text-white hover:tracking-[0.3em] transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}