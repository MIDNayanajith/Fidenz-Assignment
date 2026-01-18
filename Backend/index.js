import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
import weatherRoutes from "./routes/weatherRoutes.js";
import { auth } from "express-oauth2-jwt-bearer";

dotenv.config();
const app = Express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//jwt validation
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: "RS256",
});

//protected routes
app.use("/api/weather", checkJwt, weatherRoutes);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
