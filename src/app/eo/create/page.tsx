"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface Suggestion {
    id: string; // poItemId
    po: { poNumber: string; orderDate: string };
    quantity: number;
    delivered: number;
    remaining: number;
}

export default function CreateEOPage() {
    const router = useRouter();
    const [deliverer, setDeliverer] = useState("");
    const [note, setNote] = useState("");

    // Advanced Item Entry
    const [productId, setProductId] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [selectedPOItem, setSelectedPOItem] = useState<string | null>(null);
    const [deliveryQty, setDeliveryQty] = useState(0);

    const [eoItems, setEoItems] = useState<{ poItemId: string; quantity: number; label: string }[]>([]);

    const checkInventory = async () => {
        if (!productId) return;
        try {
            const res = await fetch(`/api/po/suggest?productId=${productId}`);
            const data = await res.json();
            setSuggestions(data);
        } catch (e) {
            console.error(e);
        }
    };

    const addItemToEO = () => {
        if (!selectedPOItem || !deliveryQty) return;

        const suggestion = suggestions.find(s => s.id === selectedPOItem);
        if (!suggestion) return;

        setEoItems([...eoItems, {
            poItemId: selectedPOItem,
            quantity: deliveryQty,
            label: `PO: ${suggestion.po.poNumber} - Qty: ${deliveryQty}`
        }]);

        // Reset
        setSuggestions([]);
        setSelectedPOItem(null);
        setProductId("");
        setDeliveryQty(0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/eo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ deliverer, note, items: eoItems }),
        });
        router.push("/");
    };

    return (
        <div className="flex justify-center p-8">
            <Card className="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle>Create Delivery Note (EO)</CardTitle>
                    <p className="text-sm text-muted-foreground">Smart Suggestion: Select a product to see best POs to fulfill.</p>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Deliverer Name</Label>
                                <Input value={deliverer} onChange={e => setDeliverer(e.target.value)} placeholder="Mr. A" />
                            </div>
                            <div className="space-y-2">
                                <Label>Note / Truck Number</Label>
                                <Input value={note} onChange={e => setNote(e.target.value)} />
                            </div>
                        </div>

                        {/* Smart Item Entry */}
                        <div className="border border-primary/20 bg-primary/5 p-4 rounded-md space-y-4">
                            <h4 className="font-semibold flex items-center gap-2">
                                📦 Add Item to Delivery
                            </h4>
                            <div className="flex gap-2 items-end">
                                <div className="space-y-1 flex-1">
                                    <Label>Product ID</Label>
                                    <Input value={productId} onChange={e => setProductId(e.target.value)} placeholder="Enter Product ID..." />
                                </div>
                                <Button type="button" onClick={checkInventory} variant="secondary">Check Stocks</Button>
                            </div>

                            {/* Suggestions Panel */}
                            {suggestions.length > 0 && (
                                <div className="bg-background border rounded-md p-3 space-y-2 animate-in fade-in zoom-in-95">
                                    <Label className="text-green-600 font-bold">Recommended Inventory (FIFO):</Label>
                                    {suggestions.map((s) => (
                                        <div
                                            key={s.id}
                                            className={`flex justify-between items-center p-2 rounded cursor-pointer border ${selectedPOItem === s.id ? 'border-primary bg-primary/10' : 'hover:bg-muted'}`}
                                            onClick={() => setSelectedPOItem(s.id)}
                                        >
                                            <div>
                                                <div className="font-medium">{s.po.poNumber}</div>
                                                <div className="text-xs text-muted-foreground">{new Date(s.po.orderDate).toLocaleDateString()}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-green-600">Rem: {s.remaining}</div>
                                                <div className="text-xs text-muted-foreground">Original: {s.quantity}</div>
                                            </div>
                                        </div>
                                    ))}

                                    {selectedPOItem && (
                                        <div className="flex gap-2 pt-2 border-t mt-2">
                                            <Input
                                                type="number"
                                                placeholder="Qty to deliver"
                                                value={deliveryQty}
                                                onChange={e => setDeliveryQty(Number(e.target.value))}
                                                className="flex-1"
                                                autoFocus
                                            />
                                            <Button onClick={addItemToEO}>Add to List</Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Selected Items List */}
                        <div className="space-y-2">
                            <h4 className="font-semibold">Items to Deliver</h4>
                            {eoItems.length === 0 && <p className="text-muted-foreground text-sm">List is empty.</p>}
                            {eoItems.map((item, idx) => (
                                <div key={idx} className="flex justify-between p-3 bg-muted rounded">
                                    <span>{item.label}</span>
                                    <Button variant="ghost" size="sm" onClick={() => setEoItems(eoItems.filter((_, i) => i !== idx))}>Remove</Button>
                                </div>
                            ))}
                        </div>

                        <Button onClick={handleSubmit} className="w-full" size="lg" disabled={eoItems.length === 0}>
                            Confirm Delivery
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
