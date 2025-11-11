import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Вы вышли из аккаунта" })
  response.cookies.delete("auth_user")
  return response
}
