import express from "express";
import authRoutes from "../src/routes/auth.routes";
import createRoles from "./libs/initialSetup";
import taskRoutes from "../src/routes/task.routes";
import taskUserRoutes from "../src/routes/taskuser.routes";

//CORS, se usa para evitar errores en las peticiones de servidores,de manera que admite o deniega sengun el caso
import cors from "cors";

const app = express();
//Ejecutar la función para crear roles por defecto
createRoles();

//export default app;
app.use(express.json());

app.use(cors());


app.get("/", (req, res) => {
  res.send("Bienvenido a mi API");
});
//Rutas para las acciones de las tareas
app.use("/api/task",taskRoutes);
//Rutas para registro y login
app.use("/api/auth", authRoutes);
//Rutas para las tareas de los usuarios
app.use("/api/taskuser", taskUserRoutes);

export default app;
