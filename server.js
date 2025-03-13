import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Accept"]
}));

app.use(express.json());

app.post("/proxy/get_business_data", async (req, res) => {
  try {
    const apiUrl = `${process.env.REACT_APP_API_URL}/get_business_data`; 

    const response = await axios.post(apiUrl, req.body, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });

    console.log("Proxy received data:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error in proxy server:", error.response?.data || error.message);
    res.status(500).json({ 
      error: "Failed to fetch data",
      details: error.response?.data || error.message 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
