import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RouletteOption {
  id: number;
  value: string;
}

interface RouletteContextType {
  options: RouletteOption[];
  setOptions: React.Dispatch<React.SetStateAction<RouletteOption[]>>;
}

const RouletteContext = createContext<RouletteContextType | undefined>(undefined);

export const useRoulette = () => {
  const context = useContext(RouletteContext);
  if (!context) {
    throw new Error('useRoulette must be used within a RouletteProvider');
  }
  return context;
};

export const RouletteProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<RouletteOption[]>([
    { id: 1, value: '' },
    { id: 2, value: '' },
  ]);

  return (
    <RouletteContext.Provider value={{ options, setOptions }}>{children}</RouletteContext.Provider>
  );
};
