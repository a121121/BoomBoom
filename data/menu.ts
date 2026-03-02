// data/menu.ts

export interface RestaurantInfo {
    name: string;
    tagline: string;
    heroImage: string;
}

export interface Category {
    id: string;
    label: string;
}

export interface MenuItem {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    ingredients: string;
    image: string;
    badge?: string;
}

export interface MenuCategory {
    category: string;
    items: MenuItem[];
}

export interface MenuData {
    restaurant: RestaurantInfo;
    categories: Category[];
    menu: MenuCategory[];
}

export const menuData: MenuData = {
    restaurant: {
        name: "Qiolia",
        tagline:
            "Treat your taste buds with our wide array of dishes. Explore from deals, chinese, thai, desserts, and drinks.",
        heroImage:
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85",
    },

    categories: [
        { id: "deals", label: "Deals" },
        { id: "starters", label: "Starters" },
        { id: "chinese", label: "Chinese" },
        { id: "thai", label: "Thai Food" },
        { id: "desserts", label: "Desserts" },
        { id: "drinks", label: "Drinks" },
    ],

    menu: [
        {
            category: "deals",
            items: [
                {
                    id: "d1",
                    name: "Family Feast Bundle",
                    price: 34.99,
                    originalPrice: 49.99,
                    ingredients:
                        "Spring rolls, Pad Thai, Kung Pao Chicken, jasmine rice, mango pudding ×2",
                    image:
                        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
                    badge: "Save 30%",
                },
                {
                    id: "d2",
                    name: "Weekday Lunch Special",
                    price: 12.99,
                    originalPrice: 18.99,
                    ingredients: "Any main + steamed rice + soup of the day",
                    image:
                        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80",
                    badge: "Mon–Fri",
                },
                {
                    id: "d3",
                    name: "Date Night for Two",
                    price: 44.99,
                    originalPrice: 62.0,
                    ingredients:
                        "Crispy duck, Tom Yum soup, Green curry, coconut ice cream",
                    image:
                        "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
                    badge: "Popular",
                },
            ],
        },

        {
            category: "starters",
            items: [
                {
                    id: "s1",
                    name: "Crispy Spring Rolls",
                    price: 7.5,
                    ingredients:
                        "Cabbage, carrots, glass noodles, shiitake mushrooms, sweet chilli dip",
                    image:
                        "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
                },
                {
                    id: "s2",
                    name: "Steamed Pork Dumplings",
                    price: 9.0,
                    ingredients:
                        "Pork & prawn filling, ginger, scallions, soy dipping sauce",
                    image:
                        "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80",
                },
                {
                    id: "s3",
                    name: "Chicken Satay Skewers",
                    price: 8.5,
                    ingredients:
                        "Lemongrass-marinated chicken thigh, peanut sauce, cucumber relish",
                    image:
                        "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80",
                },
                {
                    id: "s4",
                    name: "Edamame & Chilli Salt",
                    price: 5.0,
                    ingredients:
                        "Steamed edamame, Sichuan chilli salt, toasted sesame oil",
                    image:
                        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
                },
            ],
        },

        {
            category: "chinese",
            items: [
                {
                    id: "c1",
                    name: "Kung Pao Chicken",
                    price: 15.5,
                    ingredients:
                        "Chicken breast, Sichuan peppers, roasted peanuts, dried chillies, scallions",
                    image:
                        "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&q=80",
                },
                {
                    id: "c2",
                    name: "Peking Crispy Duck",
                    price: 22.0,
                    ingredients:
                        "Half duck, hoisin sauce, cucumber, spring onion, steamed pancakes",
                    image:
                        "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80",
                },
                {
                    id: "c3",
                    name: "Mapo Tofu",
                    price: 13.0,
                    ingredients:
                        "Silken tofu, minced pork, doubanjiang, Sichuan peppercorn oil, scallions",
                    image:
                        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80",
                },
                {
                    id: "c4",
                    name: "Char Siu Pork Noodles",
                    price: 14.5,
                    ingredients:
                        "BBQ pork belly, egg noodles, bok choy, soft-boiled egg, sesame broth",
                    image:
                        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80",
                },
            ],
        },

        {
            category: "thai",
            items: [
                {
                    id: "t1",
                    name: "Pad Thai",
                    price: 14.0,
                    ingredients:
                        "Rice noodles, prawns, tofu, egg, bean sprouts, peanuts, tamarind sauce",
                    image:
                        "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&q=80",
                },
                {
                    id: "t2",
                    name: "Green Curry",
                    price: 15.0,
                    ingredients:
                        "Chicken, Thai aubergine, coconut milk, kaffir lime, green chilli paste",
                    image:
                        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80",
                },
                {
                    id: "t3",
                    name: "Tom Yum Soup",
                    price: 11.0,
                    ingredients:
                        "Prawns, lemongrass, galangal, kaffir lime leaves, chilli, mushrooms",
                    image:
                        "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
                },
                {
                    id: "t4",
                    name: "Mango Sticky Rice",
                    price: 8.5,
                    ingredients:
                        "Fresh mango, glutinous rice, coconut cream, toasted sesame",
                    image:
                        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80",
                },
            ],
        },

        {
            category: "desserts",
            items: [
                {
                    id: "ds1",
                    name: "Mango Pudding",
                    price: 6.5,
                    ingredients:
                        "Alphonso mango purée, evaporated milk, agar, fresh mango cubes",
                    image:
                        "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80",
                },
                {
                    id: "ds2",
                    name: "Coconut Panna Cotta",
                    price: 7.0,
                    ingredients:
                        "Coconut cream, pandan leaf, palm sugar caramel, toasted coconut flakes",
                    image:
                        "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80",
                },
                {
                    id: "ds3",
                    name: "Sesame Balls",
                    price: 5.5,
                    ingredients:
                        "Glutinous rice, red bean paste, toasted sesame, palm sugar syrup",
                    image:
                        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80",
                },
            ],
        },

        {
            category: "drinks",
            items: [
                {
                    id: "dr1",
                    name: "Thai Iced Tea",
                    price: 4.5,
                    ingredients:
                        "Ceylon tea, star anise, cardamom, condensed milk, crushed ice",
                    image:
                        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80",
                },
                {
                    id: "dr2",
                    name: "Lychee Lemonade",
                    price: 4.0,
                    ingredients:
                        "Fresh lychee, lemon juice, mint, sparkling water, lychee syrup",
                    image:
                        "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80",
                },
                {
                    id: "dr3",
                    name: "Jasmine Green Tea",
                    price: 3.5,
                    ingredients:
                        "Hand-rolled jasmine pearls, 80°C spring water, first flush brew",
                    image:
                        "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=400&q=80",
                },
                {
                    id: "dr4",
                    name: "Watermelon Cooler",
                    price: 4.5,
                    ingredients:
                        "Fresh watermelon, basil seeds, rose water, lime, soda",
                    image:
                        "https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=400&q=80",
                },
            ],
        },
    ],
};