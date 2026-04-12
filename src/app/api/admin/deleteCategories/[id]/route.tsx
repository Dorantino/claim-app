/**
 * API route for deleting a claim category by ID.
 *
 * Extracts the category ID from route params and delegates deletion
 * to the DataManager deleteCategory helper.
 *
 * @param {NextRequest} request - Incoming DELETE request
 * @param {{ params: Promise<{ id: string }> }} context - Route params containing category ID
 * @returns {Promise<Response>} Result from deleteCategory
 */
import { NextRequest } from 'next/server';
import { deleteCategory } from "@/tools/DataManager";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return deleteCategory(request, id);
}