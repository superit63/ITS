"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface POItem {
    productId: string; // This should be selected from existing products or strict input
    quantity: number;
    productName: string; // Display purpose
}

export default function CreatePOPage() {
    const router = useRouter();
    const [poNumber, setPoNumber] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [items, setItems] = useState<POItem[]>([]);

    // Temporary state for adding item
    const [tempProductCode, setTempProductCode] = useState(""); // Simplified: User types product ID/Code
    const [tempQty, setTempQty] = useState(1);

    const addItem = () => {
        if (!tempProductCode) return;
        setItems([...items, {
            productId: tempProductCode, // In real app, this usually comes from a lookup
            quantity: tempQty,
            productName: `Product ${tempProductCode}`
        }]);
        setTempProductCode("");
        setTempQty(1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // First, ensure products exist (mock logic or real)
            // For this MVP, we assume productId needs to be valid or we create it on the fly?
            // The API expects productId to be a UUID usually, or we change schema to use Code as ID.
            // Schema: Product.id (CUID).
            // So user must select a VALID Product ID.
            // Since we don't have a product picker yet, let's assume valid UUIDs or handle mapping.
            // BETTER: Allow typing "Internal Code" and lookup.
            // For now, simple POST.

            const res = await fetch("/api/po", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    poNumber,
                    customerName,
                    items: items.map(i => ({ productId: i.productId, quantity: i.quantity }))
                }),
            });

            if (res.ok) {
                alert("PO Created!");
                router.push("/");
            } else {
                alert("Error creating PO");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center p-8">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Create Purchase Order (PO)</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>PO Number</Label>
                                <Input value={poNumber} onChange={e => setPoNumber(e.target.value)} required placeholder="PO-12345" />
                            </div>
                            <div className="space-y-2">
                                <Label>Customer Name</Label>
                                <Input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Company ABC" />
                            </div>
                        </div>

                        <div className="border p-4 rounded-md space-y-4">
                            <h4 className="font-semibold">Items</h4>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Product ID (UUID)"
                                    value={tempProductCode}
                                    onChange={e => setTempProductCode(e.target.value)}
                                    className="flex-1"
                                />
                                <Input
                                    type="number"
                                    value={tempQty}
                                    onChange={e => setTempQty(Number(e.target.value))}
                                    className="w-24"
                                />
                                <Button type="button" onClick={addItem}>Add</Button>
                            </div>

                            <div className="space-y-2">
                                {items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-muted p-2 rounded">
                                        <span>{item.productId}</span>
                                        <span>Qty: {item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button type="submit" className="w-full">Submit PO</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
