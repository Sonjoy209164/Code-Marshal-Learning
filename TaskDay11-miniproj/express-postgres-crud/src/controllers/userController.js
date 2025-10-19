// src/controllers/userController.js
import * as model from '../models/userModel.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export async function getAll(req, res, next) {
  try {
    const users = await model.findAllUsers();
    res.json(new ApiResponse('success', users));
  } catch (err) {
    next(err);
  }
}

export async function getOne(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json(new ApiResponse('error', null, 'Invalid id'));
    const user = await model.findUserById(id);
    if (!user) return res.status(404).json(new ApiResponse('error', null, 'User not found'));
    res.json(new ApiResponse('success', user));
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const payload = req.body;
    const user = await model.createUser(payload);
    res.status(201).json(new ApiResponse('success', user, 'User created'));
  } catch (err) {
    // handle unique constraint violation in controller for friendly message
    if (err.code === '23505') {
      // unique_violation
      return res.status(409).json(new ApiResponse('error', null, 'Email already exists'));
    }
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json(new ApiResponse('error', null, 'Invalid id'));

    const updated = await model.updateUserById(id, req.body);
    if (!updated) return res.status(404).json(new ApiResponse('error', null, 'User not found'));
    res.json(new ApiResponse('success', updated, 'User updated'));
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json(new ApiResponse('error', null, 'Email already exists'));
    }
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json(new ApiResponse('error', null, 'Invalid id'));
    const deleted = await model.deleteUserById(id);
    if (!deleted) return res.status(404).json(new ApiResponse('error', null, 'User not found'));
    res.json(new ApiResponse('success', deleted, 'User deleted'));
  } catch (err) {
    next(err);
  }
}
