export default function OfferBadge() {
    return (
        <div className="relative">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 text-white px-6 py-4 rounded-2xl shadow-xl max-w-sm animate-pulse">

                <p className="text-xs tracking-widest uppercase text-amber-400 mb-1">
                    Limited Time
                </p>

                <h3 className="text-lg font-semibold leading-snug">
                    Ramadan Special Offer
                </h3>

                <p className="text-sm text-white/70 mt-1">
                    Free Aftari with your order
                </p>

            </div>
        </div>
    );
}