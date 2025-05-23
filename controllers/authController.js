const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Registro
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Usuario ya registrado" });

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);

    res.status(201).json({ user: { id: user._id, username, email }, token });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro", error });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Credenciales inválidas" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Credenciales inválidas" });

    const token = generateToken(user._id);

    res
      .status(200)
      .json({ user: { id: user._id, username: user.username, email }, token });
  } catch (error) {
    res.status(500).json({ message: "Error en el login", error });
  }
};
