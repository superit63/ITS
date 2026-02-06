import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const poSchema = z.object({
    poNumber: z.string(),
    customerName: z.string().optional(),
    items: z.array(z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
    })),
});

export async function GET() {
    try {
        const pos = await db.purchaseOrder.findMany({
            include: {
                items: {
                    include: {
                        product: true,
                    }
                }
            },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(pos);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch POs" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { poNumber, customerName, items } = poSchema.parse(body);

        const po = await db.purchaseOrder.create({
            data: {
                poNumber,
                customerName,
                items: {
                    create: items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
            include: {
                items: true,
            }
        });

        return NextResponse.json(po);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create PO" }, { status: 500 });
    }
}
