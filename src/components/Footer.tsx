import { MessageCircle, Mail, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PreciArte
            </h3>
            <p className="text-background/80 text-sm">
              O sistema completo para sua papelaria personalizada crescer e lucrar mais.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#pricing" className="text-background/80 hover:text-primary transition-colors">
                  Planos e Preços
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-primary transition-colors">
                  Funcionalidades
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-primary transition-colors">
                  Depoimentos
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-background/80 hover:text-primary transition-colors">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-primary transition-colors">
                  Tutoriais
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:contato@preciarte.com.br"
                  className="flex items-center gap-2 text-background/80 hover:text-primary transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </li>
            </ul>
            
            <div className="flex gap-3 mt-4">
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-background/10 hover:bg-primary transition-colors flex items-center justify-center"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-background/10 hover:bg-primary transition-colors flex items-center justify-center"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/60">
          <p>© 2025 PreciArte. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
