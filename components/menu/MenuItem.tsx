import Image from "next/image";
import { cn } from "@/lib/utils";

export interface MenuItemData {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    ingredients: string;
    image?: string;
    badge?: string;
}

interface MenuItemProps {
    item: MenuItemData;
}

export function MenuItem({ item }: MenuItemProps) {
    return (
        <div className="group flex gap-4 py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors duration-200 rounded-lg px-2 -mx-2">
            {/* Dish Image */}
            {item.image && (
                <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-muted">
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 80px, 96px"
                    />
                    {item.badge && (
                        <span className="absolute top-1 left-1 text-[10px] font-semibold bg-foreground text-background px-1.5 py-0.5 rounded-sm leading-none">
                            {item.badge}
                        </span>
                    )}
                </div>
            )}

            {/* Details */}
            <div className="flex-1 min-w-0">
                {/* Name + Price row */}
                <div className="flex items-baseline gap-2">
                    <span className="tracking-wide text-foreground text-sm sm:text-base truncate leading-snug flex-1 font-heading uppercase">
                        {item.name}
                    </span>

                    {/* Dotted line — hidden on small, shown md+ */}
                    <span
                        className="hidden sm:block flex-1 border-b border-dotted border-muted-foreground/40 mx-1 mb-1 min-w-4"
                        aria-hidden
                    />

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5 shrink-0">
                        {item.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                                ${item.originalPrice.toFixed(2)}
                            </span>
                        )}
                        <span
                            className={cn(
                                "text-sm sm:text-base font-bold",
                                item.originalPrice
                                    ? "text-foreground"
                                    : "text-foreground"
                            )}
                        >
                            ${item.price.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Ingredients */}
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                    {item.ingredients}
                </p>
            </div>
        </div>
    );
}