import React, { useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from "axios";
import { isLogOut } from "../redux/authenticateSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const callLogout = async () => {
    try {
      axios
        .get(`/logout`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
            dispatch(isLogOut(""));
            navigate('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    callLogout();
  }, []);
  return <div>Logout</div>;
};

export default Logout;
