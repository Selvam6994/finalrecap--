import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Phonelist></Phonelist>
    </div>
  );
}
function Phonelist(){
const [mobileData,setMobileData] = useState([])
const get_mobile_data = async ()=>{
const data = await fetch("https://moblie-phones-site-backend.onrender.com/mobileData")
const json_data = await data.json();
setMobileData(json_data);
}
 useEffect(() => {
  get_mobile_data()
}, [])


  
return(
  
  <div className="phone-list-container">
    {
      mobileData.map((mbl,index)=>(<Phone mobile={mbl} key={index}/>))
    }
  </div>
  
)
}

function Phone({mobile}) {
  return (
        <div className="phone-container">
          <img className="phone-picture" src={mobile.img} alt={mobile.model}/>
          <p className="phone-name">{mobile.model}</p>
          <p className="phone-company">{mobile.company}</p>
        </div>
      

  );
}

export default App;
