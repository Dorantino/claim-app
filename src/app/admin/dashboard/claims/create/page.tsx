import { getEmployees } from '@/tools/DataManager';
import CreateClaim from "@/components/adminClaimStart";
import { Suspense } from "react";

export default async function page() {
    const users = await getEmployees();
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <CreateClaim users={users} />
            </Suspense>
        </>
    );
}