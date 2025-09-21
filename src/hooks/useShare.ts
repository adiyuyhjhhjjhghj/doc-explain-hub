import { useToast } from "@/hooks/use-toast";

export const useShare = () => {
  const { toast } = useToast();

  const shareDocument = async (title: string, url?: string) => {
    const shareUrl = url || window.location.href;
    const shareData = {
      title: `Legal Analysis: ${title}`,
      text: `Check out this legal document analysis on LegalSimplify`,
      url: shareUrl,
    };

    try {
      // Try native Web Share API first (mobile)
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        return;
      }
      
      // Fallback to copying to clipboard
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Document link has been copied to your clipboard.",
      });
    } catch (error) {
      // If clipboard fails, show manual copy option
      console.error("Share failed:", error);
      toast({
        title: "Share link",
        description: shareUrl,
        duration: 5000,
      });
    }
  };

  return { shareDocument };
};