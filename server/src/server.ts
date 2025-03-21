import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on ${PORT}...`));
app.use(cors());
app.use(express.json());

app.post("/api/token", async (req, res) => {
  try {
    const response = await axios.post(
      "https://iam.api.cloud.yandex.net/iam/v1/tokens",
      {
        yandexPassportOauthToken: process.env.YANDEX_OAUTH_TOKEN,
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error getting token:", error);
    res.status(500).json({ error: "Failed to get token" });
  }
});

app.post("/api/completion", async (req, res) => {
  try {
    const response = await axios.post(
      "https://llm.api.cloud.yandex.net/foundationModels/v1/completion",
      req.body,
      {
        headers: {
          Authorization: `Bearer ${req.body.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error getting completion:", error);
    res.status(500).json({ error: "Failed to get completion" });
  }
});

app.use(express.static(path.join(__dirname, "..", "dist")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});
