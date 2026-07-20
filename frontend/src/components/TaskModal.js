import { useEffect } from "react";
import styles from "./TaskModal.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const TaskModal = ({ task, onClose, fetchTasks }) => {
    const token = localStorage.getItem("token");
    const validationSchema = Yup.object({
        title: Yup.string()
            .required("Title is required"),
        description: Yup.string(),
        status: Yup.string()
            .required("Status is required")
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: "",
            description: "",
            status: "Pending"
        }
    });

    useEffect(() => {
        if (task) {
            reset({
                title: task.title,
                description: task.description,
                status: task.status
            });
        } else {
            reset({
                title: "",
                description: "",
                status: "Pending"
            });
        }
    }, [task, reset]);

    const onSubmit = async (data) => {
        try {
            if (task) {
                await axios.patch(
                    `${process.env.REACT_APP_API_URL}/tasks/${task.id}`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                toast.success("Task updated successfully");
            } else {
                await axios.post(
                    `${process.env.REACT_APP_API_URL}/tasks`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                toast.success("Task created successfully");
            }
            fetchTasks();
            onClose();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>
                    {task ? "Update Task" : "Create Task"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formGroup}>
                        <label>Title</label>
                        <input
                            {...register("title")}
                        />
                        <small>{errors.title?.message}</small>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Description</label>
                        <textarea
                            rows="4"
                            {...register("description")}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Status</label>
                        <select
                            {...register("status")}
                        >
                            <option value="Pending">
                                Pending
                            </option>
                            <option value="In Progress">
                                In Progress
                            </option>
                            <option value="Completed">
                                Completed
                            </option>
                        </select>
                    </div>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {
                                task
                                    ? "Update"
                                    : "Create"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default TaskModal;