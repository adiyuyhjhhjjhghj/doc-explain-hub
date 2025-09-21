import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Send, MessageSquare, Bot, User, ExternalLink, Maximize2 } from "lucide-react";

interface QAChatProps {
  documentId: string;
}

interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  citations?: Citation[];
  timestamp: Date;
}

interface Citation {
  clauseId: string;
  page: number;
  text: string;
}

// Mock chat data
const mockMessages: ChatMessage[] = [
  {
    id: "1",
    type: "assistant",
    content: "Hi! I'm here to help you understand this document. You can ask me questions about any clause, term, or concept in your contract.",
    timestamp: new Date(Date.now() - 300000),
  },
];

export const QAChat = ({ documentId }: QAChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const expandedScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
    if (expandedScrollRef.current) {
      expandedScrollRef.current.scrollTop = expandedScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const mockResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: getMockResponse(inputValue),
        citations: getMockCitations(inputValue),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, mockResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getMockResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    if (q.includes("warranty") || q.includes("guarantee")) {
      return "This contract includes a warranty disclaimer clause that states the software is provided 'as is' without any warranty. This means the licensor doesn't guarantee the software will work perfectly or meet your specific needs. This is a high-risk clause as it leaves you without recourse if the software fails.";
    }
    
    if (q.includes("terminate") || q.includes("end") || q.includes("cancel")) {
      return "The termination clause allows the licensor to immediately terminate the agreement upon any breach. This is considered medium risk because you don't get a chance to fix any issues before losing access to the software. Consider negotiating for a cure period.";
    }
    
    if (q.includes("payment") || q.includes("fee") || q.includes("cost")) {
      return "The payment terms require fees to be paid within 30 days of invoice. This is a standard, low-risk clause with reasonable payment terms that are common in software licensing agreements.";
    }
    
    return "I can help you understand any specific clause in this document. Could you ask about a particular section or term you'd like me to explain?";
  };

  const getMockCitations = (question: string): Citation[] => {
    const q = question.toLowerCase();
    
    if (q.includes("warranty")) {
      return [{
        clauseId: "clause-1",
        page: 1,
        text: "The software is provided 'as is' without warranty of any kind."
      }];
    }
    
    if (q.includes("terminate")) {
      return [{
        clauseId: "clause-3",
        page: 1,
        text: "Licensor may terminate this agreement immediately upon breach."
      }];
    }
    
    if (q.includes("payment")) {
      return [{
        clauseId: "clause-2",
        page: 1,
        text: "User agrees to pay license fees within 30 days of invoice date."
      }];
    }
    
    return [];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderChatContent = (isExpandedView = false) => {
    const messageSpacing = isExpandedView ? "space-y-6" : "space-y-4";
    const messagePadding = isExpandedView ? "p-4" : "p-3";
    const textSize = isExpandedView ? "text-base" : "text-sm";
    const iconSize = isExpandedView ? "h-5 w-5" : "h-4 w-4";
    
    return (
      <div className={messageSpacing}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-4 ${
              message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <div className={`p-3 rounded-lg ${
              message.type === "user" 
                ? "bg-primary/10" 
                : "bg-accent/10"
            }`}>
              {message.type === "user" ? (
                <User className={`${iconSize} text-primary`} />
              ) : (
                <Bot className={`${iconSize} text-accent`} />
              )}
            </div>
            
            <div className={`flex-1 ${isExpandedView ? 'max-w-[80%]' : 'max-w-[85%]'} ${
              message.type === "user" ? "text-right" : ""
            }`}>
              <Card className={`${messagePadding} ${
                message.type === "user"
                  ? "bg-primary/5 border-primary/20"
                  : "bg-accent/5 border-accent/20"
              }`}>
                <p className={`${textSize} text-foreground leading-relaxed`}>{message.content}</p>
                
                {/* Citations */}
                {message.citations && message.citations.length > 0 && (
                  <div className={`${isExpandedView ? 'mt-4' : 'mt-3'} space-y-3`}>
                    <p className={`${isExpandedView ? 'text-sm' : 'text-xs'} text-muted-foreground font-medium`}>Sources:</p>
                    {message.citations.map((citation, index) => (
                      <Card key={index} className={`${isExpandedView ? 'p-3' : 'p-2'} bg-muted/50 border-0`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className={`flex items-center space-x-2 ${isExpandedView ? 'mb-2' : 'mb-1'}`}>
                              <Badge variant="outline" className={isExpandedView ? "text-sm" : "text-xs"}>
                                Page {citation.page}
                              </Badge>
                              <ExternalLink className={`${isExpandedView ? 'h-4 w-4' : 'h-3 w-3'} text-muted-foreground`} />
                            </div>
                            <p className={`${isExpandedView ? 'text-sm' : 'text-xs'} text-muted-foreground italic leading-relaxed`}>
                              "{citation.text}"
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
              
              <p className={`${isExpandedView ? 'text-sm' : 'text-xs'} text-muted-foreground mt-2`}>
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
            </div>
          </div>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-start space-x-4">
            <div className="bg-accent/10 p-3 rounded-lg">
              <Bot className={`${iconSize} text-accent`} />
            </div>
            <Card className={`${messagePadding} bg-accent/5 border-accent/20`}>
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{animationDelay: "0.1s"}} />
                <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{animationDelay: "0.2s"}} />
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  };

  const renderInputArea = (isExpandedView = false) => {
    const containerPadding = isExpandedView ? "p-6" : "p-3";
    const inputSpacing = isExpandedView ? "space-x-3" : "space-x-2";
    const buttonSpacing = isExpandedView ? "gap-2 mt-4" : "gap-1 mt-2";
    const buttonSize = isExpandedView ? "h-8 px-3" : "h-6 px-2";
    const textSize = isExpandedView ? "text-sm" : "text-xs";
    
    return (
      <div className={`${containerPadding} border-t border-border`}>
        <div className={`flex ${inputSpacing}`}>
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about any clause or term..."
            className={`flex-1 ${isExpandedView ? 'h-12 text-base' : ''}`}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size={isExpandedView ? "default" : "sm"}
            className="bg-gradient-primary hover:opacity-90"
          >
            <Send className={`${isExpandedView ? 'h-5 w-5' : 'h-4 w-4'}`} />
          </Button>
        </div>
        
        {/* Suggested Questions */}
        <div className={`flex flex-wrap ${buttonSpacing}`}>
          {["What are the warranty terms?", "How can this be terminated?", "What are the payment terms?"].map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              className={`${textSize} ${buttonSize}`}
              onClick={() => setInputValue(suggestion)}
              disabled={isLoading}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-80 flex flex-col bg-card">
      {/* Chat Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-primary p-1.5 rounded-lg">
              <MessageSquare className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h4 className="font-medium text-foreground text-sm">Ask This Document</h4>
              <p className="text-xs text-muted-foreground">Get answers with citations</p>
            </div>
          </div>
          
          <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <div className="bg-gradient-primary p-2 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <span>Ask This Document - Expanded View</span>
                    <p className="text-sm font-normal text-muted-foreground">Get detailed answers with citations</p>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              {/* Expanded Chat Content */}
              <div className="flex flex-col h-[70vh]">
                <ScrollArea className="flex-1 px-6" ref={expandedScrollRef}>
                  {renderChatContent(true)}
                </ScrollArea>
                {renderInputArea(true)}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Messages - Compact View */}
      <ScrollArea className="flex-1 p-3" ref={scrollAreaRef}>
        {renderChatContent(false)}
      </ScrollArea>

      {/* Input Area - Compact View */}
      {renderInputArea(false)}
    </div>
  );
};