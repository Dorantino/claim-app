/**
 * Admin category delete page
 *
 * Loads category metadata from the data manager and renders the DeleteCategory component.
 * This server component resolves the requested category by ID before rendering.
 *
 * @param {{ params: Promise<{ id: string }> }} props - Route params containing category ID
 * @returns {JSX.Element} Delete category confirmation page
 */
import { getCategories } from "@/tools/DataManager";
import DeleteCategory from "@/components/DeleteCategory";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const categories = await getCategories();
    const { id } = await params;

    // Lookup the selected category by ID for deletion confirmation
    const category = categories.find(u => u.id === id);

    return <DeleteCategory category={category} />;
}