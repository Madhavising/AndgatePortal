const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const dbConnection = require("./src/db/dbConnection");
const portalRoutes = require("./src/routes/portalRoutes");
const authRoutes = require("./src/routes/authRoutes");
const eventRoute = require("./src/routes/eventRoute");
const companyRoute = require("./src/routes/companyRoute");

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://myportal.andgatetech.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api", companyRoute);
app.use("/api", portalRoutes);
app.use("/api", eventRoute);

app.use("/src/uploads", express.static(path.join(__dirname, "src/uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  dbConnection();
});
