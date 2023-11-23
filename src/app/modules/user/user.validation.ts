import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
});

const addressValidationSchama = z.object({
  street: z.string().min(1).max(255),
  city: z.string().min(1).max(255),
  country: z.string().min(1).max(255),
});

// const orderSchema = z.object({
//   productName: z.string().min(1).max(255),
//   price: z.number(),
//   quantity: z.number(),
// });

const userValidationSchema = z.object({
  userId: z.number().min(4),
  username: z.string().min(1).max(255),
  password: z.string().min(6).max(20),
  fullName: userNameValidationSchema,
  email: z.string(),
  isActive: z.boolean(),
  age: z.number(),
  hobbies: z.array(z.string()),
  address: addressValidationSchama,
  // orders: z.array(orderSchema).nullable(),
});

const updateUserValidationSchema = z.object({
  username: z.string().nonempty({ message: 'Username is required' }),
  fullName: userNameValidationSchema,
  email: z.string().nonempty({ message: 'Email is required' }),
  isActive: z.boolean(),
  age: z.number(),
  hobbies: z.array(z.string()),
  address: addressValidationSchama,
});

export { userValidationSchema, updateUserValidationSchema };
