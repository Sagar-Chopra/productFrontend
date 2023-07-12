import React, {useState, useEffect} from 'react'
import axios from "axios";

const Home = () => {
  const [userName, setUserName] = useState();
  const callHomePage = async () => {
    try {
      axios
        .get(`/getdata`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setUserName(res.data.name);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    callHomePage();
  }, []);
  return (
    <div className='homeContainer'>
        <div className='homeContent'>
            <p>Welcome</p>
            <h2 className="userName">{userName}</h2>
            <h1>This Is For Assignment</h1>
        </div>
    </div>
  )
}

export default Home