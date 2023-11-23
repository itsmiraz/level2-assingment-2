import { Request, Response } from 'express';
import userValidationSchema from './user.validation';
import { UserServices } from './user.servicee';
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

export { createUser, getAllUsers };
