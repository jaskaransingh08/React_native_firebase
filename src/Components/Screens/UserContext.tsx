import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/Firebase';

interface MyContextType {
  user: string | undefined;
}

type ThemeProviderProps = {
  children: ReactNode;
};

export const MyContext = createContext<MyContextType | undefined>(undefined);

export default function UserContext({ children }: ThemeProviderProps) {
  const [user, setUser] = useState<string | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser:any) => {
      if (authUser) {
        setUser(authUser.email); 
      } else {
        setUser(undefined);
      }
    });

    return unsubscribe;
  }, []);

  
  return (
    <MyContext.Provider value={{ user }}>
      {children}
    </MyContext.Provider>
  );
}
