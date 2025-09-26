"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

// Mock data - replace with real data from your database
const downloads = [
  {
    id: "1",
    name: "Premium License Key",
    description: "Your premium software license",
    downloadUrl: "#",
    downloadCount: 3,
    maxDownloads: 5,
    expiresAt: "2024-12-31",
  },
  {
    id: "2",
    name: "User Manual",
    description: "Complete user guide and documentation",
    downloadUrl: "#",
    downloadCount: 1,
    maxDownloads: null,
    expiresAt: null,
  },
]

export default function DownloadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-headline">Downloads</h1>
        <p className="mt-2 text-muted-foreground">Access your purchased files and license keys.</p>
      </div>

      {downloads.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No downloads available.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {downloads.map((download) => (
            <Card key={download.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <FileText className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <CardTitle className="text-lg">{download.name}</CardTitle>
                      <CardDescription>{download.description}</CardDescription>
                    </div>
                  </div>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>
                    {download.maxDownloads ? (
                      <span>
                        Downloads: {download.downloadCount}/{download.maxDownloads}
                      </span>
                    ) : (
                      <span>Unlimited downloads</span>
                    )}
                  </div>
                  {download.expiresAt && <div>Expires: {download.expiresAt}</div>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
