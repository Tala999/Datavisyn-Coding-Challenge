import React, { createContext, useContext, useState, useEffect } from 'react';
import Papa from 'papaparse';

interface GeneContextType {
  data: Array<Record<string, string>>;
  loading: boolean;
  error: string | null;
}

// Create context with the data, loading, and error state
const GeneContext = createContext<GeneContextType | undefined>(undefined);

// Custom hook to use the GeneContext
export const useGeneContext = () => {
  const context = useContext(GeneContext);
  if (!context) {
    throw new Error('useGeneContext must be used within a GeneDataProvider');
  }
  return context;
};

// Define the props for the provider, including children as a required prop
interface GeneDataProviderProps {
  children: React.ReactNode;
}

// The actual GeneDataProvider component that provides context to its children
export const GeneDataProvider: React.FC<GeneDataProviderProps> = ({ children }) => {
  const [data, setData] = useState<Array<Record<string, string>>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Papa.parse('/genes_human.csv', {
      download: true,
      header: true,
      delimiter: ';',
      complete: (result) => {
        const parsedData = result.data as Array<Record<string, string>>;
        setData(parsedData);
        setLoading(false);
      },
      error: (err) => {
        setError(err.message);
        setLoading(false);
      },
    });
  }, []);

  return (
    <GeneContext.Provider value={{ data, loading, error }}>
      {children}
    </GeneContext.Provider>
  );
};
