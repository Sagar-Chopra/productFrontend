import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner from "./Spinner";
import { isLogin } from "../redux/authenticateSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      // Handle form submission here  
      const { email, password } = values;
      try {
        const response = await axios.post(`/signin`,  {
          method: "POST",
          Headers: {
            "Content-Type": "application/json",
          },
          body: {
            email,
            password,
          },
        });
        dispatch(isLogin(response.data.jwtoken));
        toast.success("Login Successful", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
        navigate("/home");
      } catch (err) {
        console.log(err);
        if (!toast.isActive("err")) {
          toast.error(err.response.data.error, {
            toastId: "err",
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        setLoading(false);
      }
    },
  });

  return (
    <form className="registration-form" onSubmit={formik.handleSubmit}>
      <h2>Login Form</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="error">{formik.errors.password}</div>
        )}
      </div>
      <button type="submit" disabled={loading} className="button">
        {loading ? <Spinner /> : "Login"}
      </button>
    </form>
  );
};

export default Login;
