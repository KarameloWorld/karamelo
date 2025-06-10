import Button from './Button';

export default function Header() {
  return (
    <header className="bg-gray-800/80 backdrop-blur-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <img src="/logo.png" alt="Logo Karamelo" className="h-28" />
          <div className="flex items-center space-x-4">
            <Button variant="primary">
              Mon Profil
            </Button>
            <Button variant="danger">
              Déconnexion
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}