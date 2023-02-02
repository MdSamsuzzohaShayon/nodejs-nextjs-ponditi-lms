import React, { useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { BACKEND_URL } from '../config/keys';
import { ThemeProviderProps } from '../types/context/contextInterface';

export const ThemeContext = React.createContext(null);

export function useSocket() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [socket, setSocket] = React.useState<any | null>(null);

  React.useEffect(() => {
    setSocket(io(BACKEND_URL));
  }, []);

  return <ThemeContext.Provider value={socket}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
