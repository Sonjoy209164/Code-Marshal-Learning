// /controllers/userController.js
const userModel = require('../models/userModel');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email)
      return res.status(400).json({ message: 'Name and email are required' });

    const newUser = await userModel.createUser(name, email);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const updated = await userModel.updateUser(req.params.id, name, email);
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const deleted = await userModel.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted', deleted });
  } catch (err) {
    next(err);
  }
};
