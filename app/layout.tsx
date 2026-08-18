import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "NexusUsers - Modern User Directory",
  description:
    "A modern, high-performance team and user directory application built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui.",
  keywords: ["User Directory", "Next.js 16", "Team Directory", "TypeScript", "Tailwind CSS"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-border/40 bg-muted/20 py-8 text-center text-xs text-muted-foreground transition-colors">
            <div className="container mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>© {new Date().getFullYear()} NexusUsers Directory</p>
              {/* <div className="flex items-center gap-4 text-xs">
                <span>Next.js 16</span>
                <span>•</span>
                <span>TypeScript</span>
                <span>•</span>
                <span>Tailwind CSS</span>
                <span>•</span>
                <span>shadcn/ui</span>
              </div> */}
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}

