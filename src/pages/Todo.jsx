import Input from "../components/TodoInput";
import Field from "../components/TodoField";
import useFetch from "../custom/useFetch";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Todo() {
  const [isClicked, setIsClicked] = useState(false);
  const { isPending, error, data, response, handleFetch } = useFetch(
    "http://localhost:3002/todo/get"
  );

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
