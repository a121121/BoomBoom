'use client'

import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';
import { motion, Variants } from 'framer-motion';

export default function About() {
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
            id="about"
        >
            <motion.div
                className="flex flex-col lg:flex-row gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >

                {/* LEFT SIDE */}
                <motion.div
                    className="relative w-full lg:w-1/2 min-h-[400px] md:min-h-[500px] lg:min-h-[600px] rounded-xl overflow-hidden"
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
                            src="/assets/about.webp"
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
                        <h3 className="text-6xl uppercase tracking-wide text-center">About Us</h3>
                    </motion.div>
                </motion.div>


                {/* RIGHT SIDE */}
                <motion.div
                    className="flex flex-col w-full lg:w-1/2 gap-4 "
                    variants={fadeInRight}
                >

                    {/* TOP ROW */}
                    <motion.div
                        className="flex flex-col md:flex-row gap-4"
                        variants={containerVariants}
                    >
                        <motion.div
                            className="w-full md:w-3/5 h-auto bg-background rounded-xl border royal-card"
                            variants={scaleIn}
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                        >
                            <div className='flex flex-col justify-center md:items-start items-center p-6 text-foreground gap-6'>
                                <motion.h3
                                    className='text-3xl uppercase tracking-wide'
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    art of flavour
                                </motion.h3>
                                <motion.p
                                    className='text-muted-foreground md:text-justify text-center'
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    Where culinary craftsmanship meets modern elegance. Indulge in the finest sushi, expertly curated to elevate your dining experience.
                                </motion.p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-full md:w-2/5 min-h-[250px] md:min-h-[200px] relative bg-background rounded-xl border overflow-hidden"
                            variants={scaleIn}
                            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                        >
                            <motion.div
                                initial={{ scale: 1.2 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                                viewport={{ once: true }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src="/assets/artofflavour.webp"
                                    alt="About us"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* MIDDLE ROW */}
                    <motion.div
                        className="flex flex-col md:flex-row gap-4"
                        variants={containerVariants}
                    >
                        {[
                            { platform: 'TRIP ADVISOR', text: 'Amazing Sushi' },
                            { platform: 'Google maps', text: 'Outstanding' },
                            { platform: 'Trust pilot', text: 'Treat for every soul' }
                        ].map((review, index) => (
                            <motion.div
                                key={index}
                                className="w-full md:flex-1 h-auto bg-background rounded-xl border royal-card"
                                variants={reviewCardVariants}
                                whileHover={{
                                    y: -8,
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <div className='flex flex-col justify-center items-center p-6 text-foreground gap-3'>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Rating
                                            initialValue={5}
                                            readonly
                                            allowFraction
                                            SVGclassName="inline-block"
                                            size={24}
                                            fillColor='#F5EEE0'
                                        />
                                    </motion.div>
                                    <motion.h3
                                        className='text-2xl uppercase tracking-wide p-0 m-0'
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        {review.platform}
                                    </motion.h3>
                                    <motion.p
                                        className='text-muted-foreground text-justify p-0 m-0'
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        {review.text}
                                    </motion.p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* BOTTOM ROW */}
                    <motion.div
                        className="flex flex-col md:flex-row gap-4"
                        variants={containerVariants}
                    >
                        <motion.div
                            className="w-full md:w-2/5 min-h-[250px] md:min-h-[200px] relative bg-background rounded-xl border overflow-hidden"
                            variants={scaleIn}
                            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                        >
                            <motion.div
                                initial={{ scale: 1.2 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                                viewport={{ once: true }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src="/assets/chef.avif"
                                    alt="About us"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className="w-full md:w-3/5 h-auto bg-background rounded-xl border royal-card"
                            variants={scaleIn}
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                        >
                            <div className='flex flex-col justify-center md:items-start items-center p-6 text-foreground gap-6'>
                                <motion.h3
                                    className='text-3xl uppercase tracking-wide'
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    our story
                                </motion.h3>
                                <motion.p
                                    className='text-muted-foreground md:text-justify hyphens-auto text-pretty text-center'
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    Founded with a passion for culinary excellence, Qiolia was created to offer more than just a meal, but an experience. Our chefs blend traditional techniques with modern creativity, crafting each dish with precision and care.
                                    <br /> <br />
                                    From the freshest ingredients to the final presentation, every detail reflects our commitment to quality, flavor, and unforgettable dining moments.
                                </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>


                </motion.div>
            </motion.div>
        </section>
    );
}