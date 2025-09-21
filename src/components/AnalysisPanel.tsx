import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  MessageSquare, 
  ExternalLink,
  Shield,
  TrendingUp,
  Clock,
  Maximize2,
  X
} from "lucide-react";

interface AnalysisPanelProps {
  summary: string;
  riskScore: string;
  selectedClause: string | null;
  onClauseSelect: (clauseId: string) => void;
}

// Mock clause data
const mockClauses = [
  {
    id: "clause-1",
    title: "Warranty Disclaimer",
    text: "The software is provided 'as is' without warranty of any kind.",
    riskLevel: "high",
    riskFactors: ["No warranty protection", "Potential liability exposure"],
    explanation: "This clause removes all warranties, meaning you have no recourse if the software fails or causes problems. This is common but places all risk on you as the licensee.",
    page: 1
  },
  {
    id: "clause-2",
    title: "Payment Terms",
    text: "User agrees to pay license fees within 30 days of invoice date.",
    riskLevel: "low",
    riskFactors: ["Standard payment terms"],
    explanation: "This is a standard payment clause with reasonable 30-day terms. No unusual risks identified.",
    page: 1
  },
  {
    id: "clause-3",
    title: "Termination Rights",
    text: "Licensor may terminate this agreement immediately upon breach.",
    riskLevel: "medium",
    riskFactors: ["Immediate termination allowed", "No cure period specified"],
    explanation: "This allows immediate termination without giving you time to fix any issues. Consider negotiating for a cure period.",
    page: 1
  }
];

