import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const eoSchema = z.object({
    deliverer: z.string().optional(),
    note: z.string().optional(),
    items: z.array(z.object({
        poItemId: z.string(),
        quantity: z.number().int().positive(),
    })),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { deliverer, note, items } = eoSchema.parse(body);

        // Transaction to create EO and update POItems
        const result = await db.$transaction(async (tx) => {
            // 1. Create EO
            const eo = await tx.exportOrder.create({
                data: {
                    deliverer,
                    note,
                    items: {
                        create: items.map((item) => ({
                            poItemId: item.poItemId,
                            quantity: item.quantity,
                        })),
                    },
                },
            });

            // 2. Update POItems delivery count
            for (const item of items) {
                await tx.pOItem.update({
                    where: { id: item.poItemId },
                    data: {
                        delivered: { increment: item.quantity },
                    },
                });
            }

            return eo;
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create EO" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const eos = await db.exportOrder.findMany({
            include: { items: { include: { poItem: { include: { product: true, po: true } } } } },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(eos);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch EOs" }, { status: 500 });
    }
}
