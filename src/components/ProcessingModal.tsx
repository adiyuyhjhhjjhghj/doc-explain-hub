import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Loader2, FileSearch, Brain, Shield, CheckCircle } from "lucide-react";

interface ProcessingModalProps {
  isOpen: boolean;
  progress: number;
  onClose: () => void;
}

export const ProcessingModal = ({ isOpen, progress, onClose }: ProcessingModalProps) => {
  const getStatusMessage = () => {
    if (progress < 25) return "Extracting text from document...";
    if (progress < 50) return "Analyzing legal clauses...";
    if (progress < 75) return "Identifying risk factors...";
    if (progress < 100) return "Generating summary...";
    return "Analysis complete!";
  };

  const getCurrentStep = () => {
    if (progress < 25) return 0;
    if (progress < 50) return 1;
    if (progress < 75) return 2;
    if (progress < 100) return 3;
    return 4;
  };

  const steps = [
    { icon: FileSearch, label: "Text Extraction", description: "OCR and document parsing" },
    { icon: Brain, label: "AI Analysis", description: "Understanding legal clauses" },
    { icon: Shield, label: "Risk Assessment", description: "Identifying potential issues" },
    { icon: CheckCircle, label: "Complete", description: "Ready for review" },
  ];

  const currentStep = getCurrentStep();

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md"  onInteractOutside={(e) => e.preventDefault()}>
        <div className="text-center space-y-6 p-6">
          <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <Loader2 className="h-8 w-8 text-primary-foreground animate-spin" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Processing Your Document
            </h3>
            <p className="text-muted-foreground">
              {getStatusMessage()}
            </p>
          </div>

          <div className="space-y-4">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground">{progress}% complete</p>
          </div>

          {/* Processing Steps */}
          <div className="space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep && progress < 100;
              const isCompleted = index < currentStep || progress >= 100;
              
              return (
                <Card 
                  key={index}
                  className={`p-3 border transition-all duration-300 ${
                    isActive 
                      ? "border-primary bg-primary/5" 
                      : isCompleted 
                      ? "border-success bg-success/5" 
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isActive 
                        ? "bg-primary/10" 
                        : isCompleted 
                        ? "bg-success/10" 
                        : "bg-muted"
                    }`}>
                      <Icon className={`h-4 w-4 ${
                        isActive 
                          ? "text-primary" 
                          : isCompleted 
                          ? "text-success" 
                          : "text-muted-foreground"
                      }`} />
                    </div>
                    <div className="text-left">
                      <p className={`font-medium text-sm ${
                        isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {step.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                    {isActive && (
                      <Loader2 className="h-4 w-4 text-primary animate-spin ml-auto" />
                    )}
                    {isCompleted && (
                      <CheckCircle className="h-4 w-4 text-success ml-auto" />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
            Your document is being processed securely. Analysis typically takes 30-60 seconds.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};