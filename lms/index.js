import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sessionRoutes from "./src/routes/session.routes.js";
import { connectDb } from "./src/config/database.js";
import userRoutes from "./src/routes/user.routes.js";
import courseRoutes from "./src/routes/course.routes.js";
import materialRoutes from './src/routes/material.routes.js';
import browseRoutes from './src/routes/browseCourse.routes.js'
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger-config.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/sessions", sessionRoutes);
app.use("/api/user", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/browseCourses", browseRoutes);

const PORT = process.env.SERVER_PORT || 5000;

const startServer = async () => {
  await connectDb();

  app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
  });
};

startServer();
