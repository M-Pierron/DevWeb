import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { categories } from '../../api';

interface Category {
  _id: string;
  id: string;
  name: string;
  description: string;
}

const CategoryManagement = () => {
  const [categoryList, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: ''
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categories.getAll();
      setCategories(response.data);
      setError('');
    } catch (error) {
      setError('Error fetching categories');
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '' });
    setShowModal(true);
    setError('');
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      id: category.id,
      name: category.name,
      description: category.description
    });
    setShowModal(true);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        const response = await categories.edit(formData);
      } else {
        const response = await categories.create(formData);
      }
      fetchCategories();
      setShowModal(false);
      setError('');
    } catch (error) {
      setError('Error saving category');
      console.error('Error saving category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        await categories.delete(categoryId);
        fetchCategories();
        setError('');
      } catch (error) {
        setError('Error deleting category');
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des Catégories</h2>
        <button
          onClick={handleAddCategory}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter une catégorie
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {categoryList.map((category) => (
          <div
            key={category._id}
            className="flex-1 min-w-full md:min-w-[48%] lg:min-w-[31%] bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">{category.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  title="Modifier"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-gray-600">{category.description}</p>
          </div>
        ))}
      </div>


      {/* Montrer le modal pour ajouter/modifier une catégorie */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/*  */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 max-w-md w-full m-4">
            <h3 className="text-lg font-bold mb-4">
              {editingCategory ? 'Modifier une catégorie' : 'Ajouter une catégorie'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Cadre pour le saisi de l'ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">ID <span className='text-red-600'>*</span></label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 p-2 dark:bg-gray-700 dark:text-white text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              {/* Cadre pour le saisie du nom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Nom</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 p-2 dark:bg-gray-700 dark:text-white text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              {/* Cadre pour le saisie de la description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 p-2 dark:bg-gray-700 dark:text-white text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              {/* Cadre pour les buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingCategory ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>


            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;