import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { ProcessingModal } from "@/components/ProcessingModal";
import { SignInModal } from "@/components/SignInModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Scale, Shield, FileText, MessageSquare } from "lucide-react";

const Home = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [showSignIn, setShowSignIn] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setProcessingProgress(0);

    // Simulate processing with progress updates
    const progressInterval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          // Navigate to results after processing complete
          setTimeout(() => {
            setIsProcessing(false);
            navigate("/results/demo-contract-123");
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="bg-card/90 backdrop-blur-sm border-b border-border shadow-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Scale className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">LegalSimplify</h1>
                <p className="text-sm text-muted-foreground">AI Contract Explainer</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowSignIn(true)}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Understand Your Legal Documents
            <span className="block text-2xl font-normal text-muted-foreground mt-2">
              Upload a contract and get instant AI-powered analysis
            </span>
          </h2>
          
          <div className="flex justify-center space-x-8 mt-8 mb-12">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <FileText className="h-5 w-5 text-accent" />
              <span>Plain language summary</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Shield className="h-5 w-5 text-warning" />
              <span>Risk highlights</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MessageSquare className="h-5 w-5 text-success" />
              <span>Q&A with citations</span>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto">
          <FileUpload onFileSelect={handleFileUpload} />
          
          {/* Legal Disclaimer */}
          <Card className="mt-8 p-4 bg-muted/50 border-warning/20">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <strong className="text-warning">Legal Disclaimer:</strong>{" "}
                This is explanatory guidance, not legal advice. Always consult with a qualified attorney for legal decisions.
              </div>
            </div>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <Card className="p-6 text-center bg-gradient-card border-0 shadow-card hover:shadow-hover transition-all duration-300">
            <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Smart Analysis</h3>
            <p className="text-sm text-muted-foreground">
              AI breaks down complex legal language into plain English explanations
            </p>
          </Card>
          
          <Card className="p-6 text-center bg-gradient-card border-0 shadow-card hover:shadow-hover transition-all duration-300">
            <div className="bg-warning/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-warning" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Risk Detection</h3>
            <p className="text-sm text-muted-foreground">
              Automatically identifies potentially risky clauses and terms
            </p>
          </Card>
          
          <Card className="p-6 text-center bg-gradient-card border-0 shadow-card hover:shadow-hover transition-all duration-300">
            <div className="bg-success/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Ask Questions</h3>
            <p className="text-sm text-muted-foreground">
              Chat with your document and get answers with specific citations
            </p>
          </Card>
        </div>
      </main>

      {/* Processing Modal */}
      <ProcessingModal 
        isOpen={isProcessing} 
        progress={processingProgress}
        onClose={() => setIsProcessing(false)}
      />
      
      {/* Sign In Modal */}
      <SignInModal 
        isOpen={showSignIn} 
        onClose={() => setShowSignIn(false)}
      />
    </div>
  );
};

export default Home;