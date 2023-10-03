import "./splash.scss";

import { useNavigate } from "react-router-dom";

import Navbar from "../navbar/navbar";

const Splash = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="Splash">
        <Navbar />
        <button onClick={() => navigate("/catalogue")}>SHOP NOW</button>
      </div>
    </>
  );
};

export default Splash;
