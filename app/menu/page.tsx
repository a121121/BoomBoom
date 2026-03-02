// app/menu/page.tsx  (or app/page.tsx if this IS the homepage)
//
// This is a Server Component wrapper — it imports the client component.
// No data fetching here; the client component fetches /menu-data.json itself.

import type { Metadata } from "next";
import MenuSection from "@/components/MenuSection";
import { menuData } from "@/data/menu";
import Divider from "@/components/Divider";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.menuName,
  description: siteConfig.menuDescription,
};

export default function Page() {
  return (
    <>
      {menuData.menu.map((cat) => (
        <MenuSection key={cat.category} category={cat} />
      ))}
      <Divider />
    </>);
}