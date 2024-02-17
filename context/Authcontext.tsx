import * as secureStore from "expo-secure-store"
import { useContext, useState, useEffect, createContext } from "react"

interface AuthProps {
    authState: {token: string | null; authenticated: boolean | null; user_id: string | null};
    onRegister: (email: string, password: string) => Promise<any>;
    onLogin: (email: string, password: string) => Promise<any>;
    onLogout: () => Promise<any>;
    initialized: boolean
}

const TOKEN_KEY = 'my-stream-token';
export const API_URL = process.env.EXPO_PUBLIC_SERVER_URI;
const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
    return useContext(AuthContext)
}


export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    user_id: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    user_id: null,
    authenticated: null,
  });

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      //load token on start
      const result = await secureStore.getItemAsync(TOKEN_KEY);
      if (result) {
        const OBJ = JSON.parse(result);
        setAuthState({
          token: OBJ.token,
          user_id: OBJ.user.id,
          authenticated: true,
        });
      }
      setInitialized(true);
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // sending a post request
      const result = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await result.json();
      setAuthState({
        token: json.token,
        authenticated: true,
        user_id: json.user.id,
      });

      await secureStore.setItemAsync(TOKEN_KEY, JSON.stringify(json));
      return json;
    } catch (error) {
      return {
        err: true,
        message: (error as any).response?.data.message,
      };
    }
  };


  const register = async (email: string, password: string) => {
    try{
      const result = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
      })
      const response = await result.json();
      setAuthState({
        token: response.token,
        authenticated: true,
        user_id: response.user.id,
      })
      await secureStore.setItemAsync(TOKEN_KEY, JSON.stringify(response))
      return response;

    }catch(err){
      return {
        err: true
      }
    }
  };

  const logout = async () => {
    await secureStore.deleteItemAsync(TOKEN_KEY);
    setAuthState({
      token: null,
      user_id: null,
      authenticated: null,
    })
  }

  const Pvalue = {
    onRegister: register,
    onLogin: login,
    authState,
    onLogout: logout,
    initialized

  };

  return <AuthContext.Provider value={Pvalue}>{children}</AuthContext.Provider>

  
};


