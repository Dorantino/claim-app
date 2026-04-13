import EmployeeClaimSuccess from "@/components/employeeClaimSuccess";
import { Suspense } from "react";


export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EmployeeClaimSuccess />
        </Suspense>
    );
}







