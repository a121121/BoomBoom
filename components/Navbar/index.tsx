'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, ShoppingCart, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const navLinks = [
        { href: '/menu', label: 'Menu' },
        { href: '/reservation', label: 'Reservation' },
        { href: '/', label: 'Contact' },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Left: Hamburger + Logo + Name */}
                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Hamburger → Sheet trigger (mobile only) */}
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="icon" aria-label="Open menu">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>

                            <SheetContent side="left" className="w-[300px] sm:w-[380px] p-0">
                                <SheetHeader className="border-b px-6 py-5">
                                    <SheetTitle className="text-left text-xl">
                                        <div className="flex items-center gap-2">
                                            <Image src="/assets/logo.svg" alt="Logo" width={50} height={50} />
                                            <span className="boomboom text-2xl">Boom Boom</span>
                                        </div>
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col py-6">
                                    {navLinks.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setOpen(false)}
                                            className={cn(
                                                'flex items-center px-6 py-4 text-base font-medium',
                                                'text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors'
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}

                                    {/* Optional extra items at bottom */}
                                    <div className="mt-auto border-t px-6 py-6 space-y-4">
                                        <Button variant="outline" className="w-full justify-start" asChild>
                                            <Link href="/login" onClick={() => setOpen(false)}>
                                                <LogIn className="mr-3 h-5 w-5" />
                                                Login / Register
                                            </Link>
                                        </Button>
                                        <Button className="w-full justify-start" asChild>
                                            <Link href="/cart" onClick={() => setOpen(false)}>
                                                <ShoppingCart className="mr-3 h-5 w-5" />
                                                Cart
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Logo + Name */}
                        <Link href="/" className="flex items-center gap-2.5">
                            <Image src="/assets/logo.svg" alt="Logo" width={50} height={50} />
                            <span className="text-2xl boomboom">
                                Boom Boom
                            </span>
                        </Link>
                    </div>

                    {/* Desktop navigation links */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'text-sm font-medium text-muted-foreground transition-colors',
                                    'hover:text-foreground'
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side: Login + Cart (always visible) */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2" asChild>
                            <Link href="/login">
                                <LogIn className="h-4 w-4" />
                                <span>Login</span>
                            </Link>
                        </Button>

                        <Button variant="outline" size="icon" asChild>
                            <Link href="/cart" aria-label="View cart">
                                <ShoppingCart className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Prevent content from hiding under fixed navbar */}
            <div className="h-16" />
        </>
    );
}