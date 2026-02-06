"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function CreateSOPage() {
    const router = useRouter();
    const [soNumber, setSoNumber] = useState("");
    const [poNumber, setPoNumber] = useState(""); // Optional link
    const [items, setItems] = useState<{ productId: string; quantity: number }[]>([]);
    const [tempProduct, setTempProduct] = useState("");
    const [tempQty, setTempQty] = useState(1);

    const addItem = () => {
        if (!tempProduct) return;
        setItems([...items, { productId: tempProduct, quantity: tempQty }]);
        setTempProduct("");
        setTempQty(1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/so", {
            method: "POST",
            body: JSON.stringify({ soNumber, poNumber, items }),
        });
        router.push("/");
    };

    return (
        <div className="flex justify-center p-8">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Create Internal SO</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>SO Number</Label>
                                <Input value={soNumber} onChange={e => setSoNumber(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Link to PO (Optional)</Label>
                                <Input value={poNumber} onChange={e => setPoNumber(e.target.value)} />
                            </div>
                        </div>

                        <div className="border p-4 rounded-md space-y-4">
                            <h4 className="font-semibold">Items (Internal Codes)</h4>
                            <div className="flex gap-2">
                                <Input placeholder="Product ID" value={tempProduct} onChange={e => setTempProduct(e.target.value)} />
                                <Input type="number" value={tempQty} onChange={e => setTempQty(Number(e.target.value))} className="w-24" />
                                <Button type="button" onClick={addItem}>Add</Button>
                            </div>
                            <div>
                                {items.map((i, idx) => <div key={idx}>{i.productId} - {i.quantity}</div>)}
                            </div>
                        </div>

                        <Button type="submit" className="w-full">Create SO</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
