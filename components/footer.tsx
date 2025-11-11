"use client"

import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-primary">Кульбит</h3>
            <p className="text-sm text-muted-foreground">Платформа для творчества и движения</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Навигация</h4>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Главная
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
              О нас
            </Link>
            <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground">
              Услуги
            </Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Правовая информация</h4>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Условия использования
            </Link>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Соцсети</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                f
              </a>
              <a
                href="#"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                𝕏
              </a>
              <a
                href="#"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                in
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-border pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {currentYear} Кульбит. Все права защищены.</p>
          <p className="text-sm text-muted-foreground">Создано с ❤️ для творческих людей</p>
        </div>
      </div>
    </footer>
  )
}
