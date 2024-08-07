import { CreateCartItemValues } from '@/src/@types/types'
import { useEffect } from 'react'
import { CartItem } from '../lib/getCartDetails'
import { useCartStore } from '../store/cart'

type ReturnProps = {
  totalAmount: number
  items: CartItem[]
  loading: boolean
  updateItemQuantity: (id: number, quantity: number) => void
  deleteCartItem: (id: number) => void
  addCartItem: (values: CreateCartItemValues) => void
}

export const useFerchCart = (): ReturnProps => {
  const {
    deleteCartItem,
    updateItemQuantity,
    fetchCartItems,
    totalAmount,
    loading,
    addCartItem,
    items,
  } = useCartStore(state => state)

  useEffect(() => {
    fetchCartItems()
  }, [fetchCartItems])

  return {
    deleteCartItem,
    updateItemQuantity,
    loading,
    totalAmount,
    items,
    addCartItem,
  }
}
