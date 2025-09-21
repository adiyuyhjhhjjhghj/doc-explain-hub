import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, ZoomOut, RotateCw, FileText } from "lucide-react";

interface PDFViewerProps {
  documentId: string;
  selectedClause: string | null;
  onClauseSelect: (clauseId: string) => void;
}

// Mock clause data with positioning
const mockClauses = [
  {
    id: "clause-1",
    text: "The software is provided 'as is' without warranty of any kind.",
    riskLevel: "high",
    page: 1,
    top: "20%",
    left: "10%",
    width: "80%",
    height: "8%",
  },
  {
    id: "clause-2", 
    text: "User agrees to pay license fees within 30 days of invoice date.",
    riskLevel: "low",
    page: 1,
    top: "40%",
    left: "10%",
    width: "80%",
    height: "6%",
  },
  {
    id: "clause-3",
    text: "Licensor may terminate this agreement immediately upon breach.",
    riskLevel: "medium",
    page: 1,
    top: "60%",
    left: "10%",
    width: "80%",
    height: "10%",
  },
];

export const PDFViewer = ({ documentId, selectedClause, onClauseSelect }: PDFViewerProps) => {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  const zoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const zoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  return (
    <div className="h-full flex flex-col bg-muted/10">
      {/* PDF Viewer Controls */}
      <div className="bg-card border-b border-border p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={zoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground min-w-[60px] text-center">
              {zoom}%
            </span>
            <Button variant="outline" size="sm" onClick={zoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of 8
            </span>
          </div>
        </div>
      </div>

      {/* PDF Content Area */}
      <div className="flex-1 overflow-auto p-6">
        <Card className="mx-auto bg-white shadow-legal" style={{width: `${zoom}%`, minWidth: '600px'}}>
          {/* Mock PDF Page with Highlighted Clauses */}
          <div className="relative p-8 min-h-[800px] bg-white">
            {/* Mock Document Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">SOFTWARE LICENSE AGREEMENT</h2>
              <p className="text-gray-600">Effective Date: January 1, 2024</p>
            </div>

            {/* Mock Document Content */}
            <div className="space-y-6 text-gray-800 leading-relaxed">
              <p>
                This Software License Agreement ("Agreement") is entered into between TechCorp Inc. ("Licensor") 
                and the end user ("Licensee") for the use of the software product.
              </p>

              {/* Highlighted Clauses */}
              {mockClauses.map((clause) => (
                <div
                  key={clause.id}
                  className={`absolute cursor-pointer transition-all duration-200 ${
                    selectedClause === clause.id
                      ? clause.riskLevel === "high"
                        ? "bg-risk-high/30 border-2 border-risk-high"
                        : clause.riskLevel === "medium"
                        ? "bg-risk-medium/30 border-2 border-risk-medium"
                        : "bg-risk-low/30 border-2 border-risk-low"
                      : clause.riskLevel === "high"
                      ? "bg-risk-high/20 border border-risk-high/50 hover:bg-risk-high/25"
                      : clause.riskLevel === "medium"
                      ? "bg-risk-medium/20 border border-risk-medium/50 hover:bg-risk-medium/25"
                      : "bg-risk-low/20 border border-risk-low/50 hover:bg-risk-low/25"
                  } rounded-lg p-2`}
                  style={{
                    top: clause.top,
                    left: clause.left,
                    width: clause.width,
                    height: clause.height,
                  }}
                  onClick={() => onClauseSelect(clause.id)}
                >
                  <p className="text-sm leading-relaxed">
                    {clause.text}
                  </p>
                  <Badge 
                    variant="secondary"
                    className={`mt-1 ${
                      clause.riskLevel === "high" 
                        ? "bg-risk-high text-risk-high-foreground" 
                        : clause.riskLevel === "medium"
                        ? "bg-risk-medium text-risk-medium-foreground"
                        : "bg-risk-low text-risk-low-foreground"
                    }`}
                  >
                    {clause.riskLevel} risk
                  </Badge>
                </div>
              ))}

              <div className="pt-32">
                <p>
                  <strong>1. Grant of License.</strong> Subject to the terms and conditions of this Agreement,
                  Licensor hereby grants to Licensee a non-exclusive, non-transferable license to use the software.
                </p>
              </div>

              <div className="pt-16">
                <p>
                  <strong>2. Payment Terms.</strong> Licensee agrees to pay all license fees and charges
                  specified in the order form or invoice within thirty (30) days of the invoice date.
                </p>
              </div>

              <div className="pt-20">
                <p>
                  <strong>3. Termination.</strong> This Agreement may be terminated by either party upon
                  written notice if the other party materially breaches this Agreement and fails to cure
                  such breach within thirty (30) days.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <p>
                  <strong>4. Intellectual Property.</strong> All intellectual property rights in the software
                  remain with Licensor. Licensee acknowledges that no title to or ownership of the software
                  is transferred to Licensee.
                </p>
                
                <p>
                  <strong>5. Limitation of Liability.</strong> In no event shall Licensor be liable for any
                  indirect, incidental, special, or consequential damages arising out of or relating to this
                  Agreement or the use of the software.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Document Info Footer */}
      <div className="bg-card border-t border-border p-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Software License Agreement.pdf</span>
          </div>
          <span>Last analyzed: 2 minutes ago</span>
        </div>
      </div>
    </div>
  );
};