import { getEmployeeClaims } from "@/tools/DataManager"
import { NextResponse } from "next/server"

export async function GET() {
    const claims = await getEmployeeClaims()
    return NextResponse.json({ success: true, claims })
}