import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { objects, categories } from '../../api';
import AccordionItem from '../Accordion/accordionItem';

interface Object {
  _id: string;
  id: string;
  name: string;
  description: string;
  categoryId: string;
}

interface Category {
  _id: string;
  id: string;
  name: string;
}

const ObjectManagement = () => {
  const [objectList, setObjects] = useState<Object[]>([]);
  const [categoryList, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingObject, setEditingObject] = useState<Object | null>(null);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<{
    id: string;
    name: string;
    description: string;
    categoryId: string;
  }>({
    id: '',
    name: '',
    description: '',
    categoryId: ''
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
      id: '',
      name: '',
      description: '',
      categoryId: ''
    });
    setShowModal(true);
    setError('');
  };

  const handleEditObject = async (object: Object) => {
      setEditingObject(object);
      setFormData({
        id: object.id,
        name: object.name,
        description: object.description,
        categoryId: object.categoryId
      });
      console.log(formData);
      setShowModal(true);
      setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingObject) {
        const response = await objects.edit(formData);
      } else {
        const response = await objects.create(formData);
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

      <div className="overflow-x-auto bg-white	dark:bg-gray-800 rounded-lg shadow">
        <div className="min-w-full flex flex-col divide-y divide-gray-200">
          <div className="hidden md:flex bg-gray-50 	dark:bg-gray-700 dark:text-gray-300 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="flex-1">ID</div>
            <div className="flex-1">Nom</div>
            <div className="flex-1">Description</div>
            <div className="flex-1">Catégorie</div>
            <div className="w-32">Actions</div>
          </div>
          {objectList.map((object) => (
            <div key={object._id} className="flex flex-col md:flex-row px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
              {/* ID de l'appareil */}
              <div className="flex-1 mb-2 md:mb-0">
                <div className="font-medium text-gray-900 dark:text-gray-300">{object.id}</div>
              </div>
              {/* Nom de l'appareil */}
              <div className="flex-1 mb-2 md:mb-0">
                <div className="font-medium text-gray-900 dark:text-gray-300">{object.name}</div>
              </div>
              {/* Description de l'appareil */}
              <div className="flex-1 mb-2 md:mb-0">
                <div className="text-gray-500 dark:text-gray-300">{object.description}</div>
              </div>
              {/* La catégorie de l'appareil */}
              <div className="flex-1 mb-2 md:mb-0">
                <div className="text-gray-500 dark:text-gray-300">
                  {categoryList.find(c => c.id === object.categoryId)?.name}
                </div>
              </div>
              {/* Actions sur l'appareil */}
              <div className="w-32 flex items-start space-x-4">
                <button
                  onClick={() => handleEditObject(object)}
                  className="text-blue-600 hover:text-blue-900 transition-colors"
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
              </div>
            </div>
          ))}
        </div>
      </div>


      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 max-w-md w-full m-4">
            <h3 className="text-lg font-bold mb-4">
              {editingObject ? 'Modifier un objet' : 'Ajouter un objet'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Cadre pour le saisie de l'ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">ID</label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 dark:bg-gray-700 dark:text-white text-black p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                  className="mt-1 dark:bg-gray-700 dark:text-white text-black p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              {/* Cadre pour le saisie de la description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 dark:bg-gray-700 dark:text-white text-black p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              {/* Cadre pour la saisie de la catégorie */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Catégorie</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="mt-1 dark:bg-gray-700 dark:text-white text-black p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categoryList.map((category) => (
                    <option key={category._id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
  <label className="block text-sm font-medium text-gray-700 dark:text-white">Attributs</label>

  <div className="flex flex-row justify-between mt-1">
    <div className="flex flex-col gap-1">
      <input type="text" placeholder="ID" className="dark:bg-gray-700 px-2 py-1 rounded" />
      <select className="dark:bg-gray-700 px-2 py-1 rounded">
        <option value="GAUGE">GAUGE</option>
        <option value="SLIDER">SLIDER</option>
        <option value="BUTTON">BUTTON</option>
      </select>
    </div>
    <button className="dark:bg-gray-700 px-3 py-1 rounded self-end">+</button>
  </div>

  <div className="h-[128px] bg-gray-400 mt-2 overflow-y-auto p-2 rounded space-y-2">
    {/* Example of GAUGE or SLIDER */}
    <div className="bg-white dark:bg-gray-800 rounded p-2 shadow">
      <div className="font-semibold text-sm">temperatureCible</div>
      <div className="flex flex-col gap-2 mt-2">
        <input type="text" placeholder="Label" className="dark:bg-gray-700 px-2 py-1 rounded" />
        <div className="flex items-center gap-2">
          <span>Min:</span>
          <input type="number" className="w-20 dark:bg-gray-700 px-2 py-1 rounded" />
          <span>Max:</span>
          <input type="number" className="w-20 dark:bg-gray-700 px-2 py-1 rounded" />
        </div>
      </div>
    </div>

    {/* Example of BUTTON */}
    <div className="bg-white dark:bg-gray-800 rounded p-2 shadow">
      <div className="font-semibold text-sm">startButton</div>
      <div className="flex flex-col gap-2 mt-2">
        <input type="text" placeholder="Label" className="dark:bg-gray-700 px-2 py-1 rounded" />
        {/* No min/max for button */}
      </div>
    </div>
  </div>
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