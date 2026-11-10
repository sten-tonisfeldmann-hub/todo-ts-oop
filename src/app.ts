import express, {Request, Response, NextFunction} from "express";
import { json } from "express";
import todosRoutes from "./routes/todos.js";

const app = express();

app.use(json());
app.use("/todos", todosRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({ message: error.message });
});

app.listen(3011, () => {
  console.log("Server is running on https://localhost:3011");
});