import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

import styles from "./Login.module.scss";

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),

    password: Yup.string()
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        data
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <h2>Task Manager</h2>
        <p>Sign in to continue</p>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.formGroup}>
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />

            {errors.email && (
              <small className={styles.error}>
                {errors.email.message}
              </small>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />

            {errors.password && (
              <small className={styles.error}>
                {errors.password.message}
              </small>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className={styles.signupLink}>
            Don't have an account?{" "}
            <Link to="/signup">Sign Up</Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;