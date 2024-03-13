const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer"); // Import multer for handling multipart/form-data
const fs = require("fs"); // Import fs module for file handling
const path = require("path");
const bcrypt = require('bcrypt');

const Usermodel = require('./models/users');
const ReportModel = require("./models/report");
const Message = require("./models/message");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/lost2");




// Route to handle user registration
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;
    console.log('Received userType:', userType); // Log userType to check its value

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10

    // Validate that userType is either "user" or "admin"
    if (userType !== "User" && userType !== "Admin") {
      return res.status(400).json({ message: "Invalid userType" });
    }

    // Save the user with hashed password and userType
    const user = await Usermodel.create({ name, email, password: hashedPassword, userType });
    res.json(user);
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Route to fetch all users
app.get("/get-users", async (req, res) => {
  try {
    const users = await Usermodel.find(); // Assuming Usermodel is your Mongoose model
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


// Route to handle user login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    const user = await Usermodel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', role: user.userType }); // Return userType
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route to handle saving reported data
app.post("/save", upload.single("image"), async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      lastKnownLocation,
      description,
      image, // Use the image field directly
    } = req.body;

    const newReport = new ReportModel({
      firstName,
      lastName,
      age,
      lastKnownLocation,
      description,
      image,
    });

    await newReport.save();

    res.status(200).json({ message: "Report saved successfully" });
  } catch (error) {
    console.error("Error saving report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// Route to handle fetching all saved reports
app.get("/fetchReports", async (req, res) => {
  try {
    const reports = await ReportModel.find();
    const reportsWithBase64Image = reports.map((report) => {
      // Convert the image buffer to a base64 string
      const base64Image = report.image.toString("base64");
      return { ...report.toObject(), image: base64Image };
    });
    res.json(reportsWithBase64Image);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

 
//////////////////////////////


////////////////////////


// Route to handle DELETE request
app.delete("/deleteReport/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Find the report by ID and delete it
    const deletedReport = await ReportModel.findByIdAndDelete(id);
    if (!deletedReport) {
      return res.status(404).send("Report not found");
    }
    res.status(200).send("Report deleted successfully");
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).send("Internal Server Error");
  }
});





app.post("/message", (req, res) => {
    const { fullname, email, contact, message } = req.body;
    const newMessage = new Message({
      fullname,
      email,
      contact,
      message,
    });
    newMessage.save()
      .then(() => {
        console.log("Message saved successfully");
        res.status(200).json({ message: "Message received successfully!" });
      })
      .catch((err) => {
        console.error("Error saving message:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  });


  app.get('/get-messages', async (req, res) => {
    try {
      const messages = await Message.find();
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });



app.listen(7000, () => {
  console.log("The server is running");
});
