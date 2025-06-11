import type { FC } from 'react';

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-card border-t border-border py-6 mt-12 shadow-sm ${className}`.trim()} role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <img 
              src="/microphone.svg" 
              alt="Logo Karamelo" 
              className="h-8" 
              loading="lazy"
            />
            <span className="text-card-foreground font-medium">Karamelo</span>
          </div>
          
          <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6" role="navigation" aria-label="Liens du pied de page">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded"
              aria-label="En savoir plus sur Karamelo"
            >
              À propos
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded"
              aria-label="Nous contacter"
            >
              Contact
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded"
              aria-label="Conditions d'utilisation"
            >
              Conditions d'utilisation
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded"
              aria-label="Politique de confidentialité"
            >
              Politique de confidentialité
            </a>
          </nav>
        </div>
        
        <div className="border-t border-border mt-6 pt-6 text-center">
          <p className="text-muted-foreground">© 2025 Karamelo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;