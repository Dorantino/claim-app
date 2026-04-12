/**
 * Admin users dashboard page.
 *
 * Fetches the complete user list from DataManager and renders the user management component.
 *
 * @returns {JSX.Element} Admin user management page
 */
import { getUsers } from '@/tools/DataManager';
import Userpage from "@/components/userPage";

export default async function page() {
    const Users = await getUsers();

    // Pass the loaded user list into the user management table
    return (
        <>
            <Userpage Users={Users} />
        </>
    );
}
