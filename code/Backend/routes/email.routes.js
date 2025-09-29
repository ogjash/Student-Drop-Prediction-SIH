import express from "express";
import{email} from "../Controllers/email.controller.js";

const router=express.Router();
router.post("/send", email);

export default router;
