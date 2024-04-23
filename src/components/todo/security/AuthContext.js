import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService } from "../api/AuthentiacationApiService";
import { apiClient } from "../api/ApiClient";

// Create a Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Put some state in the context
// Share the created context with other components

// 다른 컴포넌트로 context 제공
export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);

    // function login(username, password) {
    //     if (username === "in28minutes" && password === "1234") {
    //         setIsAuthenticated(true);
    //         setUsername(username);
    //         return true;
    //     } else {
    //         setIsAuthenticated(false);

    //         return false;
    //     }
    // }

    // async function login(username, password) {
    //     const basicAuthToken =
    //         "Basic " + window.btoa(username + ":" + password);

    //     try {
    //         const response = await executeBasicAuthenticationService(
    //             basicAuthToken
    //         );

    //         if (response.status === 200) {
    //             setIsAuthenticated(true);
    //             setUsername(username);
    //             setToken(basicAuthToken);
    //             apiClient.interceptors.request.use((config) => {
    //                 console.log("intercepting and adding a token");
    //                 config.headers.Authorization = basicAuthToken;
    //                 return config;
    //             });

    //             return true;
    //         } else {
    //             logout();
    //             return false;
    //         }
    //     } catch (error) {
    //         logout();
    //         return false;
    //     }
    // }

    async function login(username, password) {
        try {
            const response = await executeJwtAuthenticationService(
                username,
                password
            );

            if (response.status === 200) {
                const jwtToken = `Bearer ${response.data.token}`;

                setIsAuthenticated(true);
                setUsername(username);
                setToken(jwtToken);
                apiClient.interceptors.request.use((config) => {
                    console.log("intercepting and adding a token");
                    config.headers.Authorization = jwtToken;
                    return config;
                });

                return true;
            } else {
                logout();
                return false;
            }
        } catch (error) {
            logout();
            return false;
        }
    }

    function logout() {
        setIsAuthenticated(false);
        setUsername(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                login,
                logout,
                username,
                token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
