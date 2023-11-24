import express from 'express';
import {
  addOrders,
  createUser,
  deleteUser,
  getAllUsers,
  getOrders,
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
router.get('/:userId/orders', getOrders);

export const UserRoutes = router;
