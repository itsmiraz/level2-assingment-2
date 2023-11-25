import { TOrder, TUser } from './user.interface';
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

const addOrder = async (userId: number, order: TOrder) => {
  const result = await User.findOneAndUpdate(
    {
      userId,
    },

    {
      $push: {
        orders: order,
      },
    },
  );
  return result;
};

const getOrders = async (userId: number) => {
  const orders = await User.findOne({ userId }, { orders: 1, _id: 0 });
  return orders;
};

const getTotalPrice = async (userId: number) => {
  const data = await User.aggregate([
    // Finding The User
    {
      $match: { userId },
    },

    // Unwind them in one array
    { $unwind: '$orders' },

    //  Multiply the price with quantitiy and then sum them
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    {
      $project: { totalPrice: 1, _id: 0 },
    },
  ]);
  return data;
};

export const UserServices = {
  createUserToDb,
  getAllUsers,
  getSingleUser,
  UpdateUser,
  deleteUser,
  addOrder,
  getOrders,
  getTotalPrice,
};
