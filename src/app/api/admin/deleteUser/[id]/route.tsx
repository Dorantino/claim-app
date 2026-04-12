/**
 * API route for deleting a user by ID.
 *
 * Extracts the user ID from route params and delegates deletion
 * to the DataManager deleteUser helper.
 *
 * @param {NextRequest} request - Incoming DELETE request
 * @param {{ params: Promise<{ id: string }> }} context - Route params containing user ID
 * @returns {Promise<Response>} Result from deleteUser
 */
import { NextRequest } from 'next/server';
import { deleteUser } from "@/tools/DataManager";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return deleteUser(request, id);
}