"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
          Кульбит
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Главная
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors ${
              pathname === "/about" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            О нас
          </Link>
          <Link
            href="/services"
            className={`text-sm font-medium transition-colors ${
              pathname === "/services" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Услуги
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors ${
              pathname === "/contact" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Контакты
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" className="hidden sm:inline-flex text-primary hover:bg-primary/10">
            <Link href="/login">Вход</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/register">Зарегистрироваться</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