export const AnalysisPanel = ({ summary, riskScore, selectedClause, onClauseSelect }: AnalysisPanelProps) => {
  const [activeTab, setActiveTab] = useState<"summary" | "clauses">("summary");
  const [isExpanded, setIsExpanded] = useState(false);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "bg-risk-high text-risk-high-foreground";
      case "medium": return "bg-risk-medium text-risk-medium-foreground";
      case "low": return "bg-risk-low text-risk-low-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const selectedClauseData = mockClauses.find(c => c.id === selectedClause);

  return (
    <div className="h-full flex flex-col">
      {/* Analysis Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Document Analysis</h3>
          <div className="flex items-center space-x-2">
            <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between">
                    <span>Document Analysis - Expanded View</span>
                    <Badge className={getRiskColor(riskScore.toLowerCase())}>
                      <Shield className="h-3 w-3 mr-1" />
                      {riskScore} Risk
                    </Badge>
                  </DialogTitle>
                </DialogHeader>
                
                {/* Expanded Content */}
                <ScrollArea className="max-h-[70vh] pr-6">
                  <div className="space-y-6">
                    {/* Key Metrics in Expanded View */}
                    <div className="grid grid-cols-3 gap-4">
                      <Card className="p-4 text-center">
                        <div className="text-2xl font-bold text-foreground">15</div>
                        <div className="text-sm text-muted-foreground">Total Clauses</div>
                      </Card>
                      <Card className="p-4 text-center bg-risk-high/10">
                        <div className="text-2xl font-bold text-risk-high">3</div>
                        <div className="text-sm text-muted-foreground">High Risk</div>
                      </Card>
                      <Card className="p-4 text-center bg-success/10">
                        <div className="text-2xl font-bold text-success">80%</div>
                        <div className="text-sm text-muted-foreground">Clarity Score</div>
                      </Card>
                    </div>

                    {/* Executive Summary - Expanded */}
                    <Card className="p-6 bg-gradient-card border-0">
                      <div className="flex items-center space-x-2 mb-4">
                        <TrendingUp className="h-6 w-6 text-accent" />
                        <h4 className="text-lg font-semibold text-foreground">Executive Summary</h4>
                      </div>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {summary}
                      </p>
                    </Card>

                    {/* Key Insights - Expanded */}
                    <Card className="p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-4">Key Insights</h4>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4 p-4 rounded-lg bg-risk-high/5 border border-risk-high/20">
                          <div className="bg-risk-high/20 p-2 rounded-full mt-1">
                            <AlertTriangle className="h-4 w-4 text-risk-high" />
                          </div>
                          <div>
                            <p className="text-foreground font-semibold mb-1">Warranty Disclaimer</p>
                            <p className="text-muted-foreground">No warranty protection increases your risk. This clause removes all warranties, meaning you have no recourse if the software fails or causes problems.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-4 p-4 rounded-lg bg-success/5 border border-success/20">
                          <div className="bg-success/20 p-2 rounded-full mt-1">
                            <CheckCircle className="h-4 w-4 text-success" />
                          </div>
                          <div>
                            <p className="text-foreground font-semibold mb-1">Standard Terms</p>
                            <p className="text-muted-foreground">Payment and basic usage terms are reasonable with no unusual risks identified.</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4 p-4 rounded-lg bg-risk-medium/5 border border-risk-medium/20">
                          <div className="bg-risk-medium/20 p-2 rounded-full mt-1">
                            <Clock className="h-4 w-4 text-risk-medium" />
                          </div>
                          <div>
                            <p className="text-foreground font-semibold mb-1">Termination Risk</p>
                            <p className="text-muted-foreground">Immediate termination clause needs attention. Consider negotiating for a cure period.</p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Recommendations - Expanded */}
                    <Card className="p-6 bg-accent/5 border-accent/20">
                      <h4 className="text-lg font-semibold text-foreground mb-4">Recommendations</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-background/50">
                          <span className="text-accent text-xl font-bold">1</span>
                          <span className="text-muted-foreground">Consider negotiating warranty terms for critical functions to reduce your liability exposure.</span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-background/50">
                          <span className="text-accent text-xl font-bold">2</span>
                          <span className="text-muted-foreground">Request a cure period before immediate termination to allow time to fix any issues.</span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-background/50">
                          <span className="text-accent text-xl font-bold">3</span>
                          <span className="text-muted-foreground">Review liability limitations carefully to understand your exposure.</span>
                        </div>
                      </div>
                    </Card>

                    {/* Clauses Overview - Expanded */}
                    <Card className="p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-4">Risk Analysis by Clause</h4>
                      <div className="space-y-4">
                        {mockClauses.map((clause) => (
                          <div 
                            key={clause.id}
                            className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h5 className="font-semibold text-foreground">{clause.title}</h5>
                                  <Badge className={getRiskColor(clause.riskLevel)}>
                                    {clause.riskLevel} risk
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">Page {clause.page}</p>
                              </div>
                            </div>
                            
                            <div className="bg-muted/30 p-3 rounded-lg mb-3">
                              <p className="text-sm text-muted-foreground italic">
                                "{clause.text}"
                              </p>
                            </div>

                            <p className="text-sm text-foreground mb-3">
                              {clause.explanation}
                            </p>
                            
                            {clause.riskFactors.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {clause.riskFactors.map((factor, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {factor}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <Badge className={getRiskColor(riskScore.toLowerCase())}>
              <Shield className="h-3 w-3 mr-1" />
              {riskScore} Risk
            </Badge>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-muted/50 rounded-lg p-2">
            <div className="text-lg font-semibold text-foreground">15</div>
            <div className="text-xs text-muted-foreground">Total Clauses</div>
          </div>
          <div className="bg-risk-high/10 rounded-lg p-2">
            <div className="text-lg font-semibold text-risk-high">3</div>
            <div className="text-xs text-muted-foreground">High Risk</div>
          </div>
          <div className="bg-success/10 rounded-lg p-2">
            <div className="text-lg font-semibold text-success">80%</div>
            <div className="text-xs text-muted-foreground">Clarity Score</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-border bg-card">
        <Button
          variant={activeTab === "summary" ? "default" : "ghost"}
          size="sm"
          className="flex-1 rounded-none"
          onClick={() => setActiveTab("summary")}
        >
          <FileText className="h-4 w-4 mr-2" />
          Summary
        </Button>
        <Button
          variant={activeTab === "clauses" ? "default" : "ghost"}
          size="sm"
          className="flex-1 rounded-none"
          onClick={() => setActiveTab("clauses")}
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Clauses
        </Button>
      </div>

      {/* Content Area */}
      <ScrollArea className="flex-1">
        {activeTab === "summary" && (
          <div className="p-4 space-y-4">
            {/* Document Summary */}
            <Card className="p-4 bg-gradient-card border-0">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="h-5 w-5 text-accent" />
                <h4 className="font-medium text-foreground">Executive Summary</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {summary}
              </p>
            </Card>

            {/* Key Insights */}
            <Card className="p-4">
              <h4 className="font-medium text-foreground mb-3">Key Insights</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-risk-high/10 p-1 rounded-full mt-0.5">
                    <AlertTriangle className="h-3 w-3 text-risk-high" />
                  </div>
                  <div className="text-sm">
                    <p className="text-foreground font-medium">Warranty Disclaimer</p>
                    <p className="text-muted-foreground">No warranty protection increases your risk</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-success/10 p-1 rounded-full mt-0.5">
                    <CheckCircle className="h-3 w-3 text-success" />
                  </div>
                  <div className="text-sm">
                    <p className="text-foreground font-medium">Standard Terms</p>
                    <p className="text-muted-foreground">Payment and basic usage terms are reasonable</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-risk-medium/10 p-1 rounded-full mt-0.5">
                    <Clock className="h-3 w-3 text-risk-medium" />
                  </div>
                  <div className="text-sm">
                    <p className="text-foreground font-medium">Termination Risk</p>
                    <p className="text-muted-foreground">Immediate termination clause needs attention</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-4 bg-accent/5 border-accent/20">
              <h4 className="font-medium text-foreground mb-3">Recommendations</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Consider negotiating warranty terms for critical functions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Request a cure period before immediate termination</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent mt-1">•</span>
                  <span>Review liability limitations carefully</span>
                </li>
              </ul>
            </Card>
          </div>
        )}

        {activeTab === "clauses" && (
          <div className="p-4 space-y-3">
            {mockClauses.map((clause) => (
              <Card 
                key={clause.id}
                className={`p-4 cursor-pointer transition-all duration-200 ${
                  selectedClause === clause.id 
                    ? "ring-2 ring-primary bg-primary/5" 
                    : "hover:bg-muted/50"
                }`}
                onClick={() => onClauseSelect(clause.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-medium text-foreground text-sm">{clause.title}</h5>
                      <Badge className={getRiskColor(clause.riskLevel)} variant="secondary">
                        {clause.riskLevel}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Page {clause.page} • Click to highlight in document
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
                
                <p className="text-sm text-muted-foreground italic mb-3">
                  "{clause.text}"
                </p>

                <div className="space-y-2">
                  <p className="text-xs text-foreground">
                    {clause.explanation}
                  </p>
                  
                  {clause.riskFactors.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {clause.riskFactors.map((factor, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Explain
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <FileText className="h-3 w-3 mr-1" />
                    Cite
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Selected Clause Detail */}
      {selectedClauseData && (
        <div className="border-t border-border bg-accent/5 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${
              selectedClauseData.riskLevel === "high" ? "bg-risk-high" :
              selectedClauseData.riskLevel === "medium" ? "bg-risk-medium" : "bg-risk-low"
            }`} />
            <span className="text-sm font-medium text-foreground">
              {selectedClauseData.title}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {selectedClauseData.explanation}
          </p>
        </div>
      )}
    </div>
  );
};