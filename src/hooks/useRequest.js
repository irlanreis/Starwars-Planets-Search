import { useCallback, useState } from 'react';

function useRequest() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchDataWithLoading = useCallback(async (url) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetchDataWithLoading };
}

export default useRequest;
