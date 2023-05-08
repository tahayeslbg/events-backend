import { Request, Response } from 'express';
import createToken from '../../helpers/createToken';
import User, { IUser } from '../../models/userModel';
import getToken from '../../helpers/getToken';

const loginUser = async (req: Request, res: Response) => {
  try {
    const { emailAddress, password } = req.body;
    const user = (await User.findOne({ emailAddress: emailAddress })) as IUser;

    if (user) {
      const passwordMatch = user.password === password;

      if (passwordMatch) {
        res.status(200).json({
          user,
          token: createToken(user._id, user.role, '1d'),
        });
      } else {
        res.status(400).send({ error: 'Şifre yanlış.' });
      }
    } else {
      res
        .status(400)
        .send({ error: 'Böyle bir email adresi bulunmamaktadır.' });
    }
  } catch (error: any) {
    res.status(503).send({ error: error.message });
  }
};

export default loginUser;
