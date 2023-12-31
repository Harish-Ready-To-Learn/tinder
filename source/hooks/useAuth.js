import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("USE AUTH");
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("USE AUTH", user);
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadingInitial(false);
      setLoading(false);
    });
    return unSubscribe;
  }, []);

  const logOut = () => {
    console.log("SIGN OUT");
    signOut(auth).then(() => {
      setUser(null);
    });
  };

  const memoizedValue = useMemo(() => {
    return { user, setUser, loading, setLoading, logOut };
  }, [user, loading]);
  return (
    <AuthContext.Provider value={memoizedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
