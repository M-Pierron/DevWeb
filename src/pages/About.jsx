import "../App.css"
import Nav from "../components/nav.jsx"
import { Home, Users, Shield, Zap, Clock, Settings } from 'lucide-react';

function About() {
  return (
    <>
    <Nav name ="À PROPOS"/>
    <div className ="about mt-10">
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#2c4187] mb-4">À Propos de CY-House</h1>
          <p className="text-xl text-gray-600 mb-12">Votre maison connectée, simplifiée et sécurisée</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-gray-200 p-6 rounded-lg shadow-md border-t-4 border-[#2c4187]">
            <div className="flex items-center justify-center w-12 h-12 bg-[#2c4187] rounded-full mb-4 mx-auto">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#2c4187] text-center mb-3">Gestion Centralisée</h3>
            <p className="text-gray-600 text-center">Contrôlez tous vos objets connectés depuis une seule interface intuitive et ergonomique.</p>
          </div>

          <div className="bg-gray-200 p-6 rounded-lg shadow-md border-t-4 border-[#2c4187]">
            <div className="flex items-center justify-center w-12 h-12 bg-[#2c4187] rounded-full mb-4 mx-auto">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#2c4187] text-center mb-3">Sécurité Maximale</h3>
            <p className="text-gray-600 text-center">Vos données sont protégées avec les dernières technologies de cryptage et de sécurisation.</p>
          </div>

          <div className="bg-gray-200 p-6 rounded-lg shadow-md border-t-4 border-[#2c4187]">
            <div className="flex items-center justify-center w-12 h-12 bg-[#2c4187] rounded-full mb-4 mx-auto">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#2c4187] text-center mb-3">Performance Optimale</h3>
            <p className="text-gray-600 text-center">Optimisez votre consommation énergétique et le fonctionnement de vos appareils.</p>
          </div>
        </div>

        <div className="mt-16 bg-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-[#2c4187] mb-6">Notre Mission</h2>
            <p className="text-gray-600 mb-6">
              CY-House est né de la volonté de simplifier la gestion des maisons connectées. Notre plateforme permet aux utilisateurs de contrôler et visualiser l'ensemble de leurs objets connectés de manière intuitive et sécurisée.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#2c4187]" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-[#2c4187]">Surveillance en Temps Réel</h3>
                  <p className="mt-2 text-gray-600">Suivez l'état de vos appareils et recevez des notifications instantanées.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Settings className="w-6 h-6 text-[#2c4187]" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-[#2c4187]">Personnalisation de votre profil</h3>
                  <p className="mt-2 text-gray-600">Modifier votre profil et vos informations personnels à tout moment et de manière sécurisée.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-[#2c4187] mb-4">ET AMUSEZ VOUS A FAIRE TOURNER TOUT LES LOGOS CY-HOUSE PRESENT SUR LE SITE !</h2>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}

export default About
