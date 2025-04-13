import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { objects, categories } from '../../api';

interface Object {
  _id: string;
  name: string;
  description: string;
  category_id: string;
}

interface Category {
  _id: string;
  name: string;
}

const ObjectManagement = () => {
  const [objectList, setObjects] = useState<Object[]>([]);
  const [categoryList, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingObject, setEditingObject] = useState<Object | null>(null);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    category_id: string;
  }>({
    name: '',
    description: '',
    category_id: ''
  });

  useEffect(() => {
    fetchObjects();
    fetchCategories();
  }, []);

  const fetchObjects = async () => {
    try {
      const response = await objects.getAll();
      setObjects(response.data);
      setError('');
    } catch (error) {
      setError('Error fetching objects');
      console.error('Error fetching objects:', error);
    }
  };

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

  const handleAddObject = () => {
    setEditingObject(null);
    setFormData({
      name: '',
      description: '',
      category_id: ''
    });
    setShowModal(true);
    setError('');
  };

  const handleEditObject = (object: Object) => {
    setEditingObject(object);
    setFormData({
      name: object.name,
      description: object.description,
      category_id: object.category_id
    });
    setShowModal(true);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingObject) {
        await objects.update(editingObject._id, formData);
      } else {
        await objects.create(formData);
      }
      fetchObjects();
      setShowModal(false);
      setError('');
    } catch (error) {
      setError('Error saving object');
      console.error('Error saving object:', error);
    }
  };

  const handleDeleteObject = async (objectId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet objet ?')) {
      try {
        await objects.delete(objectId);
        fetchObjects();
        setError('');
      } catch (error) {
        setError('Error deleting object');
        console.error('Error deleting object:', error);
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
        <h2 className="text-2xl font-bold">Gestion des Objets</h2>
        <button
          onClick={handleAddObject}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter un objet
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {objectList.map((object) => (
              <tr key={object._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{object.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{object.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {categoryList.find(c => c._id === object.category_id)?.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditObject(object)}
                    className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
                    title="Modifier"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteObject(object._id)}
                    className="text-red-600 hover:text-red-900 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full m-4">
            <h3 className="text-lg font-bold mb-4">
              {editingObject ? 'Modifier un objet' : 'Ajouter un objet'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categoryList.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
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
                  {editingObject ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectManagement;