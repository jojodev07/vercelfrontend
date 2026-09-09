import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, ExternalLink, HardDrive } from "lucide-react"

export function OfficialFiles() {

    const documents = [
    { id: 1, name: "اسس النجاح والرسوب", size: "21.1 MB", division: "وزارة التربية والتعليم", date: "School Year of 2026/2027", hrefTag: "src/documents/najah.pdf" },
    { id: 2, name: "تعليمات الانضباط", size: "1.7 MB", division: "وزارة التربية والتعليم", date: "2017", hrefTag: "src/documents/indibat.pdf" },
    { id: 3, name: "مجالس اولياء الامور", size: "139 KB", division: "وزارة التربية والتعليم", date: "2007", hrefTag: "src/documents/awleya.pdf" },
    { id: 4, name: "تعليمات الدوام", size: "97 KB", division: "وزارة التربية والتعليم", date: "2013", hrefTag: "src/documents/t3lemat.pdf" },
    { id: 5, name: "رتب المعلمين", size: "177 KB", division: "وزارة التربية والتعليم", date: "2002", hrefTag: "src/documents/rotab.pdf" },
    { id: 6, name: "ميثاق مهنة التعليم", size: "1.6 MB", division: "وزارة التربية والتعليم", date: "2020", hrefTag: "src/documents/metaq.pdf" },
    { id: 5, name: "الإجازات التربوية", size: "166 KB", division: "وزارة التربية والتعليم", date: "1975", hrefTag: "src/documents/ejazat.pdf" }
    ];

    return (
        

    // 1. max-w-4xl makes it a wide desktop rectangle; space-y-3 spaces out rows cleanly
    <div className="w-full max-w-4xl mx-auto p-4 space-y-3">
      {documents.map((doc) => (
        <Card key={doc.id} className="hover:shadow-md transition-shadow">
          {/* 2. Side-by-side flex layout handles rows elegantly on desktop */}
          <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Left: Icon & Core Text Meta */}
            <div className="flex items-start space-x-3 flex-1">
              <div className="shrink-0 rounded-lg bg-primary/10 p-2.5 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              {/* min-w-0 is critical on the wrapper to enable text-ellipsis trickery */}
              <div className="min-w-0 space-y-0.5">
                <CardTitle className="text-base font-semibold" title={doc.name}>
                    <p className="font-['Noto_Sans_Arabic_Variable']">{doc.name}</p>

                </CardTitle>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground font-['Noto_Sans_Arabic_Variable']">{doc.division}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <HardDrive className="h-3 w-3" /> {doc.size}
                  </span>
                  <span>•</span>
                  <span>{doc.date}</span>
                </div>
              </div>
            </div>

            {/* Right: Consolidated Action Triggers */}
            <div className="flex items-center gap-2 shrink-0 justify-end sm:border-l sm:pl-4 border-muted">
            <a href={`${doc.hrefTag}`} className="w-full sm:w-auto">
                <Button size="sm" variant="outline" className="h-9 px-3 gap-1.5 w-full text-muted-foreground">
                    <ExternalLink className="h-3.5 w-3.5" />
                        Preview
                </Button>
            </a>
            <a href={`${doc.hrefTag}`} download className="w-full sm:w-auto">
                <Button size="sm" className="h-9 px-4 gap-1.5 w-full sm:w-auto">
                    <Download className="h-3.5 w-3.5" />
                    Download
                </Button>
            </a>
            </div>

          </CardContent>
        </Card>
      ))}
    </div>
  )
}