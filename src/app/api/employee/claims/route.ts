/**
 * Employee claims API route.
 *
 * Returns claims for the authenticated employee via DataManager.
 * Optional userId query parameters are parsed but not currently applied.
 *
 * @param {NextRequest} request - Incoming GET request.
 * @returns {Promise<Response>} JSON response with claims or error details.
 */
import { NextResponse, NextRequest } from "next/server";
import { getEmployeeClaims } from "@/tools/DataManager";

export async function GET(request: NextRequest) {
    try {

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        const claims = await getEmployeeClaims();

        return NextResponse.json({
            success: true,
            claims
        });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}