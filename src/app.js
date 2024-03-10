import express from "express";
import authRoutes from "../src/routes/auth.routes";
import createRoles from "./libs/initialSetup";
import taskRoutes from "../src/routes/task.routes";
const app = express();
//Ejecutar la función para crear roles por defecto
createRoles();

//export default app;
app.use(express.json());



app.get("/", (req, res) => {
  res.send("Bienvenido a mi API");
});

app.use("/api/task",taskRoutes);
app.use("/api/auth", authRoutes);
export default app;
