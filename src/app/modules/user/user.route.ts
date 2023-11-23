import express from 'express';
import {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from './user.controller';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:userId', getSingleUser);
router.put('/:userId', updateUser);

export const UserRoutes = router;
