import type React from "react";
import { createContext, useContext, useState } from "react";

interface NavContextProps {
  isOpenLogin: boolean;
  setIsOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenCardVideo: boolean;
  setIsOpenCardVideo: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoCardContext = createContext<NavContextProps | null>(null);

const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenCardVideo, setIsOpenCardVideo] = useState(false);

  return (
    <VideoCardContext.Provider
      value={{
        isOpenCardVideo,
        setIsOpenCardVideo,
        isOpenLogin: false,
        setIsOpenLogin: () => {},
      }}
    >
      {children}
    </VideoCardContext.Provider>
  );
};

export default NavProvider;

export const useCardVideo = () => {
  const context = useContext(VideoCardContext);
  if (!context) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
};
