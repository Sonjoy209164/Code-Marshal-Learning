// src/routes/userRoutes.js
import express from 'express';
import {
  getAll,
  getOne,
  create,
  update,
  remove
} from '../controllers/userController.js';

import { validateBody, schemas } from '../middleware/validator.js';

const router = express.Router();

// GET /api/v1/users
router.get('/', getAll);

// GET /api/v1/users/:id
router.get('/:id', getOne);

// POST /api/v1/users
router.post('/', validateBody(schemas.userCreateSchema), create);

// PUT /api/v1/users/:id
router.put('/:id', validateBody(schemas.userUpdateSchema), update);

// DELETE /api/v1/users/:id
router.delete('/:id', remove);

export default router;
