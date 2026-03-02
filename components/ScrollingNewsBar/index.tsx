"use client"

import React from "react";
import { motion } from "framer-motion";

interface ScrollingNewsBarProps {
    message: string;
    speed?: number; // Duration in seconds for one complete cycle
}

const ScrollingNewsBar: React.FC<ScrollingNewsBarProps> = ({
    message,
    speed = 30
}) => {
    // Duplicate the message to create seamless loop
    const duplicatedMessage = `${message} • ${message} • ${message} • ${message}`;

    return (
        <div className="relative w-full overflow-hidden py-4 lg:py-6 bg-foreground my-10">
            <div className="flex whitespace-nowrap">
                {/* First scrolling instance */}
                <motion.div
                    className="flex items-center gap-8 text-background text-2xl lg:text-3xl font-medium uppercase tracking-wider"
                    animate={{
                        x: [0, -1920], // Adjust based on content width
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: speed,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedMessage.split(' • ').map((text, index) => (
                        <React.Fragment key={index}>
                            <span>{text}</span>
                            {index < duplicatedMessage.split(' • ').length - 1 && (
                                <span className="text-background/60">•</span>
                            )}
                        </React.Fragment>
                    ))}
                </motion.div>

                {/* Second scrolling instance for seamless loop */}
                <motion.div
                    className="flex items-center gap-8 text-background text-2xl lg:text-3xl font-medium uppercase tracking-wider ml-8"
                    animate={{
                        x: [0, -1920],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: speed,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedMessage.split(' • ').map((text, index) => (
                        <React.Fragment key={`duplicate-${index}`}>
                            <span>{text}</span>
                            {index < duplicatedMessage.split(' • ').length - 1 && (
                                <span className="text-background/60">•</span>
                            )}
                        </React.Fragment>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default ScrollingNewsBar;