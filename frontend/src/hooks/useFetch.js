import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(apiRoute) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(apiRoute, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const responseData = response.data;
        setData(
          Array.isArray(responseData)
            ? responseData
            : responseData.categories || []
        );
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [apiRoute]);

  return { data, loading, error };
}

export default useFetch;
