import type React from "react";
import { createContext, useContext, useState } from "react";

interface NavContextProps {
  isOpenLogin: boolean;
  setIsOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavContext = createContext<NavContextProps | null>(null);

const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  return (
    <NavContext.Provider value={{ isOpenLogin, setIsOpenLogin }}>
      {children}
    </NavContext.Provider>
  );
};

export default NavProvider;

export const useNav = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
};
