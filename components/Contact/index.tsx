'use client'

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

export default function Contact() {
    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        }
    };

    const fadeInLeft: Variants = {
        hidden: { opacity: 0, x: -40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        }
    };

    const fadeInRight: Variants = {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        }
    };

    const scaleIn: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        }
    };

    const reviewCardVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        }
    };

    return (
        <section
            className="relative mx-auto w-full overflow-hidden px-4"
            role="map"
            aria-label="Qiolia Location on Google Maps"
            id="contact"
        >
            <motion.div
                className="flex flex-col lg:flex-row-reverse gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >

                {/* LEFT SIDE */}
                <motion.div
                    className="relative w-full lg:w-1/2 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] rounded-xl overflow-hidden"
                    variants={fadeInLeft}
                >
                    {/* Image */}
                    <motion.div
                        initial={{ scale: 1.2 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                        viewport={{ once: true }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src="/assets/contact.webp"
                            alt="About us"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black/20"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    />
                    <motion.div
                        className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    />

                    {/* Text */}
                    <motion.div
                        className="absolute bottom-6 left-6 z-10 text-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-6xl uppercase tracking-wide text-center">Get In touch</h3>
                    </motion.div>
                </motion.div>


                {/* RIGHT SIDE */}
                <motion.div
                    className="flex flex-col w-full lg:w-1/2 gap-4 lg:min-h-[600px]"
                    variants={fadeInRight}
                >

                    {/* TOP ROW */}
                    <motion.div
                        className="flex flex-col md:flex-row gap-4 lg:flex-1"
                        variants={containerVariants}
                    >
                        <motion.div
                            className="w-full md:w-1/2 h-auto md:h-full md:min-h-[350px] bg-background rounded-xl border royal-card"
                            variants={scaleIn}
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                        >
                            <div className='flex flex-col justify-center items-start p-6 text-foreground gap-6 h-full'>
                                <motion.h3
                                    className='text-3xl uppercase tracking-wide'
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    Opening Hours
                                </motion.h3>
                                <motion.div
                                    className='text-muted-foreground w-full space-y-3'
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <div className='flex justify-between items-center border-b border-border pb-2'>
                                        <span className='font-medium'>Mon - Friday</span>
                                        <span>15:00 - 00:00</span>
                                    </div>
                                    <div className='flex justify-between items-center border-b border-border pb-2'>
                                        <span className='font-medium'>Sat - Sun</span>
                                        <span>12:00 - 22:00</span>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-full md:w-1/2 h-auto md:h-full md:min-h-[350px] bg-background rounded-xl border royal-card"
                            variants={scaleIn}
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                        >
                            <div className='flex flex-col justify-center items-start p-6 text-foreground gap-4 h-full'>
                                <motion.h3
                                    className='text-3xl uppercase tracking-wide'
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    Contact Info
                                </motion.h3>
                                <motion.div
                                    className='text-muted-foreground w-full space-y-3'
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <div className='space-y-1'>
                                        <p className='text-sm font-medium text-foreground'>Address</p>
                                        <p className='text-sm'>123 Main Street, New York, NY 10001</p>
                                    </div>
                                    <div className='space-y-1'>
                                        <p className='text-sm font-medium text-foreground'>Email</p>
                                        <p className='text-sm'>contact@restaurant.com</p>
                                    </div>
                                    <div className='space-y-1'>
                                        <p className='text-sm font-medium text-foreground'>Website</p>
                                        <p className='text-sm'>www.restaurant.com</p>
                                    </div>
                                    <div className='space-y-1'>
                                        <p className='text-sm font-medium text-foreground'>Contact Number</p>
                                        <p className='text-sm'>+1 (555) 123-4567</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* BOTTOM ROW - MAP */}
                    <motion.div
                        className="w-full lg:flex-1 h-[400px] lg:h-auto rounded-xl overflow-hidden border"
                        variants={scaleIn}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2175771484487!2d-73.98784368459395!3d40.75889797932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus&style=element:geometry%7Ccolor:0x242f3e&style=element:labels.text.fill%7Ccolor:0x746855&style=element:labels.text.stroke%7Ccolor:0x242f3e&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi.park%7Celement:geometry%7Ccolor:0x263c3f&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x6b9a76&style=feature:road%7Celement:geometry%7Ccolor:0x38414e&style=feature:road%7Celement:geometry.stroke%7Ccolor:0x212a37&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x9ca5b3&style=feature:road.highway%7Celement:geometry%7Ccolor:0x746855&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x1f2835&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xf3d19c&style=feature:transit%7Celement:geometry%7Ccolor:0x2f3948&style=feature:transit.station%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:water%7Celement:geometry%7Ccolor:0x17263c&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x515c6d&style=feature:water%7Celement:labels.text.stroke%7Ccolor:0x17263c"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Restaurant Location"
                        />
                    </motion.div>



                </motion.div>
            </motion.div>
        </section>
    );
}