import express from "express";

const router = express.Router();

import { loginValidation } from '../../utils/validation.js';
import User from "../../models/User.js";

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  }

router.post("/", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Can not find user");

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = generateAccessToken({ id: user._id });

      res.json({
        accessToken: accessToken,
      });
    } else {
      res.send("Not allowed");
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

export default router;