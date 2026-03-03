"use client";

import { useEffect, useState, useRef } from "react";
import { motion, PanInfo, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { testimonials } from "@/data/testimonials";

const ACCENT_COLORS = [
    { bg: "bg-red-500", text: "text-red-500", light: "bg-red-100", border: "border-red-400", shadow: "shadow-red-300" },
    { bg: "bg-orange-400", text: "text-orange-500", light: "bg-orange-100", border: "border-orange-400", shadow: "shadow-orange-300" },
    { bg: "bg-yellow-400", text: "text-yellow-500", light: "bg-yellow-100", border: "border-yellow-400", shadow: "shadow-yellow-300" },
    { bg: "bg-rose-500", text: "text-rose-500", light: "bg-rose-100", border: "border-rose-400", shadow: "shadow-rose-300" },
];

const WOBBLY_SHAPES = [
    "M60,20 C80,0 120,0 140,20 C160,40 160,80 140,100 C120,120 80,120 60,100 C40,80 40,40 60,20Z",
    "M50,15 C75,0 125,5 145,25 C165,45 155,95 130,110 C105,125 55,115 35,90 C15,65 25,30 50,15Z",
    "M65,10 C90,0 130,10 148,35 C166,60 158,100 132,112 C106,124 68,118 45,95 C22,72 30,25 65,10Z",
];

export default function Testimonials() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [direction, setDirection] = useState(1);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goTo = (next: number, dir: number) => {
        setDirection(dir);
        setIndex((next + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        if (paused) return;
        timerRef.current = setInterval(() => goTo(index + 1, 1), 5000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [paused, index]);

    const handleSwipe = (_: PointerEvent, info: PanInfo) => {
        if (info.offset.x < -80) goTo(index + 1, 1);
        if (info.offset.x > 80) goTo(index - 1, -1);
    };

    const t = testimonials[index];
    const color = ACCENT_COLORS[index % ACCENT_COLORS.length];
    const shape = WOBBLY_SHAPES[index % WOBBLY_SHAPES.length];

    const cardVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? 280 : -280, opacity: 0, rotate: dir > 0 ? 8 : -8, scale: 0.9 }),
        center: { x: 0, opacity: 1, rotate: 0, scale: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -280 : 280, opacity: 0, rotate: dir > 0 ? -8 : 8, scale: 0.9 }),
    };

    return (
        <section
            className="relative py-20 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #fff5f5 0%, #fff 50%, #fff8f0 100%)" }}
            id="testimonials"
        >
            {/* Decorative background blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-red-100 opacity-60 blur-3xl" />
                <div className="absolute -bottom-20 -right-10 w-80 h-80 rounded-full bg-orange-100 opacity-60 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-yellow-50 opacity-80 blur-2xl" />

                {/* Floating decorative dots */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full ${["bg-red-300", "bg-orange-300", "bg-yellow-300", "bg-rose-300"][i % 4]} opacity-40`}
                        style={{
                            width: [12, 18, 10, 14, 20, 8, 16, 10][i],
                            height: [12, 18, 10, 14, 20, 8, 16, 10][i],
                            top: `${[10, 25, 70, 15, 80, 50, 40, 65][i]}%`,
                            left: `${[5, 15, 8, 85, 90, 92, 3, 78][i]}%`,
                        }}
                        animate={{ y: [0, -14, 0], rotate: [0, 180, 360] }}
                        transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    />
                ))}

                {/* Zigzag line top */}
                <svg className="absolute top-0 left-0 w-full opacity-10" height="30" viewBox="0 0 1200 30" preserveAspectRatio="none">
                    <polyline points="0,30 50,0 100,30 150,0 200,30 250,0 300,30 350,0 400,30 450,0 500,30 550,0 600,30 650,0 700,30 750,0 800,30 850,0 900,30 950,0 1000,30 1050,0 1100,30 1150,0 1200,30" fill="none" stroke="#dc2626" strokeWidth="3" />
                </svg>
                {/* Zigzag line bottom */}
                <svg className="absolute bottom-0 left-0 w-full opacity-10" height="30" viewBox="0 0 1200 30" preserveAspectRatio="none">
                    <polyline points="0,0 50,30 100,0 150,30 200,0 250,30 300,0 350,30 400,0 450,30 500,0 550,30 600,0 650,30 700,0 750,30 800,0 850,30 900,0 950,30 1000,0 1050,30 1100,0 1150,30 1200,0" fill="none" stroke="#dc2626" strokeWidth="3" />
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

                {/* Header */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div className="inline-block relative mb-3">
                        <span className="font-heading text-5xl sm:text-6xl lg:text-7xl text-red-600 tracking-wide drop-shadow-sm">
                            Our Happy Diners
                        </span>
                        {/* Underline squiggle */}
                        <svg className="absolute -bottom-3 left-0 w-full" height="12" viewBox="0 0 300 12">
                            <path d="M0,6 Q37.5,0 75,6 Q112.5,12 150,6 Q187.5,0 225,6 Q262.5,12 300,6" fill="none" stroke="#f97316" strokeWidth="3.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <p className="font-body text-gray-500 text-base sm:text-lg mt-5 max-w-xl mx-auto">
                        Real people, real smiles, real food comas 🍴
                    </p>
                </motion.div>

                <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20">

                    {/* LEFT — CARD */}
                    <div
                        className="w-full lg:w-1/2 relative"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        {/* Big rotated BG card for depth */}
                        <div className={`absolute inset-4 rounded-3xl ${color.bg} opacity-10 rotate-3`} />
                        <div className={`absolute inset-4 rounded-3xl border-2 ${color.border} opacity-20 -rotate-2`} />

                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={index}
                                custom={direction}
                                variants={cardVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={handleSwipe}
                                className="cursor-grab active:cursor-grabbing relative"
                            >
                                <div className={`relative bg-white rounded-3xl p-7 sm:p-9 border-2 ${color.border} shadow-xl ${color.shadow} font-body`}>

                                    {/* Top accent stripe */}
                                    <div className={`absolute top-0 left-8 right-8 h-1.5 ${color.bg} rounded-b-full`} />

                                    {/* Blob avatar holder */}
                                    <div className="flex items-start gap-5 mb-6">
                                        <div className="relative flex-shrink-0">
                                            <svg width="80" height="80" viewBox="0 0 160 160" className={`absolute -top-2 -left-2 ${color.text} opacity-20`}>
                                                <path d={shape} />
                                            </svg>
                                            <motion.div
                                                key={`avatar-${index}`}
                                                initial={{ scale: 0.7, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                                            >
                                                <Image
                                                    src={t.image}
                                                    alt={t.author}
                                                    width={70}
                                                    height={70}
                                                    className={`rounded-full w-16 h-16 sm:w-[70px] sm:h-[70px] object-cover border-4 border-white shadow-lg ring-2 ${color.border}`}
                                                />
                                            </motion.div>
                                        </div>

                                        <div className="flex-1 pt-1">
                                            <p className="font-extrabold text-lg text-gray-800 leading-tight">{t.author}</p>
                                            {/* Stars */}
                                            <div className="flex items-center gap-0.5 mt-1.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ scale: 0, rotate: -30 }}
                                                        animate={{ scale: 1, rotate: 0 }}
                                                        transition={{ delay: 0.15 + i * 0.07, type: "spring", stiffness: 400 }}
                                                    >
                                                        <Star
                                                            className={`w-5 h-5 ${i < t.rating
                                                                ? "text-yellow-400 fill-yellow-400"
                                                                : "text-gray-200 fill-gray-200"}`}
                                                        />
                                                    </motion.div>
                                                ))}
                                                <span className="ml-2 text-sm font-bold text-gray-500">{t.rating}.0</span>
                                            </div>
                                        </div>

                                        {/* Big quote mark */}
                                        <div className={`text-6xl font-heading leading-none ${color.text} opacity-30 mt-1`}>&ldquo;</div>
                                    </div>

                                    {/* Review title */}
                                    <h3 className="font-heading text-2xl sm:text-3xl text-gray-800 mb-3 leading-snug">
                                        {t.title}
                                    </h3>

                                    {/* Quote */}
                                    <div className={`${color.light} rounded-2xl px-5 py-4 mb-4`}>
                                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed italic">
                                            &ldquo;{t.quote}&rdquo;
                                        </p>
                                    </div>

                                    {/* Swipe hint on mobile */}
                                    <p className="lg:hidden text-center text-xs text-gray-400 mt-3 font-body">
                                        ← Swipe to see more reviews →
                                    </p>

                                    {/* Bottom accent */}
                                    <div className={`absolute bottom-0 left-8 right-8 h-1.5 ${color.bg} rounded-t-full`} />
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Prev / Next buttons */}
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <motion.button
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
                                onClick={() => goTo(index - 1, -1)}
                                className={`w-11 h-11 rounded-full border-2 ${color.border} ${color.light} ${color.text} flex items-center justify-center shadow-md font-bold transition-all`}
                                aria-label="Previous"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </motion.button>

                            {/* Dots */}
                            <div className="flex gap-2">
                                {testimonials.map((_, i) => (
                                    <motion.button
                                        key={i}
                                        onClick={() => goTo(i, i > index ? 1 : -1)}
                                        aria-label={`Go to testimonial ${i + 1}`}
                                        animate={{ width: i === index ? 28 : 10, opacity: i === index ? 1 : 0.4 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        className={`h-2.5 rounded-full ${i === index ? color.bg : "bg-gray-300"}`}
                                        style={{ width: i === index ? 28 : 10 }}
                                    />
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
                                onClick={() => goTo(index + 1, 1)}
                                className={`w-11 h-11 rounded-full border-2 ${color.border} ${color.light} ${color.text} flex items-center justify-center shadow-md transition-all`}
                                aria-label="Next"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>

                    {/* RIGHT — COPY */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="w-full lg:w-1/2 text-center lg:text-left"
                    >
                        {/* Sticker tag */}
                        <motion.div
                            className="inline-flex items-center gap-2 bg-red-600 text-white font-heading text-lg px-5 py-2 rounded-full shadow-lg shadow-red-300 mb-6 rotate-[-2deg]"
                            whileHover={{ rotate: 2, scale: 1.04 }}
                        >
                            <span>🔥</span> Loved by 3000+ happy customers
                        </motion.div>

                        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-gray-800 leading-tight mb-4">
                            Real Flavours,{" "}
                            <br />
                            <span className="text-red-600 relative inline-block">
                                Real Love
                                {/* underline squiggle */}
                                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10">
                                    <path d="M0,5 Q25,0 50,5 Q75,10 100,5 Q125,0 150,5 Q175,10 200,5" fill="none" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h2>

                        <p className="font-body text-gray-500 text-base sm:text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                            Don't just take our word for it — our guests say it better than we ever could. Every dish cooked with soul, every visit a memory.
                        </p>

                        {/* Stats pills */}
                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                            {[
                                { emoji: "⭐", value: "4.9", label: "Avg Rating" },
                                { emoji: "🍽️", value: "3,000+", label: "Happy Diners" },
                                { emoji: "💬", value: "500+", label: "Reviews" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -4, scale: 1.04 }}
                                    className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white border-2 ${ACCENT_COLORS[i].border} shadow-md font-body cursor-default`}
                                >
                                    <span className="text-2xl">{stat.emoji}</span>
                                    <div className="text-left">
                                        <p className={`font-extrabold text-lg ${ACCENT_COLORS[i].text} leading-none`}>{stat.value}</p>
                                        <p className="text-xs text-gray-400 font-semibold">{stat.label}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}