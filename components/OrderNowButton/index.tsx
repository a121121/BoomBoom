"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OrderNowButton() {
    const [visible, setVisible] = useState(false);
    const [clicked, setClicked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 400);
        return () => clearTimeout(t);
    }, []);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
            router.push("/menu");
        }, 300);
    };

    return (
        <div
            className={cn(
                "fixed bottom-6 right-6 z-50 transition-all duration-500",
                visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
            )}
        >
            {/* Glow halo — only element that needs a style tag for the blur trick */}
            <div className="absolute inset-0 -z-10 rounded-full bg-destructive opacity-30 blur-xl transition-opacity duration-300 group-hover:opacity-60" />

            <Button
                onClick={handleClick}
                variant="destructive"
                size="lg"
                className={cn(
                    // shape & spacing
                    "relative rounded-full px-4 py-6 gap-3 overflow-hidden border",
                    // font
                    "font-heading text-base cursor-pointer tracking-wide",
                    // shadow
                    "shadow-lg shadow-destructive/40",
                    // hover lift
                    "hover:scale-105 hover:shadow-xl hover:shadow-destructive/50",
                    // click shrink
                    "active:scale-95",
                    // animate-float defined in tailwind.config
                    "animate-float",
                    // transition
                    "transition-all duration-200 ease-out",
                    clicked && "scale-95"
                )}
            >
                {/* Shine sweep via pseudo — kept as one tiny inline style because
            Tailwind can't animate left: -75% → 130% without arbitrary values */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-[75%] w-1/2 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/25 to-transparent transition-[left] duration-500 hover:left-[130%]"
                />

                {/* Icon */}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <ShoppingBag className="h-4 w-4" />
                </span>

                {/* Label */}
                <span className="flex items-center gap-1">
                    Order Now
                    <ArrowRight className="h-4 w-4" />
                </span>

                {/* Badge */}
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 animate-bounce items-center justify-center rounded-full bg-white text-[10px] font-black text-destructive shadow">
                    !
                </span>
            </Button>
        </div>
    );
}