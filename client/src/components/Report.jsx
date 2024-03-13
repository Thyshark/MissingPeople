import React, { useState } from "react";
import axios from "axios";

const Report = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [lastKnownLocation, setLastKnownLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if an image has been selected
    if (!image) {
      console.error("No image selected");
      return;
    }

    // Convert the selected image file to a base64 string
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const imageData = reader.result;

      // Extract the base64 data (everything after the comma)
      const base64Data = imageData.split(",")[1];

      // Create a form data object with the extracted base64 data and other fields
      const formData = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        lastKnownLocation: lastKnownLocation,
        description: description,
        image: base64Data, // Use the extracted base64 data here
      };

      try {
        // Send the report data to the server using Axios
        const response = await axios.post(
          "http://localhost:7000/save",
          formData
        );

        if (response.status === 200) {
          console.log("Report submitted successfully!");
          alert("Report submitted successfully!");
          // Reset the form fields
          setFirstName("");
          setLastName("");
          setAge("");
          setLastKnownLocation("");
          setDescription("");
          setImage(null);
        } else {
          console.error("Failed to submit report");
        }
      } catch (error) {
        console.error("Error submitting report:", error.message);
        alert("Check the form requirements!");
      }
    };
  };

  return (
    <div className="d-flex justify-content-center align-items-centcd er bg-light-blue vh-100">
      <div className="container bg-white p-4 rounded shadow w-50">
        <div className="space-y-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Report a Missing Person</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Please fill out the form below with details about the missing
                person.
              </p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="first-name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="first-name"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="last-name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="last-name"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="age"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Age
                </label>
                <input
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="age"
                  placeholder="Enter age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="last-known-location"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Last known location
                </label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="last-known-location"
                  placeholder="Enter last known location"
                  value={lastKnownLocation}
                  onChange={(e) => setLastKnownLocation(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Description
                </label>
                <textarea
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                  id="description"
                  placeholder="Enter a description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Image
                </label>
                <input
                  type="file"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="image"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </div>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Report;
