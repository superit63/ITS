import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const productSchema = z.object({
    name: z.string(),
    internalCode: z.string(),
    customerCode: z.string(),
    unit: z.string().optional(),
});

export async function GET() {
    try {
        const products = await db.product.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, internalCode, customerCode, unit } = productSchema.parse(body);

        const product = await db.product.create({
            data: {
                name,
                internalCode,
                customerCode,
                unit,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
