import axios from "axios";
import { useEffect, useState } from "react";

function useFetch(url) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [data, setData] = useState(null);

  async function handleFetch() {
    setIsPending(true);
    try {
      const response = await axios.get(url);
      if (response.status === 200 || response.status === 201) {
        setIsPending(false);
        setResponse(response);
        setData(response.data.data);
      } else {
        setError(response.message);
        setIsPending(false);
      }
    } catch (error) {
      setIsPending(false);
      setError(error.message);
    }
  }

  return { isPending, error, data, response, handleFetch };
}

export default useFetch;
