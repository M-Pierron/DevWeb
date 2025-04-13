import React, { useEffect, useState } from 'react';
import AccordionItem from '../Accordion/accordionItem';
import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react';

const DeviceAttributeManager = ({object = {}, isOpen}) => {
  const [attributes, setAttributes] = useState([]);
  const [newId, setNewId] = useState('');
  const [newType, setNewType] = useState('GAUGE');

  useEffect(() => {
    if (isOpen) {
        const sortedAttributes = Object.entries(object.attributes)
        .map(([id, data]) => ({
          id,
          ...data,
        }))
        .sort((a, b) => a.position - b.position); // Sort by position
        setAttributes(sortedAttributes);
    }
  }, [isOpen]);

  const handleAddAttribute = (e) => {
    e.preventDefault();
    if (!newId.trim()) return;
  
    const idExists = attributes.some(attr => attr.id === newId.trim());
    if (idExists) {
      alert('Attribute ID must be unique.');
      return;
    }
  
    const newAttr = {
      id: newId.trim(),
      type: newType,
    };
  
    setAttributes([...attributes, newAttr]);
    setNewId('');
    setNewType('GAUGE');
  };

  const moveAttributeUp = (index) => {
    if (index === 0) return;
    const updated = [...attributes];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setAttributes(updated);
  };

  const moveAttributeDown = (index) => {
    if (index === attributes.length - 1) return;
    const updated = [...attributes];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setAttributes(updated);
  };

  const handleDeleteAttribute = (index) => {
    const updated = [...attributes];
    updated.splice(index, 1);
    setAttributes(updated);
  };

  const renderAttributeContent = (attr, index) => {
    return (
      <div className="bg-white dark:bg-gray-800 shadow p-2 flex flex-col gap-2">
        <span>Type: {attr.type}</span>

        {['GAUGE', 'SLIDER'].includes(attr.type) && (
          <>
            <input type="text" placeholder="Label" className="dark:bg-gray-700 px-2 py-1 rounded" />
            <div className="flex items-center gap-2">
              <span>Min:</span>
              <input type="number" className="w-20 dark:bg-gray-700 px-2 py-1 rounded" />
              <span>Max:</span>
              <input type="number" className="w-20 dark:bg-gray-700 px-2 py-1 rounded" />
            </div>
          </>
        )}

        {attr.type === 'BUTTON' && (
          <input type="text" placeholder="Label" className="dark:bg-gray-700 px-2 py-1 rounded" />
        )}

        {/* Move buttons at the bottom of the body */}
        <div className="flex flex-row justify-between mt-2">
            <Trash2
                className="text-red-500 cursor-pointer hover:text-red-600"
                onClick={() => handleDeleteAttribute(index)}
            />
            <div className='flex flex-row gap-2'>
                <ArrowUp
                onClick={() => moveAttributeUp(index)}
                className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                />
            <ArrowDown
                onClick={() => moveAttributeDown(index)}
                className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-300"
            />
            </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-white">Attributs</label>

      <div className="flex flex-row justify-between mt-1">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="ID"
            value={newId}
            onChange={(e) => setNewId(e.target.value)}
            className="dark:bg-gray-700 px-2 py-1 rounded"
          />
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            className="dark:bg-gray-700 px-2 py-1 rounded"
          >
            <option value="GAUGE">GAUGE</option>
            <option value="SLIDER">SLIDER</option>
            <option value="BUTTON">BUTTON</option>
          </select>
        </div>
        <button onClick={handleAddAttribute} className="dark:bg-gray-700 px-3 py-1 rounded self-end cursor-pointer">
          +
        </button>
      </div>

      <div className="h-[128px] bg-gray-400 mt-2 overflow-y-auto p-2 rounded space-y-2">
        {attributes.map((attr, index) => (
          <AccordionItem
            key={index}
            category={attr.id}
            items={renderAttributeContent(attr, index)}
            headerStyle="font-semibold text-sm bg-white dark:bg-gray-800 w-full p-2"
            blockStyle=""
          />
        ))}
      </div>
    </div>
  );
};

export default DeviceAttributeManager;
