import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import usePost from "../custom/usePost";
import { Modal, Button } from "react-bootstrap";
function Input({ setIsClicked, isClicked }) {
  const [tasks, setTasks] = useState({
    title: "",
    description: "",
  });
  const [isError, setIsError] = useState(false);
  const [isReponse, setIsResponse] = useState(false);

  const { isPending, error, response, handlePost } = usePost(
    "http://localhost:3002/todo/add"
  );

  function handleAdd() {
    setIsClicked(true);
  }

  useEffect(() => {
    handlePost(tasks);
  }, [isClicked]);

  useEffect(() => {
    if (error) {
      setIsError(true);
    } else if (response) {
      setIsResponse(true);
    }
  }, [error, response]);

  function handleClose() {
    if (error) {
      setIsError(false);
    } else {
      setIsResponse(false);
    }
  }

  return (
    <div className="d-flex flex-column gap-2 text-light">
      <h2>Todo App</h2>
      <div className="d-flex gap-3">
        <input
          type="text"
          onChange={(e) => setTasks({ ...tasks, title: e.target.value })}
          placeholder="Title"
          className="form-control"
        />
        <input
          type="text"
          onChange={(e) => setTasks({ ...tasks, description: e.target.value })}
          placeholder="Description"
          className="form-control"
        />
        <button className="btn btn-success" onClick={handleAdd}>
          {isPending ? "Adding..." : "Add"}
        </button>
        {error ? (
          <Modal show={isError} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>{error}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        ) : (
          <Modal show={isReponse} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>{response}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Input;
