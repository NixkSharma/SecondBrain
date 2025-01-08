import { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../constants/constants";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${serverUrl}/user/checkAuth`, 
          {
            headers : {
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated };
};
