/**
 * Admin claim detail route page.
 *
 * Loads admin claim data from DataManager and renders the ClaimDetails client component.
 * This server page resolves claims before passing them to the admin review UI.
 *
 * @returns {JSX.Element} Admin claim detail page
 */
import { getAdminClaims } from "@/tools/DataManager";
import ClaimDetails from "./claimDetails";

export default async function page() {
    const claims: any = await getAdminClaims();

    // Pass all admin claims into the client-side detail viewer for route-based matching
    return (
        <>
            <ClaimDetails claims={claims} />
        </>
    );
}