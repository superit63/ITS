import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardCharts } from "@/components/DashboardCharts";

export default function Home() {
    return (
        <main className="min-h-screen p-8 bg-muted/20">
            <div className="w-full max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold tracking-tight">PO Management</h1>
                    <div className="flex gap-2">
                        {/* User Avatar or Settings could go here */}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>📦 PO Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-sm text-muted-foreground">Import & manage Customer Purchase Orders.</p>
                            <Link href="/po/create">
                                <Button className="w-full">Create New PO</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-primary">🚚 Delivery (EO)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-sm text-muted-foreground">Create Delivery Notes with Smart Suggestion.</p>
                            <Link href="/eo/create">
                                <Button className="w-full" variant="default">Create Delivery</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>🏢 Internal SO</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-sm text-muted-foreground">Map internal Sales Orders to POs.</p>
                            <Link href="/so/create">
                                <Button variant="outline" className="w-full">Manage SO</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                <DashboardCharts />
            </div>
        </main>
    );
}
