import axios from "axios";
import React, { useState } from "react";

const Contact = () => {
  // Hardcoded values for contact information
  const mainOfficeAddress = "Roysambu, Nairobi, Kenya";
  const contactEmail = "Rescueme@co.ke";
  const contactPhone = "02087366738";
  const contactMobile = "+254704234870";

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contact: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission
    console.log("Form submitted:", formData);
    // You can send this data to your server or perform other actions here
    try {
      const response = await axios.post(
        "http://localhost:7000/message",
        formData
      );

      if (response.status === 200) {
        console.log("Message submitted successfully!");
        alert("Message submitted successfully!");
        // Reset the form fields
        setFormData({
          fullname: "",
          email: "",
          contact: "",
          message: "",
        });
      } else {
        console.error("Failed to submit message");
      }
    } catch (error) {
      console.error("Error submitting message:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white secondary-bg p-4 d-flex align-items-center justify-content-center vh-100">
      <div className="text-center container">
        <hr
          className="mx-auto bg-primary border-primary opacity-100"
          style={{ width: "50px" }}
        />

        <div className="row">
          {/* First Column */}
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body py-4">
                <dl>
                  <dt>
                    <b>Our Main Office is Located at:</b>
                  </dt>
                  <dd className="ps-4">{mainOfficeAddress}</dd>
                  <dt>
                    <b>Email us:</b>
                  </dt>
                  <dd className="ps-4">{contactEmail}</dd>
                  <dt>
                    <b>Telephone #:</b>
                  </dt>
                  <dd className="ps-4">{contactPhone}</dd>
                  <dt>
                    <b>Mobile #:</b>
                  </dt>
                  <dd className="ps-4">{contactMobile}</dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Second Column */}
          <div className="col-lg-6">
            <div className="card mt-1.5">
              <div className="card-body py-4">
                <h4 className="pageTitle">Send us a Message</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">
                      Fullname
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contact" className="form-label">
                      Contact No.
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      rows="5"
                      className="form-control"
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
