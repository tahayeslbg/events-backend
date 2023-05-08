import { Request, Response } from 'express';
import User from '../../models/userModel/index.js';
import createToken from '../../helpers/createToken.js';
import getToken from '../../helpers/getToken.js';

//* REGISTER USER
 const registerUser = async (req: Request, res: Response) => {
  try {
    const isRegistered = await User.findOne({
      emailAddress: req.body.emailAddress,
    });
    if (!isRegistered) {
      const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
        emailAddress: req.body.emailAddress,
        role: req.body.role
      });
      const savedUser = await user.save();

      res.status(200).json({
        user: savedUser,
        token: createToken(user._id, user.role, '1d'),
      });
    } else {
      res.status(400).send({ error: 'Zaten böyle bir hesap bulunmaktadır!' });
    }

    
  } catch (error: any) {
    res.status(503).send({ error: error.message });
  }
};

export default registerUser