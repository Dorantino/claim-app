import EmployeeClaimSubmit from "@/components/employeeClaimSubmit";
import { Suspense } from "react";


export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EmployeeClaimSubmit />
        </Suspense>
    );
}


