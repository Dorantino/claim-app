/**
 * API route for adding new claim categories.
 *
 * Delegates POST requests to the DataManager addCategory helper.
 *
 * @param {NextRequest} request - Incoming request containing the new category payload
 * @returns {Promise<Response>} Response from addCategory
 */
import { NextRequest } from 'next/server';
import { addCategory } from '@/tools/DataManager';

export async function POST(request: NextRequest) {
    return addCategory(request);
}

