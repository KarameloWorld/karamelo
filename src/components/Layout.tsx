import type {ReactNode} from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  onCategorySelect?: (category: string) => void;
}

export default function Layout({ children, onCategorySelect }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Sidebar onCategorySelect={onCategorySelect} />

          <div className="md:col-span-2 space-y-6">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
