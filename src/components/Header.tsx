import type { FC } from 'react';

import Button from './Button';

interface HeaderProps {
  className?: string;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
}

const Header: FC<HeaderProps> = ({ 
  className = '',
  onProfileClick,
  onLogoutClick 
}) => {
  return (
    <header className={`bg-gray-800/80 backdrop-blur-md sticky top-0 z-50 ${className}`.trim()}>
      <nav className="container mx-auto px-4 py-4" role="navigation" aria-label="Navigation principale">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="primary" 
              onClick={onProfileClick}
              aria-label="Accéder au profil"
            >
              Mon Profil
            </Button>
            <Button 
              variant="danger" 
              onClick={onLogoutClick}
              aria-label="Se déconnecter"
            >
              Déconnexion
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;