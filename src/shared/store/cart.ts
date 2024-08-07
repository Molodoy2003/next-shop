import { CreateCartItemValues } from '@/src/@types/types'
import { create } from 'zustand'
import { CartItem, getCartDetails } from '../lib/getCartDetails'
import { Api } from '../services/api-client'

export interface ICartState {
  loading: boolean
  error: boolean
  totalAmount: number
  items: CartItem[]
  fetchCartItems: () => Promise<void>

  /* Запрос на обновление количества товара */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>

  /* Запрос на добавление товара в корзину */
  addCartItem: (values: any) => Promise<void>

  /* Запрос на удаление товара из корзины */
  deleteCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<ICartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false })
      const data = await Api.cart.getCart()
      set(getCartDetails(data))
    } catch (error) {
      set({ error: true })
      console.log(error)
    } finally {
      set({ loading: false })
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false })
      const data = await Api.cart.updateItemQuantity(id, quantity)
      set(getCartDetails(data))
    } catch (error) {
      set({ error: true })
      console.log(error)
    } finally {
      set({ loading: false })
    }
  },

  deleteCartItem: async (id: number) => {
    try {
      set(state => ({
        loading: true,
        error: false,
        items: state.items.map(item =>
          item.id === id ? { ...item, disabled: true } : item
        ),
      }))
      const data = await Api.cart.deleteCartItem(id)
      set(getCartDetails(data))
    } catch (error) {
      set({ error: true })
      console.log(error)
    } finally {
      set(state => ({
        loading: false,
        items: state.items.map(item => ({ ...item, disabled: false })),
      }))
    }
  },

  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false })
      const data = await Api.cart.addCartItem(values)
      set(getCartDetails(data))
    } catch (error) {
      set({ error: true })
      console.log(error)
    } finally {
      set({ loading: false })
    }
  },
}))
