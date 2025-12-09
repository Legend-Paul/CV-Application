import "../index.css";
import "./header.css";
import image from "../images/noBgLogo.png";

function Header({ handleSaveCV, handleLoadCV }) {
  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <img src={image} alt="CV Icon" className="header-icon" />
          </div>
          <div className="header-text">
            <h1>
              {" "}
              <abbr title="CURRICULUM VITAE">CV</abbr> APPLICATION
            </h1>
            <p>Fill out the form below to create your CV</p>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
