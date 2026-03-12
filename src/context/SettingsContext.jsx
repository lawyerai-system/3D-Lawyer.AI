import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axios';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/api/settings');
      if (res.data.success) {
        setSettings(res.data.data);
      }
    } catch (err) {
      console.error("Failed to load platform settings", err);
    } finally {
      setLoading(false);
    }
  };

  const isFeatureEnabled = (featureName) => {
    if (!settings) return true; // Default to true while loading
    return settings.features[featureName] !== false;
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, isFeatureEnabled, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
