import React from "react";

import type { FetchResult } from "../types";

interface UseFetchRequestConfig extends Omit<RequestInit, 'body'> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
}

const DEFAULT_CONFIG: UseFetchRequestConfig = { method: "GET" };

const useFetch = <T = unknown>(
  url: string,
  requestParams: UseFetchRequestConfig = DEFAULT_CONFIG
): FetchResult<T> => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  // Deconstruct for stable dependency tracking
  const { method = "GET", headers, body } = requestParams;
  const headersStr = JSON.stringify(headers);
  const bodyStr = JSON.stringify(body);

  React.useEffect(() => {
    const sendRequest = async (): Promise<void> => {
      setLoading(true);
      try {
        // Convert requestParams to proper RequestInit
        const fetchConfig: RequestInit = {
          method,
          headers,
          body: body !== undefined ? JSON.stringify(body) : undefined,
        };

        const response = await fetch(url, fetchConfig);
        
        if (!response.ok) {
          throw new Error(`HTTP error: Status => ${String(response.status)}`);
        }

        const responseData = (await response.json()) as T;

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

    void sendRequest();
  }, [url, method, headersStr, bodyStr]);

  return { data, loading, error };
};

export default useFetch;
