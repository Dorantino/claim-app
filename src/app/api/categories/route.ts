/**
 * Public API route for fetching claim categories.
 *
 * Responds to GET requests by loading categories from DataManager.
 * Returns an empty array on error with a 500 status.
 *
 * @returns {Promise<Response>} JSON list of claim categories
 */
import { NextResponse } from 'next/server';
import { getCategories } from '@/tools/DataManager';

export async function GET() {
    try {
        const categories = await getCategories();
        return NextResponse.json(categories);
    } catch (error: any) {
        console.error('API /categories error:', error);
        return NextResponse.json(
            [],
            { status: 500 }
        );
    }
}
