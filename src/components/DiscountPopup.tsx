import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles } from "lucide-react";

interface DiscountPopupProps {
  onClaimDiscount: () => void;
}

const DiscountPopup = ({ onClaimDiscount }: DiscountPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if discount was already claimed in this session
    const discountClaimed = sessionStorage.getItem("discountClaimed");
    if (!discountClaimed) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClaimDiscount = () => {
    sessionStorage.setItem("discountClaimed", "true");
    setIsOpen(false);
    onClaimDiscount();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-card to-secondary border-primary/30">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <Gift className="w-8 h-8 text-primary-foreground" />
          </div>
          <DialogTitle className="text-2xl md:text-3xl font-bold text-center flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-accent" />
            Parabéns!
            <Sparkles className="w-6 h-6 text-accent" />
          </DialogTitle>
          <DialogDescription className="text-center space-y-3 pt-4">
            <p className="text-xl font-semibold text-foreground">
              Você acaba de ganhar
            </p>
            <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-4xl md:text-5xl font-bold py-3 px-6 rounded-xl inline-block">
              ATÉ 50% OFF
            </div>
            <p className="text-lg text-muted-foreground">
              34% no Semestral e 50% no Anual!
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <Button 
            variant="hero" 
            size="xl" 
            className="w-full"
            onClick={handleClaimDiscount}
          >
            <Gift className="w-5 h-5 mr-2" />
            Resgatar Meu Desconto
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountPopup;
