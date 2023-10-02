import "express-async-errors";
import express, { Application } from "express";
import { errorHandler } from "./errors";
import pubsRoutes from "./routes/pubs.routes";
import loginRoutes from "./routes/login.routes";
import clientsRoutes from "./routes/clients.routes";

const app: Application = express();
app.use(express.json());

app.use("/pubs", pubsRoutes);
app.use("", loginRoutes);
app.use("/clients", clientsRoutes);


app.use(errorHandler);

export default app;