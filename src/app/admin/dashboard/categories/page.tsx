/**
 * Admin categories dashboard page.
 *
 * Loads category data via the DataManager and renders the Categories management component.
 * This server page resolves category state before returning the UI.
 *
 * @returns {JSX.Element} Admin category management page
 */
import { getCategories } from '@/tools/DataManager';
import Categories from "@/components/categoriesPage";

export default async function page() {
    const categories = await getCategories();

    return (
        <>
            <Categories categories={categories} />
        </>
    );
}