import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.scss";
import TaskModal from "../../components/TaskModal";
import DeleteModal from "../../components/DeleteModal";
import LogoutModal from "../../components/LogoutModal";

const Dashboard = () => {
    const token = localStorage.getItem("token");
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/tasks`,
                {
                    params: {
                        page,
                        search,
                        status
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setTasks(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [page, search, status]);


    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h2>Task Manager</h2>
                <button onClick={() => setShowLogoutModal(true)}>
                    Logout
                </button>
            </div>
            <div className={styles.filters}>
                <input
                    placeholder="Search by title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <button
                    onClick={() => {
                        setSelectedTask(null);
                        setShowModal(true);
                    }}
                >
                    Add Task
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.status}</td>
                                <td>{task.created_at}</td>
                                <td>
                                    <button
                                        className={styles.editBtn}
                                        onClick={() => {
                                            setSelectedTask(task);
                                            setShowModal(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => {
                                            setSelectedTaskId(task.id);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className={styles.pagination}>
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>
                <span>
                    {page} / {pagination.totalPages || 1}
                </span>
                <button
                    disabled={page === pagination.totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
            {
                showModal && (
                    <TaskModal
                        task={selectedTask}
                        onClose={() => setShowModal(false)}
                        fetchTasks={fetchTasks}
                    />
                )
            }
            {
                showDeleteModal && (
                    <DeleteModal
                        taskId={selectedTaskId}
                        onClose={() => setShowDeleteModal(false)}
                        fetchTasks={fetchTasks}
                    />
                )
            }
            {
                showLogoutModal && (
                    <LogoutModal
                        onClose={() => setShowLogoutModal(false)}
                    />
                )
            }
        </div>
    )
}

export default Dashboard;