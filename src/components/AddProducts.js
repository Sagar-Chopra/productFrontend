import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const AddProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [file, setFile] = useState(null);
  const [getDataLoading, setGetDataLoading] = useState(false);
  const [loading, setLoading] = useState({
    createLoading: false,
    updateLoading: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    consumed: "",
    mfgName: "",
    mfgAddress: "",
  });

  useEffect(() => {
    setGetDataLoading(true);
    if (params.label !== `create`) {
      axios.get(`/productDetails/${params.label}`).then((res) => {
        const data = res.data;
        setGetDataLoading(false);
        setFile(data.image);
        // Pre-fill the form fields with the fetched data
        setFormData({
          name: data.name || "",
          price: data.price || "",
          quantity: data.quantity || "",
          consumed: data.consumed || "",
          mfgName: data.mfgName || "",
          mfgAddress: data.mfgAddress || "",
        });
      });
    } else {
      setFormData({
        name: "",
        price: "",
        quantity: "",
        consumed: "",
        mfgName: "",
        mfgAddress: "",
      });
      setFile("");
    }
  }, [params.label]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading({
      ...loading,
      createLoading: true,
    });
    e.preventDefault();
    // Handle form submission here
    const { name, price, quantity, consumed, mfgName, mfgAddress } = formData;

    axios
      .post(`/addproduct`, {
        method: "POST",
        Headers: {
          "Content-Type": "multipart/form-data",
        },
        body: {
          image: file,
          name,
          price,
          quantity,
          consumed,
          mfgName,
          mfgAddress,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Product Add Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading({
          ...loading,
          createLoading: false,
        });
        navigate("/products");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Product Not Added", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading({
          ...loading,
          createLoading: false,
        });
      });
  };

  const update = (e) => {
    setLoading({
      ...loading,
      updateLoading: true,
    });
    e.preventDefault();
    // Handle form submission here
    const { name, price, quantity, consumed, mfgName, mfgAddress } = formData;
    axios
      .patch(`/updateproduct/${params.label}`, {
        method: "PATCH",
        Headers: {
          "Content-Type": "multipart/form-data",
        },
        body: {
          image: file,
          name,
          price,
          quantity,
          consumed,
          mfgName,
          mfgAddress,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading({
          ...loading,
          updateLoading: false,
        });
        navigate("/products");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Product Not Updated", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading({
          ...loading,
          updateLoading: false,
        });
      });
  };

  const converToBase64 = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setFile(reader.result);
    };
    reader.onerror = (error) => {
      console.log("error", error);
    };
  };
  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      {getDataLoading ? "Fetching Data" : ""}
      <input type="file" id="image" name="image" onChange={converToBase64} />
      {file && <img src={file} alt="File Preview" className="preview" />}
      <div className="form-group">
        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Stock Quantity:</label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="consumed">Stock Consumed:</label>
        <input
          type="text"
          id="consumed"
          name="consumed"
          value={formData.consumed}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="mfgName">Mfg Name:</label>
        <input
          type="text"
          id="mfgName"
          name="mfgName"
          value={formData.mfgName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="mfgAddress">Stock Address:</label>
        <input
          type="text"
          id="mfgAddress"
          name="mfgAddress"
          value={formData.mfgAddress}
          onChange={handleChange}
        />
      </div>
      {params.label === `create` && (
        <button type="submit" disabled={loading.createLoading}>
          {loading.createLoading ? <Spinner /> : "Add Product"}
        </button>
      )}
      {params.label !== `create` && (
        <button
          onClick={update}
          className="button"
          disabled={loading.updateLoading || getDataLoading}
        >
          {loading.updateLoading ? <Spinner /> : "Edit Product"}
        </button>
      )}
    </form>
  );
};

export default AddProduct;
