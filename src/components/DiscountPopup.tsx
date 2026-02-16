import { useState, useEffect } from "react";
import { CheckCircle, X, Sparkles } from "lucide-react";

interface DiscountPopupProps {
  onClaimDiscount: () => void;
}

const DiscountPopup = ({ onClaimDiscount }: DiscountPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const discountClaimed = sessionStorage.getItem("discountClaimed");
    if (discountClaimed) {
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem("discountClaimed", "true");
      onClaimDiscount();
      setTimeout(() => {
        document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClaimDiscount]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top duration-500">
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-3 px-4">
        <div className="container mx-auto flex items-center justify-center gap-3 relative">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm md:text-base font-semibold text-center">
            <Sparkles className="w-4 h-4 inline mr-1" />
            Cupom de desconto aplicado! Até 50% OFF nos planos
            <Sparkles className="w-4 h-4 inline ml-1" />
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-0 p-1 rounded-sm hover:opacity-80 transition-opacity"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountPopup;
