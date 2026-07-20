import { useNavigate } from "react-router-dom";

import styles from "./DeleteModal.module.scss";

const LogoutModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Logout</h3>

        <p>Are you sure you want to logout?</p>

        <div className={styles.actions}>
          <button onClick={onClose}>Cancel</button>

          <button
            className={styles.logoutBtn}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;