import { TUser } from './user.interface';
import { User } from './user.model';

const createUserToDb = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User Already Exists');
  }

  const result = await User.create(userData);
  return result;
};

const getAllUsers = async () => {
  const result = await User.aggregate([
    { $match: {} },
    { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } },
  ]);

  return result;
};

const getSingleUser = async (userId: number) => {
  const user = await User.isUserExists(userId);

  return user;
};

const UpdateUser = async (userId: number, userData: object) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $set: userData },
    { new: true },
  );

  return result;
};

const deleteUser = async (userId: number) => {
  const result = await User.findOneAndDelete({ userId });

  return result;
};

export const UserServices = {
  createUserToDb,
  getAllUsers,
  getSingleUser,
  UpdateUser,
  deleteUser,
};
