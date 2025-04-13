import React, { createContext, useContext, useState, useEffect, act } from 'react';

const DeviceContext = createContext(null);

export const useDeviceContext = () => useContext(DeviceContext);

export const DeviceProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [userDevices, setUserDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isUserDevicesLoading, setUserDevicesLoading] = useState(false);
  
  const [deviceCategories, setDeviceCategories] = useState([]);
  const [isToolsFilterLoading, setToolsFilterLoading] = useState(false);
  
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  
  const [isAddNewDeviceVisible, setIsAddNewDeviceVisible] = useState(false);
  const [isAddNewDeviceLoading, setIsAddNewDeviceLoading] = useState(false);

  const filteredDevices = userDevices.filter(userDevice =>
    userDevice && userDevice.name && userDevice.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchUserDevices = async () => {
    setUserDevicesLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/devices/getConnectedUserDevices', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (data) setUserDevices(data);
    } catch (err) {
      console.error("[fetchUserDevices] Erreur:", err);
    } finally {
      setUserDevicesLoading(false);
    }
  };

  const fetchCategories = async () => {
    setToolsFilterLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/devices/deviceCategories', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (data) {
        setDeviceCategories(data);
      } 
    } catch (err) {
      console.error("[fetchCategories] Erreur:", err);
    } finally {
      setToolsFilterLoading(false);
    }
  };

  const deleteSelectedDevice = async () => {
    try {
      setDeleteLoading(true);
      console.log(`[deleteSelectedDevice] Envoi requête vers: http://localhost:5000/api/devices/deleteSelectedDevice`);
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5000/api/devices/deleteSelectedDevice", {
        method: "POST",
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          selectedDevice: selectedDevice, 
        }),
      });

      const data = await response.json();
      console.log("[deleteSelectedDevice] Réponse reçue:", data);

      if (data){
        console.log("[deleteSelectedDevice] Succès côté serveur");
        setUserDevices(data);
        setSelectedDevice(null);
      }

    } catch (error) {
      console.error("[deleteSelectedDevice] Erreur catché:", error);
    } finally {
      setDeleteLoading(false);
    }
  }

  const onAddDeviceSubmit = async (e, newDevice, selectedDeviceType) => {
    e.preventDefault();
    console.log("[onAddDeviceSubmit] Formulaire soumis !");
    setIsAddNewDeviceLoading(true);

    try {
      console.log(`[onAddDeviceSubmit] Envoi requête vers: http://localhost:5000/api/devices/newObject`);
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5000/api/devices/newObject", {
        method: "POST",
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newDevice.name,
          description: newDevice.description,
          mode: newDevice.mode,
          deviceId: selectedDeviceType.id,
          battery: newDevice.battery,
          wifi: newDevice.wifi
        }),
      });

      const data = await response.json();
      console.log("[onAddDeviceSubmit] Réponse reçue:", data);

      if (data){
        setIsAddNewDeviceVisible(false);
        setUserDevices(data)
      }

      

    } catch (error) {
      console.error("[onAddDeviceSubmit] Erreur catché:", error);
    } finally {
      setIsAddNewDeviceLoading(false);
    }
  }

  useEffect(() => {
    fetchUserDevices();
    fetchCategories();
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        userDevices,
        setUserDevices,
        selectedDevice,
        setSelectedDevice,
        isUserDevicesLoading,
        deviceCategories,
        isToolsFilterLoading,
        isDeleteConfirmVisible,
        setIsDeleteConfirmVisible,
        isDeleteLoading,
        isAddNewDeviceVisible,
        setIsAddNewDeviceVisible,
        fetchUserDevices,
        deleteSelectedDevice,
        onAddDeviceSubmit,
        isAddNewDeviceLoading,
        searchTerm,
        setSearchTerm,
        filteredDevices,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
