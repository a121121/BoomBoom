
import HeroSection from '@/components/HeroSection';
import About from '@/components/About';
import Divider from '@/components/Divider';
import ScrollingNewsBar from '@/components/ScrollingNewsBar';
import Contact from '@/components/Contact';
import { menuData } from "@/data/menu";
import MenuSection from "@/components/MenuSection";
import Testimonials from '@/components/Testimonials';
import FeaturedDishes from '@/components/FeaturedDishes';

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <ScrollingNewsBar
        message="Ramadan Deal now on - Buy 1 Large Pizza Get 1 Small Free"
        speed={25}
      />
      {/* <About /> */}
      <FeaturedDishes items={menuData.menu.flatMap((cat) => cat.items)} />
      <Divider />
      <Testimonials />
      <ScrollingNewsBar
        message="Ramadan Deal now on - Buy 1 Large Pizza Get 1 Small Free"
        speed={25}
      />
      <Contact />
      <Divider />

    </main>
  );
}