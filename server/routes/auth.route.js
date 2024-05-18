import express from "express"
import { login, logout, register } from "../controllers/auth.controller.js";

const router = express.Router();

// router.get("/test", (req, res) => {
//   res.send("it works!")
// })

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout) 

export default router
