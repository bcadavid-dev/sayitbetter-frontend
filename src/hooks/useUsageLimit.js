import { useState, useEffect } from 'react';

const STORAGE_KEY = 'saybest_usage';
const MAX_DAILY_USES = 10;

export default function useUsageLimit() {
  const [usageData, setUsageData] = useState({
    count: 0,
    date: null
  });

  useEffect(() => {
    // Cargar datos del localStorage al montar
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        const today = new Date().toDateString();

        // Si es un nuevo día, resetear contador
        if (data.date !== today) {
          const newData = { count: 0, date: today };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
          setUsageData(newData);
        } else {
          setUsageData(data);
        }
      } catch (err) {
        console.error('Error al leer localStorage:', err);
        initializeUsage();
      }
    } else {
      initializeUsage();
    }
  }, []);

  const initializeUsage = () => {
    const newData = {
      count: 0,
      date: new Date().toDateString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    setUsageData(newData);
  };

  const incrementUsage = () => {
    const today = new Date().toDateString();
    const newData = {
      count: usageData.date === today ? usageData.count + 1 : 1,
      date: today
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    setUsageData(newData);
  };

  const canUse = usageData.count < MAX_DAILY_USES;
  const remainingUses = Math.max(0, MAX_DAILY_USES - usageData.count);

  return {
    canUse,
    remainingUses,
    usedCount: usageData.count,
    maxUses: MAX_DAILY_USES,
    incrementUsage
  };
}
