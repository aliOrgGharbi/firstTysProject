import express from "express";
import indexRoutes from "../routes/index.routes";
import  connectDB  from "../config/db.config"

const app = express();
const PORT = 3000;


//define the data type
app.use(express.json());

connectDB();

app.use("/", indexRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
