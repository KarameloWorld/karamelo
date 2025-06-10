import type { FC } from 'react';

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-gray-800/80 backdrop-blur-md py-6 mt-12 ${className}`.trim()} role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <img 
              src="/microphone.svg" 
              alt="Logo Karamelo" 
              className="h-8" 
              loading="lazy"
            />
            <span className="text-gray-300 font-medium">Karamelo</span>
          </div>
          
          <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6" role="navigation" aria-label="Liens du pied de page">
            <a 
              href="#" 
              className="text-gray-400 hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
              aria-label="En savoir plus sur Karamelo"
            >
              À propos
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
              aria-label="Nous contacter"
            >
              Contact
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
              aria-label="Conditions d'utilisation"
            >
              Conditions d'utilisation
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
              aria-label="Politique de confidentialité"
            >
              Politique de confidentialité
            </a>
          </nav>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-400">© 2025 Karamelo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;