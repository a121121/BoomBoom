import Image from "next/image";

export default function ReservationHero() {
    return (
        <div className="relative w-full h-full min-h-[320px] lg:min-h-0 overflow-hidden rounded-2xl">
            <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85"
                alt="Elegant restaurant dining room"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

            {/* Heading at bottom-right */}
            <div className="absolute bottom-8 right-8 text-right">
                <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-2 font-light">
                    Fine Dining
                </p>
                <h1 className="uppercase text-foreground font-display text-4xl lg:text-5xl xl:text-6xl font-light leading-tight tracking-wider">
                    Book a Table
                </h1>
            </div>
        </div>
    );
}