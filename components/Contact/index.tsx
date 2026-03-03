'use client'

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

const ACCENT_COLORS = [
    { bg: "bg-red-500", border: "border-red-400", light: "bg-red-50", text: "text-red-600", shadow: "shadow-red-200" },
    { bg: "bg-orange-400", border: "border-orange-400", light: "bg-orange-50", text: "text-orange-500", shadow: "shadow-orange-200" },
];

export default function Contact() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const fadeInLeft: Variants = {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } }
    };

    const fadeInRight: Variants = {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } }
    };

    const scaleIn: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } }
    };

    return (
        <section
            className="relative mx-auto w-full overflow-hidden px-4 py-6"
            style={{ background: "linear-gradient(135deg, #fff5f5 0%, #fff 50%, #fff8f0 100%)" }}
            role="region"
            aria-label="Contact and Location"
            id="contact"
        >
            {/* Floating background dots */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-red-100 opacity-50 blur-3xl" />
                <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-orange-100 opacity-50 blur-3xl" />
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full ${["bg-red-300", "bg-orange-300", "bg-yellow-300", "bg-rose-300", "bg-red-200", "bg-orange-200"][i]} opacity-30`}
                        style={{
                            width: [10, 16, 12, 8, 14, 10][i],
                            height: [10, 16, 12, 8, 14, 10][i],
                            top: `${[8, 20, 75, 12, 85, 55][i]}%`,
                            left: `${[4, 12, 6, 88, 85, 94][i]}%`,
                        }}
                        animate={{ y: [0, -12, 0], rotate: [0, 180, 360] }}
                        transition={{ duration: 3 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    />
                ))}
                {/* Zigzag top */}
                <svg className="absolute top-0 left-0 w-full opacity-10" height="24" viewBox="0 0 1200 24" preserveAspectRatio="none">
                    <polyline points="0,24 50,0 100,24 150,0 200,24 250,0 300,24 350,0 400,24 450,0 500,24 550,0 600,24 650,0 700,24 750,0 800,24 850,0 900,24 950,0 1000,24 1050,0 1100,24 1150,0 1200,24" fill="none" stroke="#dc2626" strokeWidth="3" />
                </svg>
                {/* Zigzag bottom */}
                <svg className="absolute bottom-0 left-0 w-full opacity-10" height="24" viewBox="0 0 1200 24" preserveAspectRatio="none">
                    <polyline points="0,0 50,24 100,0 150,24 200,0 250,24 300,0 350,24 400,0 450,24 500,0 550,24 600,0 650,24 700,0 750,24 800,0 850,24 900,0 950,24 1000,0 1050,24 1100,0 1150,24 1200,0" fill="none" stroke="#dc2626" strokeWidth="3" />
                </svg>
            </div>

            <motion.div
                className="flex flex-col lg:flex-row-reverse gap-4 relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >

                {/* LEFT SIDE — Image */}
                <motion.div
                    className="relative w-full lg:w-1/2 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] rounded-3xl overflow-hidden border-2 border-red-300 shadow-xl shadow-red-100"
                    variants={fadeInLeft}
                >
                    {/* Rotated BG accent */}
                    <div className="absolute inset-0 rounded-3xl bg-red-500 opacity-5 rotate-1 pointer-events-none z-0" />

                    <motion.div
                        initial={{ scale: 1.2 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                        viewport={{ once: true }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src="/assets/contact.webp"
                            alt="Contact us"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Title sticker */}
                    <motion.div
                        className="absolute bottom-6 left-6 z-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-block bg-red-600 text-white px-5 py-2 rounded-2xl shadow-lg shadow-red-400/40 rotate-[-1.5deg]">
                            <h3 className="font-heading text-4xl sm:text-5xl uppercase tracking-wide leading-tight">
                                Get In Touch
                            </h3>
                        </div>
                        <p className="font-body text-white/80 text-sm mt-3 ml-1">We'd love to hear from you 🍴</p>
                    </motion.div>

                    {/* Top accent stripe */}
                    <div className="absolute top-0 left-8 right-8 h-1.5 bg-red-500 rounded-b-full" />
                </motion.div>

                {/* RIGHT SIDE */}
                <motion.div
                    className="flex flex-col w-full lg:w-1/2 gap-4 lg:min-h-[600px]"
                    variants={fadeInRight}
                >

                    {/* TOP ROW — Info Cards */}
                    <motion.div
                        className="flex flex-col md:flex-row gap-4 lg:flex-1"
                        variants={containerVariants}
                    >
                        {/* Opening Hours */}
                        <motion.div
                            className="w-full md:w-1/2 h-auto md:h-full md:min-h-[280px] bg-white rounded-3xl border-2 border-red-300 shadow-lg shadow-red-100 overflow-hidden"
                            variants={scaleIn}
                            whileHover={{ y: -6, rotate: 0.5, transition: { duration: 0.25 } }}
                        >
                            {/* Top accent */}
                            <div className="h-1.5 w-full bg-red-500 rounded-b-none" />
                            <div className="flex flex-col justify-center items-start p-6 gap-5 h-[calc(100%-6px)]">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">🕐</span>
                                    <h3 className="font-heading text-2xl uppercase tracking-wide text-gray-800">
                                        Opening Hours
                                    </h3>
                                </div>

                                <div className="font-body w-full space-y-3">
                                    {[
                                        { days: "Mon – Fri", hours: "15:00 – 00:00" },
                                        { days: "Sat – Sun", hours: "12:00 – 22:00" },
                                    ].map((row, i) => (
                                        <motion.div
                                            key={i}
                                            className="flex justify-between items-center py-2 px-3 rounded-xl bg-red-50 border border-red-200"
                                            initial={{ opacity: 0, x: -15 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                                            viewport={{ once: true }}
                                        >
                                            <span className="text-sm font-semibold text-gray-700">{row.days}</span>
                                            <span className="text-sm font-bold text-red-600">{row.hours}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Open now pill */}
                                <motion.div
                                    className="inline-flex items-center gap-1.5 bg-red-600 text-white font-body text-xs font-semibold px-3 py-1.5 rounded-full shadow shadow-red-300 rotate-[-1deg]"
                                    animate={{ scale: [1, 1.04, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />
                                    Open Now
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            className="w-full md:w-1/2 h-auto md:h-full md:min-h-[280px] bg-white rounded-3xl border-2 border-orange-400 shadow-lg shadow-orange-100 overflow-hidden"
                            variants={scaleIn}
                            whileHover={{ y: -6, rotate: -0.5, transition: { duration: 0.25 } }}
                        >
                            {/* Top accent */}
                            <div className="h-1.5 w-full bg-orange-400 rounded-b-none" />
                            <div className="flex flex-col justify-center items-start p-6 gap-4 h-[calc(100%-6px)]">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">📍</span>
                                    <h3 className="font-heading text-2xl uppercase tracking-wide text-gray-800">
                                        Contact Info
                                    </h3>
                                </div>

                                <div className="font-body w-full space-y-3">
                                    {[
                                        { emoji: "🗺️", label: "Address", value: "123 Main Street, New York, NY 10001" },
                                        { emoji: "✉️", label: "Email", value: "contact@restaurant.com" },
                                        { emoji: "🌐", label: "Website", value: "www.restaurant.com" },
                                        { emoji: "📞", label: "Phone", value: "+1 (555) 123-4567" },
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            className="flex items-start gap-2.5"
                                            initial={{ opacity: 0, x: 15 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                                            viewport={{ once: true }}
                                        >
                                            <span className="text-base mt-0.5">{item.emoji}</span>
                                            <div>
                                                <p className="text-xs font-bold text-orange-500 uppercase tracking-wide">{item.label}</p>
                                                <p className="text-sm text-gray-600">{item.value}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* BOTTOM ROW — Map */}
                    <motion.div
                        className="w-full lg:flex-1 h-[350px] lg:h-auto rounded-3xl overflow-hidden border-2 border-red-300 shadow-lg shadow-red-100 relative"
                        variants={scaleIn}
                    >
                        {/* Top accent */}
                        <div className="absolute top-0 left-8 right-8 h-1.5 bg-red-500 rounded-b-full z-10" />

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2175771484487!2d-73.98784368459395!3d40.75889797932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Restaurant Location"
                        />

                        {/* Map label badge */}
                        <div className="absolute bottom-4 left-4 z-10 bg-white border-2 border-red-400 rounded-2xl px-3 py-1.5 shadow-lg shadow-red-100 flex items-center gap-2">
                            <span className="text-base">📌</span>
                            <span className="font-body text-xs font-bold text-red-600">Find Us Here</span>
                        </div>
                    </motion.div>

                </motion.div>
            </motion.div>
        </section>
    );
}