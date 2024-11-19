import Input from "../components/TodoInput";
import Field from "../components/TodoField";
import useFetch from "../custom/useFetch";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Todo() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isClicked, setIsClicked] = useState(false);
  const { isPending, error, data, response, handleFetch } = useFetch(
    "http://localhost:5000/todo/get"
  );

  async function handleTokenVerification() {
    try {
      const response = await axios.get("http://localhost:5000/user/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response) {
        console.log("nada");
      } else {
        console.log(response);
      }
    } catch (error) {
      if (
        error?.response?.data?.message == "Invalid token. Please login again"
      ) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  }

  useEffect(() => {
    handleTokenVerification();
  }, []);

  useEffect(() => {
    handleFetch();
  }, [isClicked]);

  return (
    <div className="d-flex flex-column col-6 justify-content-center align-items-center w-100 mt-5 gap-2">
      <div className="bg-dark d-flex flex-column gap-3 px-4 py-3 rounded-3">
        <Input setIsClicked={setIsClicked} isClicked={isClicked} />
        <Field error={error} isPending={isPending} data={data} />
      </div>
    </div>
  );
}

export default Todo;
