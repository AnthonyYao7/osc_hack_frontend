'use client'

import RootLayout from "./layout";
import ResponsiveAppBar from "./MenuButtonsAppBar";
import {Inter} from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AuthenticationLayout({children,}:
                                        Readonly<{
                                          children: React.ReactNode;
                                        }>) {
  return (
    <RootLayout>
      {children}
    </RootLayout>
  )
}