import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import image from "../image/1688661157476.jpeg";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const count = useSelector((state) => state.counter.token.token);
  const navigate = useNavigate();
  const params = useParams();
  const [productDetails, setProductDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setDetailLoading(true);
    axios.get(`/productDetails/${params.id}`).then((res) => {
      const data = res.data;
      setDetailLoading(false);
      setProductDetails({ data });
    });
  }, [params.id]);

  const deleteItem = () => {
    setLoading(true);
    axios.get(`/deleteproduct/${params.id}`).then((res) => {
      console.log(res);
      setLoading(false);
      toast.success("Product Deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate(`/products`);
    });
  };

  const DeleteModal = () => {
    return (
      <div class="modalWrapper">
        <div className="modalContent">
          <h1 className="modalHeading">
            Are you sure you want to delete this product
          </h1>
          <div className="modalButtonWrapper">
            <button onClick={deleteItem} className="modalButton">
              {loading ? <Spinner /> : "Delete"}
            </button>
            <button onClick={() => setModal(false)} className="button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  console.log(productDetails);

  return (
    <>
      {!count ? (
        <div className="homeContainer">
          <div className="homeContent">
            <h1>"You Are Not Login"</h1>
          </div>
        </div>
      ) : (
        <div className="productDetailsWrapper">
          <div className="productDetailsImgWrapper">
            {detailLoading ? (
              <Spinner />
            ) : (
              <img
                className="detailImage"
                src={
                  productDetails?.data?.image
                    ? productDetails?.data?.image
                    : image
                }
              />
            )}
          </div>
          <div>
            <h1 style={{ textTransform: "capitalize" }}>
              {detailLoading ? "..." : productDetails?.data?.name}
            </h1>
            <p style={{ textTransform: "capitalize" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>Price: {detailLoading ? "..." : productDetails?.data?.price}</p>
            <div className="modalButtonWrapper">
              <button onClick={() => setModal(true)} className="button">
                Delete
              </button>
              <NavLink className="nav-link" to={`/product/${params.id}`}>
                <button className="button">Edit</button>
              </NavLink>
            </div>
            {modal ? <DeleteModal /> : ""}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
