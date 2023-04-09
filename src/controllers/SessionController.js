import User from "../models/User";

class SessionController {
  async store(req, res) {
    const { email } = req.body;

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
