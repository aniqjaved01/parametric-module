import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { ModuleParams, BOM } from '../types';
import { calculateBOM } from '../utils/bomCalculator';

interface ModuleContextType {
  params: ModuleParams;
  bom: BOM;
  updateParams: (newParams: Partial<ModuleParams>) => void;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

const DEFAULT_PARAMS: ModuleParams = {
  width: 500,
  height: 500,
  finish: 'metal',
};

interface ModuleProviderProps {
  children: ReactNode;
}

export function ModuleProvider({ children }: ModuleProviderProps) {
  const [params, setParams] = useState<ModuleParams>(DEFAULT_PARAMS);

  const bom = useMemo(() => calculateBOM(params), [params]);

  const updateParams = (newParams: Partial<ModuleParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  const value = useMemo(
    () => ({
      params,
      bom,
      updateParams,
    }),
    [params, bom]
  );

  return <ModuleContext.Provider value={value}>{children}</ModuleContext.Provider>;
}

export function useModule() {
  const context = useContext(ModuleContext);
  if (context === undefined) {
    throw new Error('useModule must be used within a ModuleProvider');
  }
  return context;
}

