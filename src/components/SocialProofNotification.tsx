import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

const NAMES = [
  "Amanda",
  "Juliana",
  "Camila",
  "Fernanda",
  "Larissa",
  "Beatriz",
  "Carolina",
  "Mariana",
  "Gabriela",
  "Isabela",
  "Letícia",
  "Rafaela",
  "Natália",
  "Patrícia",
  "Vanessa",
];

const SocialProofNotification = () => {
  const [visible, setVisible] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [spotsLeft, setSpotsLeft] = useState(5);
  const [nameIndex, setNameIndex] = useState(0);

  useEffect(() => {
    const showNotification = () => {
      const name = NAMES[nameIndex % NAMES.length];
      setCurrentName(name);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 4000);

      setNameIndex((prev) => prev + 1);
      setSpotsLeft((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const initialTimer = setTimeout(() => {
      showNotification();
    }, 8000);

    const interval = setInterval(() => {
      showNotification();
    }, 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [nameIndex]);

  return (
    <div
      className={`fixed bottom-20 left-4 z-40 max-w-xs transition-all duration-500 ${
        visible
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0"
      }`}
    >
      <div className="bg-card border border-border rounded-xl shadow-lg p-4 flex items-start gap-3">
        <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">
            {currentName} acabou de assinar! 🎉
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Resta{spotsLeft > 1 ? "m" : ""}{" "}
            <span className="font-bold text-destructive">
              {spotsLeft} vaga{spotsLeft > 1 ? "s" : ""}
            </span>{" "}
            com desconto
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialProofNotification;
