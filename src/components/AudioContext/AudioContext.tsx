'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AudioContextProps {
  audio: HTMLAudioElement | null;
  setAudio: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
}

const AudioContext = createContext<AudioContextProps | null>(null);

export const useAudio = (): AudioContextProps => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider: React.FC<{
  children: ReactNode;
  value?: AudioContextProps;
}> = ({ children, value }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const contextValue = value || { audio, setAudio };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};
