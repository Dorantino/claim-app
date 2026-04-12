/**
 * Employee profile update API route.
 *
 * Receives a POST request with profile update data and forwards it
 * to the DataManager helper for persistence.
 *
 * @param {NextRequest} request - Incoming POST request with profile payload.
 * @returns {Promise<Response>} JSON response from updateUserProfile() or error.
 */
import { NextRequest, NextResponse } from "next/server";
import { updateUserProfile } from "@/tools/DataManager";

export async function POST(request: NextRequest) {
    try {
        // Delegate to DataManager function
        const response = await updateUserProfile(request);
        return response;
    } catch (error: any) {
        // Handle errors
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
