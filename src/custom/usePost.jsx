import { useState } from "react";
import axios from "axios";

function usePost(url) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  async function handlePost(object) {
    setError(null);
    setIsPending(true);
    try {
      const response = await axios.post(url, object);

      // Assuming a successful request
      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        setResponseData(response.data.message || response.data); // Use message if available
      } else {
        setError("Failed request");
      }
    } catch (error) {
      console.log(error?.response?.data?.message || "An error occurred");
      setError(error?.response?.data?.message || "An error occurred");
    } finally {
      setIsPending(false);
    }
  }

  return { isPending, error, response: responseData, handlePost };
}

export default usePost;
