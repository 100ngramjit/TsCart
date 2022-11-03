import { useState, createContext } from "react";

interface IAuthContext {
  profile: UserType;
  setProfile?: React.Dispatch<React.SetStateAction<UserType>>;
}

type UserType = {
  givenName: string;
  imageUrl: string;
};

const defaultState = {
  profile: {
    givenName: "",
    imageUrl: "",
  },
};

const AuthContext = createContext<IAuthContext>(defaultState);
const AuthProvider = ({ children }: any) => {
  const [profile, setProfile] = useState<UserType>({
    givenName: "",
    imageUrl: "",
  });

  return (
    <AuthContext.Provider
      value={{
        profile,
        setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
