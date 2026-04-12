/**
 * Admin create claim category step page.
 *
 * Renders the EmployeeClaimCategory component as the category selection step
 * during the admin claim creation flow.
 *
 * @returns {JSX.Element} Admin claim category creation page
 */
import EmployeeClaimCategory from "@/components/employeeClaimCategory";

export default async function page() {
    // Render the category selection step for admin-driven claim creation
    return (
        <>
            <EmployeeClaimCategory />
        </>
    );
}