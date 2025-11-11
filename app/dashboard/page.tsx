"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface User {
  id: string
  email: string
  name: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userStr = localStorage.getItem("user")
    if (!userStr) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userStr))
    setIsLoading(false)
  }, [router])

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" })
    localStorage.removeItem("user")
    router.push("/")
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>
  }

  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-12">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Добро пожаловать, {user?.name}!</h1>
              <p className="text-muted-foreground">Ваш профиль в Кульбите</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="border-primary text-primary bg-transparent">
              Выход
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-2">Ваша информация</h3>
              <p className="text-muted-foreground mb-4">
                <span className="block text-sm">Email:</span>
                <span className="text-foreground font-medium">{user?.email}</span>
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-2">Избранное</h3>
              <p className="text-muted-foreground text-sm">Здесь будут ваши избранные материалы</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-2">Прогресс</h3>
              <p className="text-muted-foreground text-sm">Отслеживайте свой путь развития</p>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
