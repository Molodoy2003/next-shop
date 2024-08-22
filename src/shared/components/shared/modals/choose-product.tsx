'use client'

import { ProductWithRelations } from '@/src/@types/types'
import { useCartStore } from '@/src/shared/store/cart'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import toast from 'react-hot-toast'
import { Dialog, DialogContent } from '../../ui/dialog'
import { PizzaForm } from './pizza-form'
import { ProductForm } from './product-form'

interface Props {
  product: ProductWithRelations
  className?: string
}

export const ChooseProduct: FC<Props> = ({ product, className }) => {
  const router = useRouter()
  const firstItem = product.items[0]
  const { data: session } = useSession()
  const isPizzaForm = Boolean(firstItem.pizzaType)
  const { addCartItem, loading } = useCartStore(state => state)

  const onAddProduct = () => {
    try {
      addCartItem({ productItemId: firstItem.id })
      toast.success('Продукт добавлен в корзину')
      router.back()
    } catch (error) {
      toast.error('Не удалось добавить продукт в корзину')
    }
  }

  const onAddPizza = async (productItemId: number, ingredients: number[]) => {
    try {
      await addCartItem({ ingredients, productItemId })
      toast.success(`${product.name} добавлена в корзину`)
      router.back()
    } catch (error) {
      toast.error('Не удалось добавить пиццу в корзину')
    }
  }

  return (
    <Dialog onOpenChange={() => router.back()} open={Boolean(product)}>
      <DialogContent className='p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden'>
        {isPizzaForm ? (
          <PizzaForm
            items={product.items}
            ingredients={product.ingredients}
            name={product.name}
            imageUrl={product.imageUrl}
            onSubmit={onAddPizza}
            currentItemId={0}
            loading={session ? loading : false}
          />
        ) : (
          <ProductForm
            onSubmit={onAddProduct}
            name={product.name}
            imageUrl={product.imageUrl}
            price={firstItem.price}
            loading={session ? loading : false}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
