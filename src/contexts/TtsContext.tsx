import React, { createContext, useContext, useState } from 'react';

interface TtsCtx { speed: number; setSpeed: (s: number) => void; }
const TtsContext = createContext<TtsCtx>({ speed: 1.0, setSpeed: () => {} });

export const TtsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [speed, setSpeed] = useState(1.0);
  return <TtsContext.Provider value={{ speed, setSpeed }}>{children}</TtsContext.Provider>;
};
export const useTts = () => useContext(TtsContext);
