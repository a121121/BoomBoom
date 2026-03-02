const randomMan = "/man.jpg";
const randomWoman = "/woman.webp";

interface Testimonial {
    quote: string;
    author: string;
    company: string;
    rating: number;
    image: string;
    title: string;
    date: string;
}

export const testimonials: Testimonial[] = [
    {
        quote: `This is hands down the best dining experience I've had in years. The pasta was perfectly al dente and the sauce had layers of flavor I didn't expect. Already planning my next visit.`,
        author: "Rana",
        company: "Canberra, Australia",
        rating: 5,
        image: randomMan,
        title: "An Unforgettable Evening",
        date: "2022-03-23",

    },
    {
        quote: "Incredible food, warm atmosphere, and attentive staff. Every dish was beautifully presented and tasted even better than it looked. Will absolutely be coming back.",
        author: "Matthew R",
        company: "Australia",
        rating: 5,
        image: randomMan,
        title: "Outstanding Dining Experience",
        date: "2022-08-16",
    },
    {
        quote: "The steak was cooked to perfection and the sides were generous. Service was quick without feeling rushed. One of the best meals I've had this year.",
        author: "Roy",
        company: "Australia",
        rating: 5,
        image: randomMan,
        title: "Perfect Steak, Perfect Night",
        date: "2024-11-14",
    },
    {
        quote: "Took my wife here for our anniversary and she was blown away. The chef even came out to wish us well. Little touches like that make all the difference.",
        author: "Kanwal Shahzadi",
        company: "USA",
        rating: 5,
        image: randomWoman,
        title: "Far Exceeded Our Expectations",
        date: "2025-06-03",
    },
    {
        quote: "The dessert menu alone is worth the visit. The chocolate lava cake was warm, gooey, and absolutely divine. My friends were equally impressed.",
        author: "Veronica",
        company: "Australia",
        rating: 5,
        image: randomWoman,
        title: "Save Room for Dessert!",
        date: "2022-02-27",
    },
    {
        quote: "Great for any occasion — date night, family dinner, or celebrating with friends. The menu has something for everyone and the wine list is excellent.",
        author: "Ellen",
        company: "Australia",
        rating: 5,
        image: randomWoman,
        title: "Our New Favourite Spot",
        date: "2023-01-17",
    },
    {
        quote: "Food quality is exceptional and the ambiance is just right — cozy but not too dark. Generous portions and very reasonably priced for the quality 👌",
        author: "Lilly",
        company: "Australia",
        rating: 5,
        image: randomWoman,
        title: "Excellent Food & Atmosphere",
        date: "2025-02-14",
    },
];