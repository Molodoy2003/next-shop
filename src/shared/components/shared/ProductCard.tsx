'use client'

import { ProductWithRelations } from '@/src/@types/types'
import { Ingredient } from '@prisma/client'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import toast from 'react-hot-toast'
import { useCartStore } from '../../store/cart'
import { Button } from '../ui'
import { Title } from './Title'

interface IProductCard {
  className?: string
  id: number
  name: string
  price: number
  imageUrl: string
  ingredients: Ingredient[]
  product: ProductWithRelations
}

export const ProductCard: FC<IProductCard> = ({
  className,
  id,
  name,
  price,
  ingredients,
  imageUrl,
  product,
}) => {
  const { addCartItem } = useCartStore(state => state)
  const firstItem = product?.items[0]

  const onAddProduct = () => {
    try {
      addCartItem({ productItemId: firstItem.id })
      toast.success('Продукт добавлен в корзину ✅', {
        icon: '✅',
      })
    } catch (error) {
      toast.error('Не удалось добавить продукт в корзину', {
        icon: '❌',
      })
    }
  }

  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
          <img className='w-[215px] h-[215px]' src={imageUrl} alt={name} />
        </div>

        <Title text={name} size='sm' className='mb-1 mt-3 font-bold' />
        <p className='text-sm text-gray-400'>
          {ingredients.map(item => item.name).join(', ')}
        </p>
      </Link>

      <div className='flex justify-between items-center mt-4'>
        <span className='text-[20px]'>
          от <b>{price} ₽</b>
        </span>

        {/* <Link href={`/product/${id}`}> */}
        <Button
          onClick={onAddProduct}
          variant='secondary'
          className='text-base font-bold'
        >
          <Plus size={20} className='mr-1' />
          Добавить
        </Button>
        {/* </Link> */}
      </div>
    </div>
  )
}
