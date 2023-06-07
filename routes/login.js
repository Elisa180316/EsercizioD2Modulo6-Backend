import bcrypt from "bcrypt";
import { Router } from "express";
import UserModel from "../models/users.js";
import express from "express";
import jwt from "jsonwebtoken";

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

  //Token da inviare al frontend//
  //genero con algoritmo token con primo argomento email per renderlo univoco ed il set di caratteri//
  const token = jwt.sign(
    {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      age: user.age,
      id: user._id,
    },
    process.env.SECRET_JWT_KEY,
    {
      //Scade in 24 ore//
      expiresIn: "24h",
    }
  );
  //restituisce in header l'autorizzazione con il token e lo statuscode//
  res.header("auth", token).status(200).send({
    message: "Login effettuato con successo",
    statusCode: 200,
    token,
  });

  // return res.status(200).send({
  //   message: "Login effettuato con successo",
  //   statusCode: 200,
  //   payload: user,
  // });
});

export default router;
