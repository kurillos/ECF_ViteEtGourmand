import { useEffect, useState } from 'react';
import { Menu } from './types/Menu';
import { fetchAllMenus } from './services/api';
import MenuCard from './components/MenuCard';
import Navbar from './partials/Navbar';
import Footer from './partials/Footer';

function App() {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    fetchAllMenus().then(setMenus).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      {/* 1. SECTION HERO & PRÉSENTATION */}
      <section className="relative py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-black mb-6 leading-tight">
              Vite <span className="text-orange-500">&</span> Gourmand
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Depuis 2010, nous transformons vos événements en expériences culinaires inoubliables. 
              Passionnés par les produits locaux et la gastronomie de partage, nous mettons notre 
              savoir-faire de traiteur au service de vos plus beaux moments.
            </p>
            <button className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-orange-600 transition">
              Découvrir nos menus
            </button>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
             <img src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070" alt="Présentation Traiteur" />
          </div>
        </div>
      </section>

      {/* 2. SECTION ÉQUIPE (Professionnalisme) */}
      <section className="py-20 max-w-7xl mx-auto px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Une Équipe de Passionnés</h2>
        <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
          Nos chefs et maîtres d'hôtel sont sélectionnés pour leur rigueur et leur créativité. 
          Chaque détail compte pour garantir l'excellence de votre réception.
        </p>
        <div className="grid md:grid-cols-3 gap-8 italic text-gray-700">
          <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
            "Rigueur, hygiène et créativité sont les piliers de notre cuisine."
          </div>
          <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
            "Un service discret et élégant pour que vos invités se sentent uniques."
          </div>
          <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
            "100% fait maison, de l'apéritif au dessert."
          </div>
        </div>
      </section>

      {/* 3. CATALOGUE DES MENUS (Ta grille actuelle) */}
      <section className="py-20 bg-gray-50 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-10">Nos Menus du Moment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {menus.map((menu) => (
              <MenuCard key={menu.nom} menu={menu} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. AVIS CLIENTS VALIDÉS */}
      <section className="py-20 max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold mb-12 text-center">Ce que nos clients disent</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: "Sophie D.", text: "Une prestation exceptionnelle pour notre mariage. Le menu 'Traditionnel' a bluffé tous nos invités !", stars: 5 },
            { name: "Marc A.", text: "Professionnalisme irréprochable. La qualité des produits est au rendez-vous. Je recommande chaudement.", stars: 5 }
          ].map((review, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4">
              <div className="flex text-orange-400">{"★".repeat(review.stars)}</div>
              <p className="text-gray-600 leading-relaxed italic">"{review.text}"</p>
              <span className="font-bold text-gray-900">— {review.name}</span>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;