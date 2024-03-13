import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">About Rescue Me</h5>
          <p className="card-text">
            Rescue Me is a web application dedicated to helping reunite missing
            individuals with their families and loved ones. Our platform allows
            users to post information about missing people, including photos,
            descriptions, and last known locations. Visitors can search through
            these listings to find information about missing individuals and
            potentially provide crucial information that could lead to their
            safe return.
          </p>
          <p className="card-text">
            If you are looking for someone who is missing, or if you have
            information that could help locate a missing person, please use our
            platform to post or search for information. Together, we can make a
            difference and bring hope to families who are searching for their
            missing loved ones.
          </p>
          <Link to="/login" className="btn btn-primary">
            Find People
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
