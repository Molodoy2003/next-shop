'use client'

import {
  mapTypes,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from '@/src/shared/constants/pizza'
import { calcTotalPrice } from '@/src/shared/lib/calcTotalPrice'
import { cn } from '@/src/shared/lib/utils'
import { Ingredient, ProductItem } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { FC, useState } from 'react'
import { useSet } from 'react-use'
import { Button } from '../../ui/button'
import { IngredientItem } from '../IngredientItem'
import { PizzaImage } from '../PizzaImage'
import { Title } from '../Title'
import { Variants } from '../Variants'

type Props = {
  ingredients: Ingredient[]
  name: string
  imageUrl: string
  items: ProductItem[]
  onSubmit: (itemId: number, ingredients: number[]) => void
  className?: string
  currentItemId: number
  loading?: boolean
}

export const PizzaForm: FC<Props> = ({
  className,
  ingredients,
  name,
  imageUrl,
  loading,
  items,
  onSubmit,
}) => {
  const { data: session } = useSession()
  const [size, setSize] = useState<PizzaSize>(20)
  const [type, setType] = useState<PizzaType>(1)
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  )

  const textDetails = `${size} см, ${mapTypes[type]} тесто`
  const totalPrice = calcTotalPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  )

  // находим айдишник товара со всеми параметрами
  const currentItemId = items.find(
    item => item.pizzaType === type && item.size === size
  )?.id

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients))
    }
  }

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className='w-[490px] bg-[#f7f6f5] p-7 flex flex-col'>
        <div className='flex-1'>
          <Title text={name} size='md' className='font-extrabold mb-1' />
          <p className='text-gray-400'>{textDetails}</p>

          <div className='flex flex-col gap-2 mt-5'>
            <Variants
              items={pizzaSizes}
              value={String(size)}
              onClick={value => setSize(Number(value) as PizzaSize)}
            />

            <Variants
              items={pizzaTypes}
              value={String(type)}
              onClick={value => setType(Number(value) as PizzaType)}
            />
          </div>

          <div className=' mb-3 rounded-md h-[420px] overflow-auto scrollbar'>
            <div className='grid grid-cols-3 gap-3 my-5'>
              {ingredients.map(item => (
                <IngredientItem
                  key={item.id}
                  name={item.name}
                  imageUrl={item.imageUrl}
                  price={item.price}
                  onClick={() => addIngredient(item.id)}
                  active={selectedIngredients.has(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
        <Button
          disabled={!session}
          loading={loading}
          onClick={handleClickAdd}
          className='h-[55px] px-10 text-base rounded-[18px] w-full mt-auto'
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}
