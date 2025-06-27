const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "/client/build")));

// Import route files
const testimonialsRoutes = require("./routes/testimonials.routes");
const concertsRoutes = require("./routes/concerts.routes");
const seatsRoutes = require("./routes/seats.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes with /api prefix
app.use("/api", testimonialsRoutes);
app.use("/api", concertsRoutes);
app.use("/api", seatsRoutes);

app.get("", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
