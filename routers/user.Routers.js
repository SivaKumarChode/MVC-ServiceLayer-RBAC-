import express from "express";
import { userControllers } from "../controllers/User.controlers.js";
import { Verify } from "../middlewares/VerifyToken.js";
import { RoleBase } from "../middlewares/VerifyRole.js";
const router = express.Router();

router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.get("/ref", userControllers.refresh);

router.get("/data", Verify, RoleBase(["parent","admin"]), (req, res) => {
  try {
    res.status(200).json({
      message: "hello world",
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/data1", Verify, RoleBase(["user"]), (req, res) => {
  try {
    res.status(200).json({
      message: "hello user",
    });
  } catch (error) {
    console.log(error);
  }
});
export default router;
