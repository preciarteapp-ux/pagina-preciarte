import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

const AppScreenshot = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleUrlSubmit = () => {
    if (imageUrl.trim()) {
      setPreviewUrl(imageUrl);
      toast.success("Screenshot do app adicionado com sucesso!");
    } else {
      toast.error("Por favor, insira uma URL válida");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Arquivo muito grande. Máximo 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
        toast.success("Screenshot do app carregado com sucesso!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Veja o PreciArte em Ação
            </h2>
            <p className="text-xl text-muted-foreground">
              Adicione screenshots do aplicativo para mostrar suas funcionalidades
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] border border-border">
            <div className="space-y-6">
              {/* URL Input */}
              <div>
                <label className="block text-sm font-medium mb-2 text-card-foreground">
                  Adicionar por URL
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="url"
                      placeholder="https://exemplo.com/imagem.png"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button onClick={handleUrlSubmit} variant="hero">
                    Adicionar
                  </Button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">ou</span>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium mb-2 text-card-foreground">
                  Fazer upload da imagem
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-card-foreground font-medium mb-1">
                      Clique para fazer upload
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG ou WEBP (máx. 5MB)
                    </p>
                  </label>
                </div>
              </div>

              {/* Preview */}
              {previewUrl && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-card-foreground">
                    Preview:
                  </h3>
                  <div className="relative rounded-xl overflow-hidden border border-primary/20 shadow-[var(--shadow-glow)]">
                    <img
                      src={previewUrl}
                      alt="App Preview"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppScreenshot;
