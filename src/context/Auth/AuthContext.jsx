import { createContext, useContext, useEffect, useState } from "react";
import { analytics, auth } from "../../clientFirebase";
import { useDispatch } from "react-redux";
import { userFound } from "../../features/users";
import { setUserId, setUserProperties } from "firebase/analytics";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  function logOut() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(analytics, user.uid);
        setUserProperties(analytics, { ...user });
        if (window.clarity) {
          window.clarity("set", { user: user.uid });
          window.clarity("set", { userData: user });
        }
      }
      dispatch(userFound(user));
      setCurrentUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = { user: currentUser, logOut };
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
