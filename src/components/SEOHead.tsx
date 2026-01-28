import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  includeFAQSchema?: boolean;
}

const SEOHead = ({ includeFAQSchema = false }: SEOHeadProps) => {
  const location = useLocation();

  useEffect(() => {
    // Remove any existing schema scripts
    const existingSchemas = document.querySelectorAll('script[data-schema]');
    existingSchemas.forEach(script => script.remove());

    // SoftwareApplication Schema
    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PreciArte",
      "description": "Sistema completo para papelarias personalizadas: calcule preços, crie orçamentos profissionais, gerencie clientes e aumente seu lucro.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "url": "https://arte-lucrativa-facil.lovable.app",
      "offers": {
        "@type": "Offer",
        "price": "39.90",
        "priceCurrency": "BRL",
        "priceValidUntil": "2027-12-31"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "ratingCount": "3",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    const softwareScriptEl = document.createElement('script');
    softwareScriptEl.type = 'application/ld+json';
    softwareScriptEl.setAttribute('data-schema', 'software');
    softwareScriptEl.textContent = JSON.stringify(softwareSchema);
    document.head.appendChild(softwareScriptEl);

    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "PreciArte",
      "url": "https://arte-lucrativa-facil.lovable.app",
      "logo": "https://arte-lucrativa-facil.lovable.app/favicon.png",
      "description": "Sistema de precificação e gestão para papelarias personalizadas",
      "sameAs": []
    };

    const orgScriptEl = document.createElement('script');
    orgScriptEl.type = 'application/ld+json';
    orgScriptEl.setAttribute('data-schema', 'organization');
    orgScriptEl.textContent = JSON.stringify(organizationSchema);
    document.head.appendChild(orgScriptEl);

    // FAQ Schema (only on FAQ page or when explicitly included)
    if (includeFAQSchema || location.pathname === '/faq') {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Como calcular preço de papelaria personalizada?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O PreciArte calcula automaticamente o preço ideal considerando custos de materiais, mão de obra, tempo de produção e margem de lucro desejada. Basta cadastrar seus produtos e o sistema faz todo o cálculo para você, garantindo que você nunca mais venda no prejuízo."
            }
          },
          {
            "@type": "Question",
            "name": "Qual a margem de lucro ideal para convites personalizados?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A margem de lucro ideal para convites personalizados varia entre 50% e 100%, dependendo da complexidade do trabalho e do mercado local. O PreciArte ajuda você a definir a margem correta para cada tipo de produto, considerando todos os custos envolvidos."
            }
          },
          {
            "@type": "Question",
            "name": "Como calcular custo de impressão para papelaria?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Para calcular o custo de impressão, você precisa considerar: custo do papel por folha, tinta utilizada, desgaste da impressora e energia. O PreciArte automatiza esse cálculo, permitindo que você cadastre seus custos uma vez e o sistema calcule automaticamente para cada produto."
            }
          },
          {
            "@type": "Question",
            "name": "Como fazer orçamento profissional para papelaria?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Um orçamento profissional deve incluir: descrição detalhada dos produtos, quantidade, preço unitário, prazo de entrega e condições de pagamento. O PreciArte gera orçamentos profissionais automaticamente, com sua logo e layout personalizado, prontos para enviar ao cliente."
            }
          },
          {
            "@type": "Question",
            "name": "O PreciArte funciona para todos os tipos de papelaria?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim! O PreciArte foi desenvolvido para atender conviterias, papelarias de festa, scrapbook, artigos personalizados e qualquer negócio que trabalhe com produtos de papel. O sistema é flexível e permite cadastrar qualquer tipo de produto com seus custos específicos."
            }
          }
        ]
      };

      const faqScriptEl = document.createElement('script');
      faqScriptEl.type = 'application/ld+json';
      faqScriptEl.setAttribute('data-schema', 'faq');
      faqScriptEl.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(faqScriptEl);
    }

    // Cleanup on unmount
    return () => {
      const schemas = document.querySelectorAll('script[data-schema]');
      schemas.forEach(script => script.remove());
    };
  }, [includeFAQSchema, location.pathname]);

  return null;
};

export default SEOHead;
