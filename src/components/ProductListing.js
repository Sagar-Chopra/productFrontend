import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../image/1688661157476.jpeg";
import Spinner from "./Spinner";

const ProductListing = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProduct = () => {
    try {
      setLoading(true);
      axios.get(`/productlisting`).then((res) => {
        const products = res.data;
        setProducts({ products });
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  console.log(products)

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleProduct = (id) => {
    navigate(`/productdetail/${id}`);
  };
  return (
    <div className="listingWrapper">
      {loading ? (
        <Spinner />
      ) : (
        products?.products?.map((data) => (
          <div key={data._id} onClick={() => handleProduct(data._id)} className="center">
            <p>{data.name}</p>
            <div>
              <img className="detailImage" src={data.image ? data.image : image} />
            </div>
            <p>{data.price}</p>
            <button className="button">Detail</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductListing;
