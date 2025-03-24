//this is a custom hook that wraps all axios HTTP methods (get, post, put, delete)

//this uses axiosInstance to send a POST request to the NestJS backend
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// ensures TypeScript knows what type of response you are getting
interface ApiError {
  message?: string;
  [key: string]: unknown;
}

interface RequestResult<T> {
  data: T | null;
  error: ApiError | null;
  loading: boolean;
}

export function useApi() {
  const request = async <T>(
    method: HttpMethod,
    url: string,
    body?: Record<string, unknown>
  ): Promise<RequestResult<T>> => {
    let loading = true;
    let data: T | null = null;
    let error: ApiError | null = null;

    try {
      const res = await axiosInstance.request<T>({
        method,
        url,
        data: body,
      });

      data = res.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        error = err.response?.data || { message: err.message };
      } else {
        error = { message: (err as Error).message || "Unknown error" };
      }
    } finally {
      loading = false;
    }

    return { data, error, loading };
  };

  return {
    get: <T>(url: string) => request<T>("GET", url),
    post: <T>(url: string, body?: Record<string, unknown>) =>
      request<T>("POST", url, body),
    put: <T>(url: string, body?: Record<string, unknown>) =>
      request<T>("PUT", url, body),
    del: <T>(url: string) => request<T>("DELETE", url),
  };
}
