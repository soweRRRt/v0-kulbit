import { registerUser } from "@/lib/auth"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, name, password, confirmPassword } = await request.json()

    if (!email || !name || !password || !confirmPassword) {
      return NextResponse.json({ success: false, message: "Все поля обязательны" }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ success: false, message: "Пароли не совпадают" }, { status: 400 })
    }

    const result = await registerUser(email, name, password)

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    const response = NextResponse.json(result)
    response.cookies.set("auth_user", JSON.stringify(result.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    return NextResponse.json({ success: false, message: "Ошибка сервера" }, { status: 500 })
  }
}
