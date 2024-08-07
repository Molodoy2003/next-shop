import {
  Cart,
  CartItem,
  Ingredient,
  Product,
  ProductItem,
} from '@prisma/client'

export type ProductWithRelations = Product & {
  items: ProductItem[]
  ingredients: Ingredient[]
}

export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product
  }
  ingredients: Ingredient[]
}

export interface CartDTO extends Cart {
  items: CartItemDTO[]
}

export interface CreateCartItemValues {
  productItemId: number
  ingredients?: number[]
}

// yookassa
export interface PaymentData {
  id: string
  status: string
  amount: Amount
  description: string
  recipient: Recipient
  created_at: string
  confirmation: Confirmation
  test: boolean
  paid: boolean
  refundable: boolean
  metadata: Metadata
}

export interface Amount {
  value: string
  currency: string
}

export interface Recipient {
  account_id: string
  gateway_id: string
}

export interface Confirmation {
  type: string
  confirmation_url: string
}

export interface Metadata {
  order_id: string
}

export type PaymentCallbackData = {
  type: string
  event: string
  object: {
    id: string
    status: string
    amount: { value: string; currency: 'RUB' }
    income_amount: { value: string; currency: 'RUB' }
    description: string
    recipient: { account_id: string; gateway_id: string }
    payment_method: {
      type: string
      id: string
      saved: boolean
      title: string
    }
    captured_at: string
    created_at: string
    test: boolean
    refunded_amount: { value: string; currency: 'RUB' }
    paid: boolean
    refundable: true
    metadata: { order_id: string }
    authorization_details: {
      rrn: string
      auth_code: string
    }
  }
}

// next-auth

import type { UserRole } from '@prisma/client'
import { DefaultUser } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: UserRole
      name: string
      image: string
    }
  }

  interface User extends DefaultUser {
    id: number
    role: UserRole
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    role: UserRole
  }
}
