export default function Footer() {
  return (
    <footer className="bg-gray-800/80 backdrop-blur-md py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <img src="/microphone.svg" alt="Logo Karamelo" className="h-8" />
            <span className="text-gray-300 font-medium">Karamelo</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
              À propos
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
              Contact
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
              Conditions d'utilisation
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-400">© 2025 Karamelo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}