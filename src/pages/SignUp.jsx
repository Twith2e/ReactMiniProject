import { useState, useEffect } from "react";
import usePost from "../custom/usePost";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  const navigate = useNavigate();
  const { isPending, error, response, handlePost } = usePost(
    "http://localhost:5000/user/signup"
  );
  const [formDetail, setFormDetail] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePost(formDetail);
  };

  useEffect(() => {
    if (response) {
      navigate("/login");
    }
  }, [response, navigate]);

  return (
    <div className="border-secondary container d-flex align-items-center flex-column justify-content-center gap-3 col-6 vh-100">
      <form onSubmit={handleSubmit} className="w-100">
        <input
          className="form-control my-2"
          onChange={(e) =>
            setFormDetail({ ...formDetail, firstname: e.target.value })
          }
          placeholder="Firstname"
          type="text"
          value={formDetail.firstname}
        />
        <input
          className="form-control my-2"
          onChange={(e) =>
            setFormDetail({ ...formDetail, lastname: e.target.value })
          }
          placeholder="Lastname"
          type="text"
          value={formDetail.lastname}
        />
        <input
          className="form-control my-2"
          onChange={(e) =>
            setFormDetail({ ...formDetail, email: e.target.value })
          }
          placeholder="Email"
          type="email"
          value={formDetail.email}
        />
        <input
          className="form-control my-2"
          onChange={(e) =>
            setFormDetail({ ...formDetail, password: e.target.value })
          }
          placeholder="Password"
          type="password"
          value={formDetail.password}
        />
        <button
          className="btn btn-primary w-100 mt-3"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Sign up"}
        </button>
      </form>
      {error && <div className="text-danger mt-2">{error}</div>}
      {response && <div className="text-success mt-2">{response}</div>}
      <div>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
