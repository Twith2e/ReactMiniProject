import { useEffect, useState } from "react";
import usePost from "../custom/usePost";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { isPending, error, response, handlePost } = usePost(
    "http://localhost:5000/user/login"
  );

  const [formDetail, setFormDetail] = useState([
    {
      email: "",
      password: "",
    },
  ]);

  function handleFormSubmit(e) {
    e.preventDefault();
    handlePost(formDetail);
  }

  useEffect(() => {
    if (response) {
      navigate("/todo");
    }
  }, [response, navigate]);

  return (
    <div className="container col-5 d-flex flex-column gap-3 justify-content-center align-items-center vh-100">
      {error && <p className="text-danger">{error}</p>}
      {response && <p className="text-success">{response}</p>}
      <form
        onSubmit={handleFormSubmit}
        className="w-100 d-flex flex-column gap-3 align-items-center"
      >
        <input
          type="email"
          className="form-control"
          onChange={(e) =>
            setFormDetail({ ...formDetail, email: e.target.value })
          }
          placeholder="email"
        />
        <input
          type="password"
          className="form-control"
          onChange={(e) =>
            setFormDetail({ ...formDetail, password: e.target.value })
          }
          placeholder="password"
        />
        <button className="btn btn-primary" disabled={isPending}>
          {isPending ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
