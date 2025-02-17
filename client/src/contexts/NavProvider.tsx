import type React from "react";
import { createContext, useContext, useState } from "react";

type NavContextProps = {
  isOpenLogin: boolean;
  setIsOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavContext = createContext<NavContextProps | null>(null);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  return (
    <NavContext.Provider value={{ isOpenLogin, setIsOpenLogin }}>
      {children}
    </NavContext.Provider>
  );
}

export default NavProvider;

export function useNav() {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
}
