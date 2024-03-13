import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const imageStyle = {
    width: "200px",
    height: "200px",
    objectFit: "cover", // This property ensures the image fills the specified dimensions
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4 mb-4">Welcome to Rescue Me</h2>
      <div className="row justify-content-center">
        <div className="text-center mb-4">
          {" "}
          {/* Added margin-bottom */}
          <Link to="/login" className="btn btn-primary">
            Find People
          </Link>
        </div>
        <div className="col-md-4">
          <img
            src="https://th.bing.com/th?q=Missing+People+in+England&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.5&pid=InlineBlock&mkt=en-WW&cc=KE&setlang=en&adlt=strict&t=1&mw=247"
            alt="Image 1"
            className="img-fluid mb-4"
            style={imageStyle}
          />
        </div>
        <div className="col-md-4">
          <img
            src="https://th.bing.com/th?q=Missing+People+Posters&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.5&pid=InlineBlock&mkt=en-WW&cc=KE&setlang=en&adlt=strict&t=1&mw=247"
            alt="Image 2"
            className="img-fluid mb-4"
            style={imageStyle}
          />
        </div>
        <div className="col-md-4">
          <img
            src="https://th.bing.com/th/id/OIP.rTDi3sI7f-_gV7ye408WwAHaKe?w=115&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
            alt="Image 3"
            className="img-fluid mb-4"
            style={imageStyle}
          />
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-4">
          <img
            src="https://th.bing.com/th/id/R.8ba967202b4db46ce5a212973298fda7?rik=eH3z4zR45ZfNYg&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f33500000%2fmissing-people-the-missing-people-33529640-1275-1650.jpg&ehk=uDusGBVEHDaR2Xb3EtGoSocWXVoC5KV6KqPRFAQjC3k%3d&risl=&pid=ImgRaw&r=0"
            alt="Image 4"
            className="img-fluid mb-4"
            style={imageStyle}
          />
        </div>
        <div className="col-md-4">
          <img
            src="https://th.bing.com/th/id/OIP.KktELkQ9vUSYpx6XfCHQCgAAAA?pid=ImgDet&w=190&h=143&c=7&dpr=1.5"
            alt="Image 5"
            className="img-fluid mb-4"
            style={imageStyle}
          />
        </div>
        <div className="col-md-4">
          <img
            src="https://th.bing.com/th/id/OIP.-57ntBRwEbzIvFlbzqGAngHaJl?pid=ImgDet&w=190&h=245&c=7&dpr=1.5"
            alt=""
            className="img-fluid mb-4"
            style={imageStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
