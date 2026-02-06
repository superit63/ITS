import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const soSchema = z.object({
    soNumber: z.string(),
    poNumber: z.string().optional(),
    items: z.array(z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
    })),
});

export async function GET() {
    try {
        const sos = await db.salesOrder.findMany({
            include: {
                items: {
                    include: { product: true }
                }
            },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(sos);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch SOs" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { soNumber, poNumber, items } = soSchema.parse(body);

        const so = await db.salesOrder.create({
            data: {
                soNumber,
                poNumber,
                items: {
                    create: items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
        });

        return NextResponse.json(so);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create SO" }, { status: 500 });
    }
}
