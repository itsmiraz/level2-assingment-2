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

export const UserServices = { createUserToDb, getAllUsers };
