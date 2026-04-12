/**
 * Admin claims dashboard page.
 *
 * Loads admin claim records and renders the ClaimsTable component.
 * Includes a navigation button to the admin claim creation flow.
 *
 * @returns {JSX.Element} Admin claims dashboard page
 */
import { getAdminClaims } from "@/tools/DataManager";
import ClaimsTable from "@/components/ClaimsTable";
import { jsondump } from '@/tools/Toolkit';
import Link from "next/link";

export default async function Dashboard() {
    const claims = await getAdminClaims();

    jsondump(claims);

    return (
        <div className="space-y-6">
            {/* Page header with title and create claim button */}
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <h1 className="text-3xl font-bold">Claims</h1>

                <Link href="/admin/dashboard/claims/create">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                        File a Claim
                    </button>
                </Link>
            </div>

            {/* Claims table listing */}
            <ClaimsTable claims={claims} />
        </div>
    );
}
