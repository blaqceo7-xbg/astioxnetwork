import { NextResponse } from "next/server"
import { authMiddleware } from "./middlewares/api/authMiddleware"
import { logMiddleware } from "./middlewares/api/logMiddleware"

export const config = {
    matcher: "/api/auth/:path*"
}

export async function middleware(request) {

    if (request.url.includes("/api/auth/users/:path*")) {
      const logResult = logMiddleware(request);
      console.log(logResult.response);
    }

    if (request.url.includes("/api/auth/admin/:path*")) {
      const logResult = logMiddleware(request);
      console.log(logResult.response);
    }

    if (
      request.url.includes("/api/auth/login") ||
      request.url.includes("/api/auth/signup") || 
      request.url.includes("send-otp") || 
      request.url.includes("verify-email")
    ) {
      return NextResponse.next();
    }

    const authResult = await authMiddleware(request)
    if (!authResult.isValid) {
        return new NextResponse(
          JSON.stringify({ message: "Unauthorization" }),
          {
            status: 401,
          }
        );
    }
    return NextResponse.next();
}