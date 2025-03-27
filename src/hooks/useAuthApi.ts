import { useApi } from "./useApi";

export const useAuthApi = () => {
    const { post } = useApi();
  
    const logout = async () => {
      const { data, error } = await post<{ message: string }>("/authentication/logout");
      if (error) throw new Error(error.message);
      return data;
    };
  
    return { logout };
  };