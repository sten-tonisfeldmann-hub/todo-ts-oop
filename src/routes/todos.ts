import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
        res.send("OK");
    });
router.get("/", (req, res) => {
        res.send("OK");
    });
router.patch("/", (req, res) => {
        res.send("OK");
    });
router.delete("/", (req, res) => {
        res.send("OK");
    });

export default router;