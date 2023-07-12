import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      // work: "",
      // phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      // Handle form submission here
      const { name, email, password, confirmPassword } = values;
      try {
        const response = await axios.post(`/register`,  {
          method: "POST",
          Headers: {
            "Content-Type": "application/json",
          },
          body: {
            name,
            email,
            // work,
            // phone,
            password,
            cpassword: confirmPassword,
          },
        });
        console.log(response)
        toast.success("Registration Successsfull", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
        navigate("/login");
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
      <h2>Registration Form</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && <div className="error">{formik.errors.name}</div>}
      </div>
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
      {/* <div className="form-group">
        <label htmlFor="work">Work:</label>
        <input
          type="text"
          id="work"
          name="work"
          value={formik.values.work}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div> */}
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
        {formik.touched.password && formik.errors.password && <div className="error">{formik.errors.password}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="error">{formik.errors.confirmPassword}</div>}
      </div>
      <button type="submit" disabled={loading} className="button">
        {loading ? <Spinner /> : "Register"}
      </button>
    </form>
  );
};

export default Signup;
