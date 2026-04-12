/**
 * Admin delete user page.
 *
 * Loads user records and renders the DeleteUser confirmation component for the selected ID.
 * This server page resolves the user object by route parameter before rendering.
 *
 * @param {{ params: Promise<{ id: string }> }} props - Route params containing user ID
 * @returns {JSX.Element} Delete user confirmation page
 */
import { getUsers } from "@/tools/DataManager";
import DeleteUser from "@/components/DeleteUser";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const users = await getUsers();
    const { id } = await params;

    // Find the matching user record for deletion confirmation
    const user = users.find(u => u.id === id);

    return <DeleteUser user={user} />;
}