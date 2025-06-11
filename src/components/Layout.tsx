import type { FC, ReactNode } from 'react';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  onCategorySelect?: (category: string) => void;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
}

const Layout: FC<LayoutProps> = ({ 
  children, 
  onCategorySelect,
  onProfileClick,
  onLogoutClick,
  className = '' 
}) => {
  return (
    <div className={`min-h-screen bg-background text-foreground ${className}`.trim()}>
      <Header 
        onProfileClick={onProfileClick}
        onLogoutClick={onLogoutClick}
      />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Sidebar onCategorySelect={onCategorySelect} />
            
            <section className="md:col-span-2 space-y-6" aria-label="Contenu principal">
              {children}
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
