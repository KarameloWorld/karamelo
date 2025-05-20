import type {ReactNode} from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
           <img src="/logo.png" alt="Logo Karamelo" className="h-28" />
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg transition-colors">
                Mon Profil
              </button>
              <button className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
                Déconnexion
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1 bg-gray-800/50 backdrop-blur-md rounded-lg p-6 sticky top-16">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Catégories</h2>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg transition-colors">
                  Pop
                </button>
                <button className="w-full px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg transition-colors">
                  Rock
                </button>
                <button className="w-full px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg transition-colors">
                  Rap
                </button>
                <button className="w-full px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg transition-colors">
                  Variété
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/80 backdrop-blur-md py-6 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400">© 2025 Karamelo. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
