// Authentication utility functions
export interface User {
  id: string
  email: string
  name: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
}

// Simple in-memory store (replace with real database later)
const users: Map<string, { email: string; name: string; password: string }> = new Map()

export async function registerUser(email: string, name: string, password: string): Promise<AuthResponse> {
  if (users.has(email)) {
    return { success: false, message: "Пользователь с этим email уже существует" }
  }

  if (password.length < 6) {
    return { success: false, message: "Пароль должен быть минимум 6 символов" }
  }

  users.set(email, { email, name, password })
  return { success: true, message: "Регистрация успешна" }
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const user = users.get(email)

  if (!user) {
    return { success: false, message: "Пользователь не найден" }
  }

  if (user.password !== password) {
    return { success: false, message: "Неверный пароль" }
  }

  return { success: true, message: "Вход успешен", user: { id: email, email, name: user.name } }
}
