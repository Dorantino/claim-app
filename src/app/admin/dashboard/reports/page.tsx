/**
 * Admin reports dashboard route page.
 *
 * Loads reporting metrics and category chart data from the DataManager,
 * then renders the Reports component with the combined claimCounts payload.
 *
 * @param {{ searchParams: any }} props - Route search params for optional date filtering
 * @returns {JSX.Element} Admin reports page
 */
import { getClaimCounts, getClaimsByCategory } from '@/tools/DataManager';
import Reports from "@/components/reports";

export default async function Page({ searchParams }: { searchParams: any }) {
    const start = searchParams.start;
    const end = searchParams.end;

    const claimCounts = await getClaimCounts(start, end);
    const byCategory = await getClaimsByCategory(start, end);

    // Pass combined counts and category breakdown to the Reports chart component
    return (
        <>
            <Reports claimCounts={{ ...claimCounts, byCategory }} />
        </>
    );
}
