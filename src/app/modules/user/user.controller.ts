import { Request, Response } from 'express';
import userValidationSchema from './user.validation';
import { createUserToDb } from './user.servicee';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const ZodParseData = userValidationSchema.parse(userData);

    const result = await createUserToDb(ZodParseData);

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

export { createUser };
