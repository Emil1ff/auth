import "./globals.css";
import { ReactNode } from "react";
import { Metadata } from "next";
import { headers } from "next/headers";
import ClientWrapper from "./ClientWrapper";

const titles: Record<string, string> = {
  "/": "Əsas Səhifə",
  "/auth": "Giriş",
};

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get("x-next-url") ?? "/";
  const pageTitle = titles[pathname] || "Respublika Diaqnostika Mərkəzi";

  return { title: pageTitle };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="az">
      <body cz-shortcut-listen="true" suppressHydrationWarning>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
