'use client'
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AudioContextProps {
  audio: HTMLAudioElement | null;
  setAudio: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
}

const AudioContext = createContext<AudioContextProps | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  return (
    <AudioContext.Provider value={{ audio, setAudio }}>
      {children}
    </AudioContext.Provider>
  );
};