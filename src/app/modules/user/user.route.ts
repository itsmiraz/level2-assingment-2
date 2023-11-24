import express from 'express';
import {
  addOrders,
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
router.put('/:userId/orders', addOrders);

export const UserRoutes = router;
