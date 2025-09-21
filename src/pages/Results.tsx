import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PDFViewer } from "@/components/PDFViewer";
import { AnalysisPanel } from "@/components/AnalysisPanel";
import { QAChat } from "@/components/QAChat";
import { useShare } from "@/hooks/useShare";
import { useDownloadSummary } from "@/hooks/useDownloadSummary";
import { Scale, ArrowLeft, Download, Share } from "lucide-react";

const Results = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const [selectedClause, setSelectedClause] = useState<string | null>(null);
  const { shareDocument } = useShare();
  const { downloadSummary } = useDownloadSummary();

  // Mock data - in real app this would be fetched based on docId
  const documentData = {
    title: "Software License Agreement",
    summary: "This is a standard software license agreement that grants limited rights to use the software while retaining ownership with the licensor. Key terms include usage restrictions, liability limitations, and termination conditions.",
    riskScore: "Medium",
    totalClauses: 15,
    riskyClauses: 3,
    pages: 8,
  };

  const handleShare = () => {
    shareDocument(documentData.title);
  };

  const handleDownload = () => {
    downloadSummary(documentData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-primary p-2 rounded-lg">
                  <Scale className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-semibold text-foreground">{documentData.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{documentData.pages} pages</span>
                    <span>{documentData.totalClauses} clauses</span>
                    <Badge 
                      variant={documentData.riskScore === "High" ? "destructive" : 
                              documentData.riskScore === "Medium" ? "secondary" : "default"}
                      className={
                        documentData.riskScore === "High" ? "bg-risk-high text-risk-high-foreground" :
                        documentData.riskScore === "Medium" ? "bg-risk-medium text-risk-medium-foreground" :
                        "bg-risk-low text-risk-low-foreground"
                      }
                    >
                      {documentData.riskScore} Risk
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download Summary
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Two Pane Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Pane - PDF Viewer */}
        <div className="flex-1 border-r border-border">
          <PDFViewer 
            documentId={docId || ""}
            selectedClause={selectedClause}
            onClauseSelect={setSelectedClause}
          />
        </div>

        {/* Right Pane - Analysis Panel */}
        <div className="w-96 flex flex-col bg-muted/20">
          <div className="flex-1 overflow-hidden">
            <AnalysisPanel 
              summary={documentData.summary}
              riskScore={documentData.riskScore}
              onClauseSelect={setSelectedClause}
              selectedClause={selectedClause}
            />
          </div>
          
          {/* Q&A Chat at bottom */}
          <div className="border-t border-border">
            <QAChat documentId={docId || ""} />
          </div>
        </div>
      </div>

      {/* Legal Disclaimer Footer */}
      <div className="bg-warning/10 border-t border-warning/20 px-6 py-2">
        <p className="text-sm text-center text-muted-foreground">
          <strong className="text-warning">Legal Disclaimer:</strong>{" "}
          This is explanatory guidance, not legal advice. Always consult with a qualified attorney for legal decisions.
        </p>
      </div>
    </div>
  );
};

export default Results;