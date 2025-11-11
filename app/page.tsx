"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
  const [activeTab, setActiveTab] = useState("featured")

  const tabs = [
    { id: "featured", label: "Избранное" },
    { id: "trending", label: "Тренды" },
    { id: "new", label: "Новое" },
  ]

  const featuredItems = [
    {
      id: 1,
      title: "Акробатика на воде",
      description: "Научитесь выполнять трюки на воде вместе с профессионалами",
      category: "Спорт",
      image: "/water-acrobatics.jpg",
    },
    {
      id: 2,
      title: "Танцевальные движения",
      description: "Освойте современные танцевальные стили и техники",
      category: "Танец",
      image: "/people-dancing.png",
    },
    {
      id: 3,
      title: "Воздушная гимнастика",
      description: "Безопасное обучение воздушным трюкам под руководством экспертов",
      category: "Гимнастика",
      image: "/aerial-gymnastics.jpg",
    },
    {
      id: 4,
      title: "Паркур и фристайл",
      description: "Овладейте искусством паркура с нуля",
      category: "Экстрим",
      image: "/parkour-freerun.jpg",
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto max-w-7xl">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
                Добро пожаловать в <span className="text-primary">Кульбит</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl text-pretty">
                Платформа для творчества, движения и самовыражения. Найдите вдохновение, учитесь новому и поделитесь
                своими достижениями с сообществом.
              </p>
              <div className="flex gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Начать прямо сейчас
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  Узнать больше
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* Tab Navigation */}
            <div className="flex gap-2 mb-8 border-b border-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-medium transition-all border-b-2 ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="animate-fadeIn">
              {activeTab === "featured" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredItems.map((item) => (
                    <Card
                      key={item.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                    >
                      <div className="relative h-40 bg-muted overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                          {item.category}
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <Button variant="ghost" size="sm" className="w-full text-primary hover:bg-primary/10">
                          Подробнее
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === "trending" && (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Тренды сейчас</h3>
                  <p className="text-muted-foreground mb-6">Самые популярные направления в этом месяце</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {["TikTok танцы", "Fitness вызовы", "Viral челленджи"].map((trend) => (
                      <Card key={trend} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <h4 className="font-semibold text-foreground">{trend}</h4>
                        <p className="text-sm text-muted-foreground mt-2">Присоединитесь к движению</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "new" && (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Новые материалы</h3>
                  <p className="text-muted-foreground mb-6">Самые свежие уроки и контент от наших преподавателей</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["Основы каллиграфии", "Современный танец"].map((newItem) => (
                      <Card key={newItem} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <h4 className="font-semibold text-foreground">{newItem}</h4>
                        <p className="text-sm text-muted-foreground mt-2">Только что добавлено</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Почему Кульбит?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Качественный контент",
                  description: "Обучающие материалы от профессионалов индустрии",
                },
                {
                  title: "Сообщество единомышленников",
                  description: "Свяжитесь с людьми, разделяющими ваши интересы",
                },
                {
                  title: "Прогресс и результаты",
                  description: "Отслеживайте ваш путь развития и достигайте целей",
                },
              ].map((feature, idx) => (
                <Card key={idx} className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
