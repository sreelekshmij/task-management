import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

import styles from "./SignUp.module.scss";

const SignUp = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Minimum 3 characters"),

    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    role: Yup.string()
      .oneOf(["user", "admin"])
      .required("Role is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      role: "user",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        data
      );

      toast.success(response.data.message);

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className={styles.signUp}>
      <div className={styles.card}>
        <h2>Create Account</h2>
        <p>Create your Task Manager account</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              {...register("name")}
            />

            <small className={styles.error}>
              {errors.name?.message}
            </small>
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />

            <small className={styles.error}>
              {errors.email?.message}
            </small>
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />

            <small className={styles.error}>
              {errors.password?.message}
            </small>
          </div>

          <div className={styles.formGroup}>
            <label>Role</label>

            <select {...register("role")}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <small className={styles.error}>
              {errors.role?.message}
            </small>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Sign Up"}
          </button>

          <p className={styles.loginLink}>
            Already have an account?{" "}
            <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;