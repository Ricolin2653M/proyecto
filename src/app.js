import express from "express";
import productsRoutes from "../src/routes/products.routes";
import authRoutes from "../src/routes/auth.routes";
import createRoles from "./libs/initialSetup";
const app = express();
//Ejecutar la función para crear roles por defecto
createRoles();

//export default app;
app.use(express.json());



app.get("/", (req, res) => {
  res.send("Bienvenido a mi API");
});

app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
export default app;
