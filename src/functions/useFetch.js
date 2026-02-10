import React from "react";

const useFetch = (url, requestParams = { method: "GET" }) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(url, requestParams);

        if (!response.status) {
          throw new Error(`HTTPS eror: Status => ${response.status}`);
        }

        let responseData = await response.json();

        setData(responseData);
        setError(null);
      } catch (err) {
        setError(err.message);
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
