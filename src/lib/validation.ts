import { z } from 'zod';

// Order validation schema
export const orderSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Zа-яА-Я\s]+$/, 'First name can only contain letters and spaces'),
  
  middleName: z.string()
    .max(50, 'Middle name must be less than 50 characters')
    .regex(/^[a-zA-Zа-яА-Я\s]*$/, 'Middle name can only contain letters and spaces')
    .optional(),
  
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Zа-яА-Я\s]+$/, 'Last name can only contain letters and spaces'),
  
  address: z.string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be less than 200 characters'),
  
  phone: z.string()
    .min(8, 'Phone number must be at least 8 characters')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Phone number can only contain numbers, spaces, hyphens, parentheses, and +'),
  
  municipality: z.string()
    .min(1, 'Municipality is required')
    .max(100, 'Municipality must be less than 100 characters'),
  
  city: z.string()
    .min(1, 'City is required')
    .max(100, 'City must be less than 100 characters'),
  
  items: z.array(z.object({
    id: z.string().min(1, 'Product ID is required'),
    name: z.string().min(1, 'Product name is required'),
    price: z.number().positive('Price must be positive'),
    quantity: z.number().int().positive('Quantity must be a positive integer'),
    variant: z.string().optional()
  })).min(1, 'At least one item is required'),
  
  country: z.string().max(100, 'Country must be less than 100 characters').optional(),
  totalPrice: z.number().positive('Total price must be positive'),
  status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']).optional()
});

// Perfume validation schema
export const perfumeSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  
  brand: z.string()
    .min(1, 'Brand is required')
    .max(50, 'Brand must be less than 50 characters'),
  
  price: z.number()
    .positive('Price must be positive')
    .max(10000, 'Price must be less than 10,000'),
  
  description: z.string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional(),
  
  images: z.array(z.string().url('Must be a valid URL'))
    .min(1, 'At least one image is required')
    .max(10, 'Maximum 10 images allowed'),
  
  gender: z.enum(['men', 'women']),
  
  topNotes: z.array(z.string())
    .max(20, 'Maximum 20 top notes allowed'),
  
  heartNotes: z.array(z.string())
    .max(20, 'Maximum 20 heart notes allowed'),
  
  baseNotes: z.array(z.string())
    .max(20, 'Maximum 20 base notes allowed'),
  
  variants: z.array(z.object({
    size: z.string().min(1, 'Size is required'),
    price: z.number().positive('Price must be positive'),
    stock: z.number().int().min(0, 'Stock cannot be negative')
  })).optional()
});

// Admin login validation schema
export const adminLoginSchema = z.object({
  username: z.string()
    .min(1, 'Username is required')
    .max(50, 'Username must be less than 50 characters'),
  
  password: z.string()
    .min(1, 'Password is required')
    .max(100, 'Password must be less than 100 characters')
});

// Order status update schema
export const orderStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
});

export type OrderData = z.infer<typeof orderSchema>;
export type PerfumeData = z.infer<typeof perfumeSchema>;
export type AdminLoginData = z.infer<typeof adminLoginSchema>;
export type OrderStatusData = z.infer<typeof orderStatusSchema>;
