import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Trash2, AlertCircle } from 'lucide-react';
import AccordionItem from '../Accordion/accordionItem';

export type AttributeType = 'GAUGE' | 'SLIDER' | 'BUTTON';

const defaultFieldsByType = {
  GAUGE: { min: 0, max: 100, unit: '' },
  SLIDER: { min: 0, max: 100, unit: '' },
  BUTTON: {}
};

const DeviceAttributeManager = ({
  object,
  isOpen,
  setDeviceAttributes
}) => {
  const [attributes, setAttributes] = useState([]);
  const [newId, setNewId] = useState('');
  const [newType, setNewType] = useState('GAUGE');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && object?.attributes) {
      const sortedAttributes = Object.entries(object.attributes)
        .map(([id, data]) => ({
          id,
          ...data,
          position: data.position ?? 0
        }))
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
      setAttributes(sortedAttributes);
    }
  }, [isOpen, object]);

  useEffect(() => {
    const attributesMap = attributes.reduce((acc, { id, ...rest }) => {
      acc[id] = rest;
      return acc;
    }, {});
    console.log(attributesMap);
    setDeviceAttributes(attributesMap);
  }, [attributes, setDeviceAttributes]);

  const handleIdChange = (e) => {
    const sanitizedValue = e.target.value.replace(/[^a-zA-Z_]/g, '');
    setNewId(sanitizedValue);
    setError('');
  };

  const handleAddAttribute = () => {
    const trimmedId = newId.trim();

    if (!trimmedId) {
      setError('ID is required');
      return;
    }

    if (attributes.some(attr => attr.id === trimmedId)) {
      setError('Attribute ID must be unique');
      return;
    }

    const baseAttr = {
      id: trimmedId,
      type: newType,
      position: attributes.length,
      label: ''
    };
  
    const newAttr = {
      ...baseAttr,
      ...(defaultFieldsByType[newType] || {})
    };

    setAttributes(prev => [...prev, newAttr]);
    setNewId('');
    setNewType('GAUGE');
    setError('');
  };

  const moveAttribute = (index, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= attributes.length) return;

    const updated = [...attributes];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    
    // Update positions
    updated.forEach((attr, i) => {
      attr.position = i;
    });
    
    setAttributes(updated);
  };

  const handleDeleteAttribute = (index) => {
    const updated = attributes.filter((_, i) => i !== index);
    // Update positions after deletion
    updated.forEach((attr, i) => {
      attr.position = i;
    });
    setAttributes(updated);
  };

  const handleAttributeChange = (id, changes) => {
    setAttributes(prev =>
      prev.map(attr =>
        attr.id === id ? { ...attr, ...changes } : attr
      )
    );
  };

  const renderAttributeContent = (attr, index) => {
    return (
      <div className="flex flex-col bg-white dark:bg-gray-800 shadow p-4 rounded-lg space-y-3">
        {/* Cadre qui contient le type et les buttons */}
        <div className="flex items-center justify-between">
          <span className="font-medium">Type: {attr.type}</span>
          {/* Cadre pour les buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => moveAttribute(index, 'up')}
              disabled={index === 0}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
              type="button"
            >
              <ArrowUp size={16} />
            </button>
            <button
              onClick={() => moveAttribute(index, 'down')}
              disabled={index === attributes.length - 1}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
              type="button"
            >
              <ArrowDown size={16} />
            </button>
            <button
              onClick={() => handleDeleteAttribute(index)}
              className="p-1 rounded text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
              type="button"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Saisir pour l'ID de l'appareil */}
        <input
          type="text"
          value={attr.label || ''}
          onChange={(e) => handleAttributeChange(attr.id, { label: e.target.value })}
          placeholder="Label"
          className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
        />

        {/*  */}
        {['GAUGE', 'SLIDER'].includes(attr.type) && (
          <div className=''>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm mb-1">Min</label>
                <input
                  type="number"
                  value={attr.min ?? 0}
                  onChange={(e) => handleAttributeChange(attr.id, { min: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-1">Max</label>
                <input
                  type="number"
                  value={attr.max ?? 100}
                  onChange={(e) => handleAttributeChange(attr.id, { max: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
            <div className='mt-4'>
              <label className="block text-sm mb-1">Unité</label>
              <input
                  type="text"
                  onChange={(e) => handleAttributeChange(attr.id, { unit: e.target.value })}
                  className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                />
            </div>
            
          </div>

        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Attributes</h3>
        {error && (
          <div className="flex items-center text-red-500 text-sm">
            <AlertCircle size={16} className="mr-1" />
            {error}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <input
            type="text"
            placeholder="ID de l'attribut"
            value={newId}
            onChange={handleIdChange}
            className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
          />
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as AttributeType)}
            className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="GAUGE">Gauge</option>
            <option value="SLIDER">Slider</option>
            <option value="BUTTON">Button</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleAddAttribute}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors self-end"
        >
          Add
        </button>
      </div>

      <div className="h-[400px] overflow-y-auto rounded-lg border dark:border-gray-700 p-4 space-y-3">
        {attributes.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No attributes added yet. Add your first attribute above.
          </p>
        ) : (
          attributes.map((attr, index) => (
            <AccordionItem
              key={attr.id}
              category={attr.id}
              items={renderAttributeContent(attr, index)}
              headerStyle="font-medium text-sm bg-white dark:bg-gray-800 w-full p-3 rounded-lg shadow"
              blockStyle="mt-2"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DeviceAttributeManager;