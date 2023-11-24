import { Request, Response } from 'express';
import {
  orderSchema,
  updateUserValidationSchema,
  userValidationSchema,
} from './user.validation';
import { UserServices } from './user.servicee';
import { User } from './user.model';
// import { createUserToDb } from './user.servicee';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const ZodParseData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserToDb(ZodParseData);

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      data: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      data: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const user = await UserServices.getSingleUser(parseFloat(userId));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      data: err,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const updatedData = req.body;

    //Check the updated data
    const newzodValidatedData = updateUserValidationSchema.parse(updatedData);

    const user = await User.isUserExists(parseFloat(userId));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    const result = await UserServices.UpdateUser(
      parseFloat(userId),
      newzodValidatedData,
    );

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      data: err,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.isUserExists(parseFloat(userId));
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    await UserServices.deleteUser(parseFloat(userId));

    res.status(400).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      data: err,
    });
  }
};

const addOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.isUserExists(parseFloat(userId));
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    const order = req.body;

    const validatedOrderData = orderSchema.parse(order);

    await UserServices.addOrder(parseFloat(userId), validatedOrderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      data: err,
    });
  }
};

export {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrders,
};
