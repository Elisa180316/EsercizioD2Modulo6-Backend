import bcrypt from "bcrypt";
import { Router } from "express";
import UserModel from "../models/users.js";
import express from "express";

const router = Router();

router.post("/login", async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send({ message: "User not found", statusCode: 404 });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res
      .status(400)
      .send({ message: "Password is wrong", statusCode: 400 });
  }
  return res.status(200).send({
    message: "Login effettuato con successo",
    statusCode: 200,
    payload: user,
  });
});

export default router;
