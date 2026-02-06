import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // 1. Total POs
        const totalPOs = await db.purchaseOrder.count();

        // 2. Total Products Ordered vs Delivered
        const items = await db.pOItem.findMany();
        const totalOrdered = items.reduce((acc, item) => acc + item.quantity, 0);
        const totalDelivered = items.reduce((acc, item) => acc + item.delivered, 0);

        // 3. Pending EOs
        const recentEOs = await db.exportOrder.count();

        const chartData = [
            { name: "Ordered", value: totalOrdered },
            { name: "Delivered", value: totalDelivered },
        ];

        return NextResponse.json({
            totalPOs,
            totalOrdered,
            totalDelivered,
            recentEOs,
            chartData
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
