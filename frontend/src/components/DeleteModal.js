import axios from "axios";
import { toast } from "react-toastify";

import styles from "./DeleteModal.module.scss";

const DeleteModal = ({ taskId, onClose, fetchTasks }) => {
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Task deleted successfully.");
      fetchTasks();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete task."
      );
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Delete Task</h3>
        <p>Are you sure you want to delete this task?</p>
        <div className={styles.actions}>
          <button onClick={onClose}>Cancel</button>
          <button
            className={styles.deleteBtn}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;