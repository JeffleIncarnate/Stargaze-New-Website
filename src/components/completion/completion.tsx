import "./completion.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

const Completion = () => {
  const navigate = useNavigate();

  return (
    <main className="Completion">
      <h1>Thank you for shopping with us</h1>
      <p>Want to stargaze some more?</p>

      <div className="Completion__Connect">
        <h2>Connect with us!</h2>
        <div>
          <a href="#">
            <FontAwesomeIcon icon={faTiktok} />
          </a>

          <a href="#">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>

      <div className="Completion__Button">
        <button onClick={() => navigate("/")}>Back to HomePage</button>
      </div>
    </main>
  );
};

export default Completion;
