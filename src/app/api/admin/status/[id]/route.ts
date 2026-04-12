/**
 * API route for updating claim status.
 *
 * Extracts the claim ID from route params and delegates status update
 * to the DataManager updateStatus helper.
 *
 * @param {NextRequest} request - Incoming PUT request with status payload
 * @param {{ params: Promise<{ id: string }> }} context - Route params containing claim ID
 * @returns {Promise<Response>} Result from updateStatus
 */
import { NextResponse, NextRequest } from 'next/server';
import { updateStatus } from "@/tools/DataManager";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return updateStatus(request, id);
}