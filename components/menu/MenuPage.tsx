"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MenuItem, type MenuItemData } from "./MenuItem";
import { menuData } from "@/data/menu";
import type { MenuData } from "@/data/menu";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Category {
    id: string;
    label: string;
    icon?: string;
}



// ─── Category Nav ─────────────────────────────────────────────────────────────

function CategoryNav({
    categories,
    activeId,
    onSelect,
}: {
    categories: Category[];
    activeId: string;
    onSelect: (id: string) => void;
}) {
    return (
        <nav
            // On lg: sticks to top of the scrollable panel (top-0).
            // On md/sm: sticks below the site nav using --nav-height (default 0).
            className="sticky lg:top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border top-[var(--nav-height)] "
            aria-label="Menu categories"
        >
            <div className="flex justify-center overflow-x-auto scrollbar-none px-4 py-3">
                <div className="flex gap-1">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => onSelect(cat.id)}
                            className={cn(
                                "font-heading flex items-center gap-2 shrink-0 px-4 py-2 rounded-full text-sm tracking-wide uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                activeId === cat.id
                                    ? "bg-foreground text-background shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                        >
                            <span>{cat.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}

// ─── Menu Section ─────────────────────────────────────────────────────────────

function MenuSection({
    category,
    label,

    items,
}: {
    category: string;
    label: string;
    items: MenuItemData[];
}) {
    return (
        // scroll-mt accounts for sticky tabs height so the section heading isn't hidden behind them
        <section id={`section-${category}`} className="scroll-mt-14 pt-2 pb-6">
            <h3 className="text-center text-xl sm:text-2xl text-foreground mb-4 tracking-wide uppercase">
                {label}
            </h3>
            <div>
                {items.map((item) => (
                    <MenuItem key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function MenuPage() {
    const data: MenuData = menuData;
    const [activeCategory, setActiveCategory] = useState<string>("");
    const menuPanelRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // lg breakpoint = 1024px
    const isDesktop = () => typeof window !== "undefined" && window.innerWidth >= 1024;

    // Height of the sticky tabs bar in px — keep in sync with the nav's py-3 + button height
    const TABS_HEIGHT = 52;

    useEffect(() => {
        setActiveCategory(menuData.categories[0]?.id ?? "");
    }, []);

    // ── Setup IntersectionObserver ──
    const setupObserver = (menuData: MenuData) => {
        observerRef.current?.disconnect();

        const sections = menuData.categories
            .map((c) => document.getElementById(`section-${c.id}`))
            .filter(Boolean) as HTMLElement[];

        // On desktop, observe inside the panel div; on mobile/md, observe inside window (root: null)
        const root = isDesktop() ? menuPanelRef.current : null;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) {
                    setActiveCategory(visible[0].target.id.replace("section-", ""));
                }
            },
            { root, threshold: 0.25 }
        );

        sections.forEach((s) => observerRef.current!.observe(s));
    };

    useEffect(() => {
        if (!data) return;
        setupObserver(data);
        return () => observerRef.current?.disconnect();
    }, [data]);

    // Re-wire observer when crossing the lg breakpoint
    useEffect(() => {
        if (!data) return;
        const handleResize = () => setupObserver(data);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [data]);

    // ── Scroll to section ──
    const handleCategorySelect = (id: string) => {
        setActiveCategory(id);
        const el = document.getElementById(`section-${id}`);
        if (!el) return;

        if (isDesktop() && menuPanelRef.current) {
            // Scroll inside the right panel
            menuPanelRef.current.scrollTo({
                top: el.offsetTop - TABS_HEIGHT,
                behavior: "smooth",
            });
        } else {
            // Scroll the window — offset by site nav + tabs bar
            const navHeight =
                parseInt(
                    getComputedStyle(document.documentElement).getPropertyValue("--nav-height") || "0"
                ) || 0;
            const top =
                el.getBoundingClientRect().top + window.scrollY - navHeight - TABS_HEIGHT;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };


    const { restaurant, categories, menu } = data;

    return (
        /**
         * LAYOUT
         *
         * lg+  → two-column flex. Left aside = 45%, right main = 55%.
         *         Container is h-screen / overflow-hidden so only the right panel scrolls.
         * md   → single column. Window scrolls. Tabs stick below --nav-height.
         * sm   → same as md.
         *
         * To make tabs sit under your site's top nav on mobile/md, set in globals.css:
         *   :root { --nav-height: 64px; }   ← replace with your actual nav height
         */
        <div className="lg:flex lg:h-screen lg:overflow-hidden bg-background royal-card mx-4 my-4">

            {/* ── LEFT: Fixed hero image ── */}
            <aside className="lg:w-[50%] lg:shrink-0 lg:sticky lg:top-0 lg:h-screen relative">
                <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-full">
                    <Image
                        src={restaurant.heroImage}
                        alt={restaurant.name}
                        fill
                        priority
                        className="object-cover rounded-2xl"
                        sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-background/30 to-transparent rounded-lg" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                        <h1 className="text-3xl lg:text-6xl uppercase tracking-wider text-center lg:text-left">
                            Menu
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-muted-foreground text-center lg:text-left max-w-xs">
                            {restaurant.tagline}
                        </p>
                    </div>
                </div>
            </aside>

            {/* ── RIGHT: Scrollable menu panel (55% on lg, full-width below) ── */}
            <main
                ref={menuPanelRef}
                // Explicit w-[55%] + overflow-y-auto on lg; let window scroll on smaller screens
                className="lg:w-[50%] lg:shrink-0 lg:overflow-y-auto lg:h-screen focus:outline-none"
                tabIndex={-1}
            >
                <CategoryNav
                    categories={categories}
                    activeId={activeCategory}
                    onSelect={handleCategorySelect}
                />

                <div className="px-2 sm:px-4 lg:px-6 pt-6 pb-0 max-w-2xl mx-auto lg:mx-0">
                    {menu.map((section) => {
                        const cat = categories.find((c) => c.id === section.category);
                        if (!cat) return null;
                        return (
                            <MenuSection
                                key={section.category}
                                category={section.category}
                                label={cat.label}
                                items={section.items}
                            />
                        );
                    })}
                </div>
            </main>

        </div>
    );
}