import MenuCard from './components/MenuCard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Vite <span className="text-orange-500">&</span> Gourmand
          </h1>
          <div className="flex items-center space-x-2">
            <span className="h-3 w-3 bg-green-500 rounded-full"></span>
            <span className="text-sm font-medium text-gray-600">Dashboard Julie - Connecté</span>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Nos Menus Vedettes</h2>
          <p className="text-gray-500 mt-1">Gérez vos offres et visualisez les statistiques de consultation.</p>
        </div>

        <div className="flex flex-wrap gap-8 justify-start">
          <MenuCard menuNom="Le Traditionnel" />
          {/* Tu pourras copier-coller cette ligne avec d'autres noms plus tard */}
        </div>
      </main>
    </div>
  );
}

export default App;