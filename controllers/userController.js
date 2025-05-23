const User = require("../models/User");

// Cambiar el rol de un usuario
const changeUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    if (!["admin", "user"].includes(role)) {
      return res
        .status(400)
        .json({ message: 'Rol inválido. Usa "admin" o "user".' });
    }

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    user.role = role;
    await user.save();

    res.json({
      message: `Rol actualizado a ${role} para el usuario ${user.email}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Obtener todos los usuarios con paginación y búsqueda
const getAllUsers = async (req, res) => {
  const search = req.query.search || "";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const filter = {
      $or: [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    const users = await User.find(filter)
      .select("-password")
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filter);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      users,
    });
  } catch (error) {
    console.error("Error al buscar usuarios:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Eliminar usuario por ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.user._id.toString() === userId) {
      return res
        .status(400)
        .json({ message: "No puedes eliminar tu propia cuenta." });
    }

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    await User.findByIdAndDelete(userId);

    res.json({ message: `Usuario ${user.email} eliminado correctamente.` });
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Actualizar usuario (admin o propio usuario)
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, role } = req.body;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const isAdminUser = req.user.role === "admin";
    const isOwnAccount = req.user._id.toString() === userId;

    if (!isAdminUser && !isOwnAccount) {
      return res
        .status(403)
        .json({ message: "No autorizado para actualizar este usuario" });
    }

    if (username) user.username = username;
    if (email) user.email = email;

    if (role && isAdminUser) {
      if (!["admin", "user"].includes(role)) {
        return res
          .status(400)
          .json({ message: 'Rol inválido. Usa "admin" o "user".' });
      }
      user.role = role;
    }

    await user.save();

    res.json({
      message: "Usuario actualizado correctamente",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Actualizar contraseña del usuario
const updatePassword = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.user._id.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "No autorizado para cambiar esta contraseña" });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Debes enviar currentPassword y newPassword" });
    }

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña actual incorrecta" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error actualizando contraseña:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Cerrar sesión (solo frontend elimina el token)
const logoutUser = (req, res) => {
  res.json({ message: "Sesión cerrada correctamente" });
};

module.exports = {
  changeUserRole,
  getAllUsers,
  deleteUser,
  updateUser,
  updatePassword,
  logoutUser,
};
