import type { Metadata } from "next";
import { Montserrat, Press_Start_2P } from "next/font/google";
import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Pokedex - Search for Pokemon!",
  description: "A sleek and clean, fast modern Pokedex using the Pokeapi! ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  lang="en" suppressHydrationWarning className={`min-h-screen flex ${montserrat.variable} ${pressStart2P.variable}`}>
      <head />
      <body className={`w-full ${montserrat.className} overflow-x-hidden flex flex-col min-h-screen`}>
        <NextTopLoader color="var(--red)" showSpinner={false} />
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Header />
          <main className="flex-1 pt-25 lg:pt-32 relative">
            <Image 
              className="fixed rotate-[30deg] -z-50 opacity-5 dark:opacity-10 right-0 -top-50 grayscale will-change-transform" 
              src="/pokedex.svg" 
              alt="dex-bg" 
              width={1200} 
              height={30}
              priority
            />
            {children}
          </main>
          <footer className="text-center text-foreground py-5 px-4 text-[.8rem]">Built with love by <Link className="font-bold" href="https://devonw.me/" target="_blank">Devon Welch</Link> | Data from <Link className="font-bold text-[var(--red)]" target="_blank" href="https://pokeapi.co/">PokiApi</Link> | Images belong to Pokemon Inc.</footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
