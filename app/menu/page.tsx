// app/menu/page.tsx  (or app/page.tsx if this IS the homepage)
//
// This is a Server Component wrapper — it imports the client component.
// No data fetching here; the client component fetches /menu-data.json itself.

import type { Metadata } from "next";
import MenuPage from "@/components/menu/MenuPage";
import Divider from "@/components/Divider";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.menuName,
  description: siteConfig.menuDescription,
};

export default function Page() {
  return (
    <>
      <MenuPage />
      <Divider />
    </>);
}