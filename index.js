import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import "dotenv/config";
import brandRouter from "./Routes/Brands.js";
import productRouter from "./Routes/Products.js";
import categoryRouter from "./Routes/Categories.js";
import BannerRotuer from "./Routes/Banners.js";
import InnovationRouter from "./Routes/Innovations.js";
import ImageHeaderRouter from "./Routes/ImageHeaders.js";
import UserRouter from "./Routes/Users.js";
import Payment from "./Routes/Payment.js";

const app = express();

app.use(cookieParser());
app.use(express.json()); // Set limit to an appropriate value, e.g., 100MB
app.use(express.urlencoded({ extended: true }));
app.use(compression());

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://center-kitchen-frontend.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/products", productRouter);
app.use("/brands", brandRouter);
app.use("/categories", categoryRouter);
app.use("/Banners", BannerRotuer);
app.use("/Innovations", InnovationRouter);
app.use("/ImageHeaders", ImageHeaderRouter);
app.use("/Users", UserRouter);
app.use(Payment);

//==========================================================================
//==========================================================================

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://marwan:8thlu5espHV5HPGz@cluster0.ftt0h.mongodb.net/DB_Kitchen",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
        autoIndex: false, // Disable auto-creation of indexes
      }
    );
    console.log("Connected to Database successfully.");
  } catch (err) {
    console.error("Database Connection Error: ", err.message);
    throw err; // Throw the error to handle it in the caller function
  }
};

// Function to start the server
const startServer = async () => {
  try {
    await connectDB(); // Ensure the database connection is established first
    const PORT = process.env.PORT || 2000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  } catch (err) {
    console.error("Failed to start the server: ", err.message);
  }
};

// Start the server
startServer();

//==========================================================================
//==========================================================================

// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://marwan:8thlu5espHV5HPGz@cluster0.ftt0h.mongodb.net/DB_Kitchen",
//       { useNewUrlParser: true, useUnifiedTopology: true }
//     );
//     console.log("Done Connect To Database..");
//   } catch (err) {
//     console.error("Database Connection Error: ", err.message);
//     process.exit(1);
//   }
// };

// // Start Server
// connectDB().then(() => {
//   app.listen(process.env.PORT || 2000, () => {
//     console.log("Done Connect To Server..");
//   });
// });
