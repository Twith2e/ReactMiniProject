import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
function Formik() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .trim()
        .min(4, "username length cannot be less than 4")
        .required("username is required"),
      email: yup
        .string()
        .email("Must be a valid email address")
        .trim()
        .required("Email is required"),
      password: yup.string().required(),
    }),
    onSubmit: async (values) => {
      try {
        const data = await axios.post("http://localhost:8000/users", values);
        if (data) {
          toast.success(data.data.message);
        } else {
          throw new Error("not a success");
        }
      } catch (error) {
        toast.error(error.message);
      }
      formik.resetForm();
    },
  });

  console.log(formik.errors);

  return (
    <>
      <form
        className="p-4 border rounded shadow-sm"
        action=""
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-3">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            className="form-control"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="username"
            placeholder="username"
            value={formik.values.username}
            type="text"
          />
          <span className="text-danger">
            {formik.touched.username ? formik.errors.username : ""}
          </span>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="email"
            placeholder="email"
            value={formik.values.email}
            type="email"
          />
          <span className="text-danger">
            {formik.touched.email ? formik.errors.email : ""}
          </span>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="password"
            placeholder="password"
            value={formik.values.password}
            type="text"
          />
          <span className="text-danger">
            {formik.touched.password ? formik.errors.password : ""}
          </span>
        </div>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
        <ToastContainer />
      </form>
    </>
  );
}

export default Formik;
