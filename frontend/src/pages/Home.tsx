import React, { useEffect, useState } from 'react';
import { fetchAvis } from '../services/api';
import { Menu } from '../types/Menu';
import { fetchAllMenus } from '../services/api';
import MenuCard from '../components/MenuCard';
import Navbar from '../partials/Navbar';
import Footer from '../partials/Footer';
import AvisForm from "../components/AvisForm";

const Home = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [avisValides, setAvisValides] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {
  // 1. Chargement des menus
  fetchAllMenus()
    .then((data) => {
      setMenus(data);
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des menus :", error);
    })
    .finally(() => {
      setLoading(false);
    });

  // 2. Chargement des avis (indépendant)
  fetchAvis()
    .then((data) => {
      setAvisValides(data);
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des avis :", error);
    });
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
              <MenuCard key={menu.id} menu={menu} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black italic">Votre avis nous intéresse</h2>
            <p className="text-gray-500 mt-2">Partagez votre experience chez Vite & Gourmand</p>
          </div>

            <AvisForm/>
        </div>
      </section>

      {/* 4. AVIS CLIENTS VALIDÉS */}
      <section className="py-20 max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold mb-12 text-center">Ce que nos clients disent</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {avisValides.map((avis: any) => (
            <div key={avis.id} className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between'>
              <div>
                <div className='flex text-orange-500 mb-4'>
                  {[...Array(avis.note)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className='text-gray-600 mb-6'>{avis.message}</p>
                <p className='font-bold text-gray-900'>- {avis.nom}</p>
              </div>
            </div>
            ))}

            {avisValides.length === 0 && (
              <p className='text-center text-gray-400'>Soyez le premier à donner votre avis !</p>
            )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;