import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Home } from "./Home";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/mobiles"
          element={
           <ProtectdRoute>
              <Phonelist />
            </ProtectdRoute>
          }
        />
      </Routes>
    </div>
  );
}

function ProtectdRoute({ children }) {
  const token = localStorage.getItem('token')
  return token? (<section>
    <h1>This is Protected</h1>
    {children}
  </section>):(<Navigate replace to="/"></Navigate>)

}

function Phonelist() {
  const [mobileData, setMobileData] = useState([]);
  const get_mobile_data = async () => {
    const data = await fetch(
      // "https://moblie-phones-site-backend.onrender.com/mobileData"
       "http://localhost:4000/mobileData"
       ,{
        headers:{
          "x-auth-token":localStorage.getItem("token"),
        }
      }
     
    );
    const json_data = await data.json();
    setMobileData(json_data);
  };
  useEffect(() => {
    get_mobile_data();
  }, []);

  return (
    <div className="phone-list-container">
      {mobileData.map((mbl, index) => (
        <Phone mobile={mbl} key={index} />
      ))}
    </div>
  );
}

function Phone({ mobile }) {
  return (
    <div className="phone-container">
      <img className="phone-picture" src={mobile.img} alt={mobile.model} />
      <p className="phone-name">{mobile.model}</p>
      <p className="phone-company">{mobile.company}</p>
    </div>
  );
}

export default App;
