
import EmployeeClaimSuccess from "@/components/employeeClaimSuccess";
import { Suspense } from "react";

export default async function page() {

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <EmployeeClaimSuccess />
            </Suspense>
        </>
    );
}

