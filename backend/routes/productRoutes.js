import express from "express";
import formidable from "express-formidable";

const router = express.Router()

// controllers
import { addProduct } from "../controllers/productController";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware";
import {checkId} from "../middlewares/checkId";


router.route("/").post(authenticate, authorizeAdmin, formidable(), addProduct);
export default router;