import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Field({ isPending, data, error, handleFetch }) {
  return isPending ? (
    <div className="text-white">Fetching...</div>
  ) : data ? (
    <div
      style={{ maxHeight: "400px", overflowY: "auto" }}
      className="table-responsive"
    >
      <table className="table text-white overflow-scroll border-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="overflow-scroll">
          {data.map((task, index) => (
            <tr key={index}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleEdit(task._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="text-danger">{error}</div>
  );
}

export default Field;
