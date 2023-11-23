import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from './user.controller';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:userId', getSingleUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export const UserRoutes = router;
