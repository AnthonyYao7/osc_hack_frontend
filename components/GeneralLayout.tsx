"use client";

import RootLayout from "./layout";
import ResponsiveAppBar from "./MenuButtonsAppBar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const sections = [
  { title: "comp-sci", url: "/communities/comp-sci" },
  { title: "pre-health", url: "/communities/pre-health" },
  {
    title: "mechanical-engineering",
    url: "/communities/mechanical-engineering",
  },
];

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootLayout>
      <ResponsiveAppBar sections={sections} />

      <main>{children}</main>
    </RootLayout>
  );
}
