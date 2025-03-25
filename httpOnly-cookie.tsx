import { cookies } from "next/headers";

// ✅ Fix: Await cookies() before using set()
const cookieStore = await cookies();
cookieStore.set("token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
});

// Usage
const cookieStore = await cookies();
const token = cookieStore.get("token");
