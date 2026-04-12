/**
 * Login API route.
 *
 * Accepts a POST request with login credentials and delegates authentication
 * to the DataManager helper.
 *
 * @param {NextRequest} request - Incoming POST request with login payload.
 * @returns {Promise<Response>} JSON response from loginUser().
 */
import { NextRequest } from "next/server";
import { loginUser } from "@/tools/DataManager";

export function POST(request: NextRequest) {


    return loginUser(request);
}
