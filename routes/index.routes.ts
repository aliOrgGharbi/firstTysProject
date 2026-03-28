import { Router } from "express";
import usersRoutes from "./users.routes";
import cardsRoutes from "./cards.routes";
import amountsRoutes from "./amount.routes"; 

const router = Router();

router.use("/users", usersRoutes);
router.use("/cards", cardsRoutes);
router.use("/amount", amountsRoutes); 


export default router;