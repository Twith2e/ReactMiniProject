import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Todo from "./pages/Todo";
import Formik from "./Formik";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="*" element={<h1>404</h1>} />
      <Route path="/formik" element={<Formik />} />
    </Routes>
  );
}

export default App;
