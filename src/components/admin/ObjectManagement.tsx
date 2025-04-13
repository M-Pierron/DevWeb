import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { objects, categories } from '../../api';
import DeviceAttributeManager from './DeviceAttributeManager';


const ObjectManagement = () => {
  const [objectList, setObjects] = useState([]);
  const [categoryList, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingObject, setEditingObject] = useState(null);
  const [deviceAttributes, setDeviceAttributes] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    categoryId: ''
  });

  useEffect(() => {
    Promise.all([fetchObjects(), fetchCategories()])
      .finally(() => setIsLoading(false));
  }, []);

  const handleIdChange = (e) => {
    const sanitizedValue = e.target.value.replace(/[^a-zA-Z_]/g, '');
    setFormData(prev => ({ ...prev, id: sanitizedValue }));
  };

  const fetchObjects = async () => {
    try {
      const response = await objects.getAll();
      setObjects(response.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch objects. Please try again.');
      console.error('Error fetching objects:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categories.getAll();
      setCategories(response.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch categories. Please try again.');
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
    setDeviceAttributes({});
    setShowModal(true);
    setError('');
  };

  const handleEditObject = (object) => {
    setEditingObject(object);
    setFormData({
      id: object.id,
      name: object.name,
      description: object.description,
      categoryId: object.categoryId
    });
    setDeviceAttributes(object.attributes || {});
    setShowModal(true);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const objectData = {
        ...formData,
        attributes: deviceAttributes
      };

      if (editingObject) {
        await objects.edit(objectData);
      } else {
        await objects.create(objectData);
      }
      
      await fetchObjects();
      setShowModal(false);
      setError('');
    } catch (error) {
      setError('Failed to save object. Please try again.');
      console.error('Error saving object:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteObject = async (objectId) => {
    if (window.confirm('Are you sure you want to delete this object?')) {
      try {
        await objects.delete(objectId);
        await fetchObjects();
        setError('');
      } catch (error) {
        setError('Failed to delete object. Please try again.');
        console.error('Error deleting object:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Appareils</h1>
        <button
          onClick={handleAddObject}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter Appareil
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-700 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            <div>ID</div>
            <div>Nom</div>
            <div>Description</div>
            <div>Catégorie</div>
            <div className="text-right">Actions</div>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {objectList.map((object) => (
              <div key={object._id} className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="truncate">{object.id}</div>
                <div className="truncate">{object.name}</div>
                <div className="truncate">{object.description}</div>
                <div className="truncate">
                  {categoryList.find(c => c.id === object.categoryId)?.name}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEditObject(object)}
                    className="p-1 text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteObject(object._id)}
                    className="p-1 text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            
            {objectList.length === 0 && (
              <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                Pas d'appareils trouvée, cliquer sur "Ajouter Appareil" pour en ajouter un
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6">
              {editingObject ? 'Modifier Appareil' : 'Ajouter Appareil'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">ID</label>
                  <input
                    type="text"
                    value={formData.id}
                    onChange={handleIdChange}
                    className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                  required
                >
                  <option value="">Select a category</option>
                  {categoryList.map((category) => (
                    <option key={category._id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <DeviceAttributeManager
                object={editingObject}
                isOpen={showModal}
                deviceAttributes={deviceAttributes}
                setDeviceAttributes={setDeviceAttributes}
              />

              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                  disabled={isSaving}
                >
                  {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {isSaving ? 'Saving...' : (editingObject ? 'Update' : 'Add')}
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