'use client';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, PackageOpen } from "lucide-react";

// Dummy data has been removed. This page will be ready to display real downloads when available.
const downloads: any[] = []

export default function DownloadsPage() {
  return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-headline">
                    Your Downloads
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Access your purchased digital products here.
                </p>
            </div>
            {downloads.length > 0 ? (
                <div className="border rounded-lg bg-gray-50/50">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Expires</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {downloads.map((download) => (
                        <TableRow key={download.id}>
                        <TableCell className="font-medium flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            {download.name}
                        </TableCell>
                        <TableCell>{download.expires}</TableCell>
                        <TableCell className="text-right">
                            <Button asChild size="sm" className="hover-shimmer-button">
                            <a href={download.link}><Download className="mr-2 h-4 w-4" /> Download</a>
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
            ) : (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <PackageOpen className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No Downloads Available</h3>
                    <p className="mt-2 text-sm text-gray-500">You have no purchased digital products available for download.</p>
                </div>
            )}
        </div>
  );
}
