import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// MongoDB constants (matching your DataManager.ts)
const MONGO_URL: string = process.env.MONGO_URL || "mongodb://mongo:27017";
const MONGO_DB_NAME: string = "dbData";

export async function GET() {
    const client = new MongoClient(MONGO_URL);

    try {
        await client.connect();
        const db = client.db(MONGO_DB_NAME);
        const categories = await db.collection('claimCategories').find({ isDefault: true }).toArray();

        return NextResponse.json(categories);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    } finally {
        await client.close();
    }
}