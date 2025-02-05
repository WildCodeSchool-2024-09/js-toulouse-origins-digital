import { createContext, useContext, useEffect, useState } from "react";

type SpreadProfileImageContextProps = {
  spreadProfileImage: string | null;
  setSpreadProfileImage: (image: string | null) => void;
};

const SpreadProfileImageContext = createContext<
  SpreadProfileImageContextProps | undefined
>(undefined);

export const SpreadProfileImageProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [spreadProfileImage, setSpreadProfileImage] = useState<string | null>(
    localStorage.getItem("profileImage") || null,
  );

  useEffect(() => {
    if (spreadProfileImage) {
      localStorage.setItem("profileImage", spreadProfileImage);
    } else {
      localStorage.removeItem("profileImage");
    }
  }, [spreadProfileImage]);

  return (
    <SpreadProfileImageContext.Provider
      value={{ spreadProfileImage, setSpreadProfileImage }}
    >
      {children}
    </SpreadProfileImageContext.Provider>
  );
};

export const useSpreadProfileImage = () => {
  const context = useContext(SpreadProfileImageContext);
  if (!context) {
    throw new Error("error ProfileImageProvider");
  }
  return context;
};
