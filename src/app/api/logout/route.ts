/**
 * Logout API route.
 *
 * Clears the authentication token cookie and returns a success response.
 *
 * @returns {Promise<Response>} JSON response confirming logout.
 */
import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ success: true });

    response.cookies.set("token", "", {
        path: "/",
        expires: new Date(0)
    });

    return response;
}