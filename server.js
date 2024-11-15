const express = require("express");
const axios = require("axios");

const app = express();
const port = 3004; // Set your desired port

// Middleware to parse JSON
app.use(express.json());

// 1inch API endpoint to get portfolio details based on address
app.get("/api/portfolio", async (req, res) => {
  const address = req.query.address; // Expecting 'address' as a query parameter

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    // Make the request to the 1inch API
    const response = await axios.get(
      `https://api.1inch.dev/portfolio/portfolio/v4/overview/erc20/details?addresses=${address}`,
      {
        headers: {
          Authorization: "Bearer budlbXCMPebX7rJWElK4CFUqRgkqp06i", // Replace with your actual API key
        },
      }
    );
    // Return the data from the 1inch API to the frontend
    return res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from 1inch API:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch data from 1inch API" });
  }
});

app.get("/api/value_chart", async (req, res) => {
  const { address, chainId } = req.query;

  // Validate the required query parameters
  if (!address || !chainId) {
    return res.status(400).json({ error: "Address and chainId are required" });
  }

  try {
    // Make the request to the 1inch API
    const response = await axios.get(
      `https://api.1inch.dev/portfolio/portfolio/v4/general/value_chart?addresses=${address}&chainId=${chainId}&timerange=1year`,
      {
        headers: {
          Authorization: "Bearer budlbXCMPebX7rJWElK4CFUqRgkqp06i", // Replace with your actual API key
        },
      }
    );
    // Return the data from the 1inch API to the frontend
    return res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from 1inch API:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch data from 1inch API" });
  }
});

// Start the backend server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});