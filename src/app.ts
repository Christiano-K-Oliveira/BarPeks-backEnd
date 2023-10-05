import "express-async-errors";
import express, { Application } from "express";
import { errorHandler } from "./errors";
import pubsRoutes from "./routes/pubs.routes";
import loginRoutes from "./routes/login.routes";
import clientsRoutes from "./routes/clients.routes";
import productsRoutes from "./routes/products.routes";
import { clientRegisteredClientsRoutes, pubRegisteredClientsRoutes } from "./routes/registeredClients.routes";
import { clientRescueHistoryRoutes, pubRescueHistoryRoutes } from "./routes/rescueHistory.routes";

const app: Application = express();
app.use(express.json());

app.use("/pubs", pubsRoutes);
app.use("", loginRoutes);
app.use("/clients", clientsRoutes);
app.use("/products", productsRoutes)
app.use("/pub/registered-clients", pubRegisteredClientsRoutes)
app.use("/client/registered-clients", clientRegisteredClientsRoutes)
app.use("/pub/rescue-history", pubRescueHistoryRoutes)
app.use("/client/rescue-history", clientRescueHistoryRoutes)

app.use(errorHandler);

export default app;