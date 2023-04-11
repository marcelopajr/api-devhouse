import User from "../models/User";
import * as Yup from "yup";

class SessionController {
  async store(req, res) {
    const sessionSchema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    const { email } = req.body;

    // Validate email
    if (!(await sessionSchema.isValid(req.body))) {
      return res.status(400).json({ error: "Error validating email!" });
    }

    // Verify if user already exist
    let user = await User.findOne({ email });

    // If don't exist, create a new one
    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  }
}

export default new SessionController();
