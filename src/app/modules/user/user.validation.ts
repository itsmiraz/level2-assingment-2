import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'firstName is Requried',
      invalid_type_error: 'firstName  must be string',
    })
    .min(1)
    .max(255),
  lastName: z
    .string({
      required_error: 'lastName is Requried',
      invalid_type_error: 'lastName  must be string',
    })
    .min(1)
    .max(255),
});

const addressValidationSchama = z.object({
  street: z
    .string({
      required_error: 'street is Requried',
      invalid_type_error: 'street  must be string',
    })
    .min(1)
    .max(255),
  city: z
    .string({
      required_error: 'City is Requried',
      invalid_type_error: 'City  must be string',
    })
    .min(1)
    .max(255),
  country: z
    .string({
      required_error: 'country is Requried',
      invalid_type_error: 'country  must be string',
    })
    .min(1)
    .max(255),
});

const orderSchema = z.object({
  productName: z
    .string({
      required_error: 'ProductName is Requried',
      invalid_type_error: 'ProductName  must be string',
    })
    .min(1)
    .max(255),
  price: z.number({
    required_error: 'Price is Requried',
    invalid_type_error: 'Price  must be number',
  }),
  quantity: z.number({
    required_error: 'Quantity is Requried',
    invalid_type_error: 'Quantity  must be number',
  }),
});

const userValidationSchema = z.object({
  userId: z
    .number({
      required_error: 'User id is Requried',
      invalid_type_error: 'User id must be number',
    })
    .min(4, 'User id must be minimum 4 characters'),
  username: z
    .string({
      required_error: 'Username is Requried',
      invalid_type_error: 'username must be string',
    })
    .min(1)
    .max(255),
  password: z
    .string({
      required_error: 'Password is Requried',
      invalid_type_error: 'Password  must be string',
    })
    .min(6)
    .max(20),
  fullName: userNameValidationSchema,
  email: z.string({
    required_error: 'email is Requried',
    invalid_type_error: 'email  must be string',
  }),
  isActive: z.boolean({
    required_error: 'isActive is Requried',
    invalid_type_error: 'isActive  must be Boolean',
  }),
  age: z.number({
    required_error: 'age is Requried',
    invalid_type_error: 'age  must be Boolean',
  }),
  hobbies: z.array(
    z.string({
      required_error: 'Hobbi is Requried',
      invalid_type_error: 'Hobbi  must be Array of Sting',
    }),
  ),
  address: addressValidationSchama,
  orders: z.array(orderSchema).nullable().optional(),
});

const updateUserValidationSchema = z.object({
  username: z
    .string({
      required_error: 'Username is Requried',
      invalid_type_error: 'username must be string',
    })
    .min(1)
    .max(255),
  fullName: userNameValidationSchema,
  email: z.string({
    required_error: 'email is Requried',
    invalid_type_error: 'email  must be string',
  }),
  isActive: z.boolean({
    required_error: 'isActive is Requried',
    invalid_type_error: 'isActive  must be Boolean',
  }),
  age: z.number({
    required_error: 'age is Requried',
    invalid_type_error: 'age  must be Boolean',
  }),
  hobbies: z.array(
    z.string({
      required_error: 'Hobbi is Requried',
      invalid_type_error: 'Hobbi  must be Array of Sting',
    }),
  ),
  address: addressValidationSchama,
});

export { userValidationSchema, updateUserValidationSchema, orderSchema };
