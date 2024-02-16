'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction
} from 'react';

type AppContextType = {
  searchParam: string;
  setSearchParam: Dispatch<SetStateAction<string>>;
  pageParam: string;
  setPageParam: Dispatch<SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
  const [searchParam, setSearchParam] = useState<string>('');
  const [pageParam, setPageParam] = useState<string>('top_rated');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const contextValue: AppContextType = {
    searchParam,
    setSearchParam,
    pageParam,
    setPageParam,
    currentPage,
    setCurrentPage
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppWrapper');
  }
  return context;
}
