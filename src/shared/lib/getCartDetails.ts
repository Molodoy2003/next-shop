import { CartDTO } from '@/src/@types/types'
import { calcCartItemPrice } from './calcCartItemPrice'

export type CartItem = {
  id: number
  quantity: number
  name: string
  imageUrl: string
  disabled?: boolean
  price: number
  pizzaSize?: number | null
  pizzaType?: number | null
  ingredients: Array<{ name: string; price: number }>
}

type ReturnProps = {
  items: CartItem[]
  totalAmount: number
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map(item => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartItemPrice(item),
    disabled: false,
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    ingredients: item.ingredients.map(item => ({
      name: item.name,
      price: item.price,
    })),
  })) as CartItem[]

  return {
    totalAmount: data.totalAmount,
    items,
  }
}
