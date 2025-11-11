"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState("")
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Имя не может быть пустым"
    if (!formData.email.includes("@")) newErrors.email = "Некорректный email"
    if (formData.password.length < 6) newErrors.password = "Пароль минимум 6 символов"
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают"
    }
    if (!formData.agreeTerms) newErrors.agreeTerms = "Примите условия использования"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage("")
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrors({ form: data.message || "Ошибка регистрации" })
        return
      }

      setSuccessMessage("Регистрация успешна! Перенаправление...")
      localStorage.setItem("user", JSON.stringify(data.user))

      // Redirect to dashboard after 1 second
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (err) {
      setErrors({ form: "Ошибка сети. Попробуйте снова." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent mb-4">
                <span className="text-lg font-bold text-primary-foreground">К</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Регистрация</h1>
              <p className="text-muted-foreground">Создайте аккаунт и присоединитесь к сообществу</p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500 text-green-600 rounded-lg text-sm">
                {successMessage}
              </div>
            )}

            {/* Form Error */}
            {errors.form && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive text-destructive rounded-lg text-sm">
                {errors.form}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Полное имя
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Иван Петров"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Электронная почта
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Пароль
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">
                  Подтвердите пароль
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                />
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      agreeTerms: checked === true,
                    }))
                  }
                  className="border-border"
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  Я согласен с{" "}
                  <Link href="#" className="text-primary hover:text-primary/80">
                    условиями использования
                  </Link>
                </Label>
              </div>
              {errors.agreeTerms && <p className="text-sm text-destructive">{errors.agreeTerms}</p>}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? "Загрузка..." : "Создать аккаунт"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-2 text-muted-foreground">или</span>
              </div>
            </div>

            {/* Social Registration */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
                Google
              </Button>
              <Button variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
                GitHub
              </Button>
            </div>

            {/* Sign In Link */}
            <p className="text-center mt-6 text-sm text-muted-foreground">
              Уже есть аккаунт?{" "}
              <Link href="/login" className="text-primary hover:text-primary/80 font-medium">
                Войдите
              </Link>
            </p>
          </Card>

          {/* Info */}
          <div className="mt-8">
            <p className="text-center text-sm text-muted-foreground">
              Мы никогда не поделимся вашей информацией без вашего разрешения
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
