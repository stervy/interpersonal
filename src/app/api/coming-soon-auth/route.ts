import { NextResponse } from "next/server"

const COOKIE_NAME = "comingSoonAuthorized"
const DEFAULT_PASSWORD = "stervy"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    const expectedPassword = process.env.COMING_SOON_PASSWORD ?? DEFAULT_PASSWORD

    if (!expectedPassword) {
      return NextResponse.json(
        { message: "Access is currently unavailable. Please contact the site owner." },
        { status: 500 }
      )
    }

    if (password !== expectedPassword) {
      return NextResponse.json({ message: "Incorrect password. Please try again." }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set({
      name: COOKIE_NAME,
      value: "true",
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Invalid request." }, { status: 400 })
  }
}
