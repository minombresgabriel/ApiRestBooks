// middlewares/bookValidator.js
const { body, validationResult } = require("express-validator");

const validateBook = [
  body("title")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 2 })
    .withMessage("El título debe tener al menos 2 caracteres"),

  body("author").notEmpty().withMessage("El autor es obligatorio"),

  body("publishedYear")
    .notEmpty()
    .withMessage("El año de publicación es obligatorio")
    .isInt({ min: 0 })
    .withMessage("El año debe ser un número válido"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err) => ({
          campo: err.param,
          mensaje: err.msg,
        })),
      });
    }
    next();
  },
];

module.exports = validateBook;
