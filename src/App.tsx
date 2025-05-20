import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-pink-500 mb-8">Bienvenue sur Karamelo</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card exemple */}
          <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-6 hover:scale-105 transition-transform">
            <h2 className="text-2xl font-semibold mb-4">Rechercher une chanson</h2>
            <p className="text-gray-400">Trouvez votre chanson préférée parmi notre vaste catalogue</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-6 hover:scale-105 transition-transform">
            <h2 className="text-2xl font-semibold mb-4">Mes Favoris</h2>
            <p className="text-gray-400">Retrouvez toutes vos chansons préférées</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-6 hover:scale-105 transition-transform">
            <h2 className="text-2xl font-semibold mb-4">Dernières Ajouts</h2>
            <p className="text-gray-400">Découvrez les nouvelles chansons ajoutées</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default App
