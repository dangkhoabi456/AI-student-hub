import "./Logo.css";
import logoImage from "../imgs/new_logo.png";

function Logo() {
  return (
    <div className="logo">
      <img className="logo_image" src={logoImage} alt="AI Study Hub logo" />
    </div>
  );
}

export default Logo;