import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ErrorPage from "./components/ErrorPage";
import Logout from "./components/Logout";
import AddProduct from "./components/AddProducts";
import ProductDetails from "./components/ProductDetails";
import ProductListing from "./components/ProductListing";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const count = useSelector((state) => state.counter.token.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!count) {
      navigate("/");
    }
  }, [count]);

  return (
    <>
      <Navbar />
      <Routes>
        {!count ? (
          <>
            <Route path="/" element={<Home />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/product/:label" element={<AddProduct />} />
            <Route path="*" element={<ErrorPage />} />
          </>
        )}
        <>
        <Route path="/productdetail/:id" element={<ProductDetails />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        </>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
