import React from "react";
import type { FetchResult } from "../types";

interface UseFetchRequestConfig extends Omit<RequestInit, 'body'> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
}

const useFetch = <T = unknown>(
  url: string,
  requestParams: UseFetchRequestConfig = { method: "GET" }
): FetchResult<T> => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const sendRequest = async (): Promise<void> => {
      try {
        // Convert requestParams to proper RequestInit
        const fetchConfig: RequestInit = {
          method: requestParams.method || 'GET',
          headers: requestParams.headers,
          body: requestParams.body ? JSON.stringify(requestParams.body) : undefined,
        };

        const response = await fetch(url, fetchConfig);
        
        if (!response.ok) {
          throw new Error(`HTTP error: Status => ${response.status}`);
        }

        const responseData: T = await response.json();

        setData(responseData);
        setError(null);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    sendRequest();
  }, [url, requestParams]);

  return { data, loading, error };
};

export default useFetch;
