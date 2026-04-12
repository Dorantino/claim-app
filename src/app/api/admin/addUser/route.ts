/**
 * API route for adding a new employee user.
 *
 * Delegates POST requests to the DataManager addUser helper,
 * which handles validation, hashing, and user creation.
 *
 * @param {NextRequest} request - Incoming request with new user data
 * @returns {Promise<Response>} JSON response from addUser
 */
import { NextRequest } from 'next/server';
import { addUser } from '@/tools/DataManager';

export async function POST(request: NextRequest) {
    return addUser(request);
}

