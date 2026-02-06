import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
        return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    try {
        // Find POItems with same product and remaining quantity > 0
        // Ordered by PO date (FIFO Suggestion)
        const suggestions = await db.pOItem.findMany({
            where: {
                productId: productId,
            },
            include: {
                po: true,
            },
            orderBy: {
                po: {
                    orderDate: "asc",
                }
            }
        });

        // Filter in-memory for remaining > 0 (since logical check might be complex in prisma without raw query)
        const validSuggestions = suggestions
            .map(item => ({
                ...item,
                remaining: item.quantity - item.delivered
            }))
            .filter(item => item.remaining > 0);

        return NextResponse.json(validSuggestions);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch suggestions" }, { status: 500 });
    }
}
