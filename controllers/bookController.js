// controllers/bookController.js
const Book = require("../models/Book");

// Obtener todos los libros
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los libros" });
  }
};

// Obtener un solo libro
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Libro no encontrado" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el libro" });
  }
};

// Crear un libro
exports.createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear el libro", error: error.message });
  }
};

// Actualizar un libro
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook)
      return res.status(404).json({ message: "Libro no encontrado" });
    res.json(updatedBook);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar el libro", error: error.message });
  }
};

// Eliminar un libro
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ message: "Libro no encontrado" });
    res.json({ message: "Libro eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el libro" });
  }
};
