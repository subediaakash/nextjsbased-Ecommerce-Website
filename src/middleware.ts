import { NextRequest, NextResponse } from "next/server";

// Middleware function to check authentication
export async function middleware(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }
  return NextResponse.next();
}

// Authentication check function
async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (!authHeader) return false;

  const encodedCredentials = authHeader.split(" ")[1];
  if (!encodedCredentials) return false;

  const [username, password] = Buffer.from(encodedCredentials, "base64")
    .toString()
    .split(":");
  return (
    username === process.env.ADMIN_USERNAME && password === process.env.PASSWORD
  );
}

// Configuration for the middleware matcher
export const config = {
  matcher: "/admin/:path*",
};
