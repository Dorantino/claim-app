import { Suspense } from "react";
import EmployeeClaimCategory from "@/components/employeeClaimCategory";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EmployeeClaimCategory />
        </Suspense>
    );
}