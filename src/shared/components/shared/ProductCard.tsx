import { Ingredient } from '@prisma/client'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { Button } from '../ui'
import { Title } from './Title'

interface IProductCard {
  className?: string
  id: number
  name: string
  price: number
  imageUrl: string
  ingredients: Ingredient[]
}

export const ProductCard: FC<IProductCard> = ({
  className,
  id,
  name,
  price,
  ingredients,
  imageUrl,
}) => {
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

        <Link href={`/product/${id}`}>
          <Button variant='secondary' className='text-base font-bold'>
            <Plus size={20} className='mr-1' />
            Добавить
          </Button>
        </Link>
      </div>
    </div>
  )
}
