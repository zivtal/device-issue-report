import express from "express";
import { add as postForm, query as getReports } from "./form.controller";
const router = express.Router();

router.get("/", getReports);
router.post("/", postForm);

export const formRoutes = router;
