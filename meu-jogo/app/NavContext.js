import React, { createContext, useState } from 'react';

export const NavContext = createContext();

export function NavProvider({ children }) {
  const [showNav, setShowNav] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  return (
    <NavContext.Provider value={{ showNav, setShowNav, showLogo, setShowLogo }}>
      {children}
    </NavContext.Provider>
  );
}