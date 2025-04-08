import React, { useState } from "react";
import { Users, Package, Settings } from "lucide-react";
import MemberManagement from "../components/admin/MemberManagement";
import CategoryManagement from "../components/admin/CategoryManagement";
import ObjectManagement from "../components/admin/ObjectManagement";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("members");

  const tabs = [
    { id: "members", label: "Gestion des Membres", icon: Users },
    { id: "categories", label: "Gestion des Catégories", icon: Package },
    { id: "objects", label: "Gestion des Objets", icon: Settings },
  ];

  return (
    <div className="h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Panneau d’Administration
        </h1>

        {/* Navigation */}
        <div className="flex space-x-4 mb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === "members" && <MemberManagement />}
          {activeTab === "categories" && <CategoryManagement />}
          {activeTab === "objects" && <ObjectManagement />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
