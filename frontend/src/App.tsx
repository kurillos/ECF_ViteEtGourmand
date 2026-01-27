import MenuCard from './components/MenuCard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={{ padding: '20px', backgroundColor: '#282c34', color: 'white', marginBottom: '20px' }}>
        <h1>Vite & Gourmand - Dashboard Julie</h1>
      </header>
      
      <main style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        {/* On appelle ton composant avec le nom exact en base de données */}
        <MenuCard menuNom="Le Traditionnel" />
      </main>
    </div>
  );
}

export default App;
