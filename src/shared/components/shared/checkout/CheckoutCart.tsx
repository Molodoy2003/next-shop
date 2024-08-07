import { PizzaSize, PizzaType } from '@/src/shared/constants/pizza'
import { CartItem } from '@/src/shared/lib/getCartDetails'
import { getCartItemDetails } from '@/src/shared/lib/getCartItemDetails'
import React from 'react'
import { WhiteBlock } from '../white-block'
import { CheckoutItem } from './CheckoutItem'

interface Props {
  items: CartItem[]
  onClickCountButton: (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => void
  removeCartItem: (id: number) => void
  loading?: boolean
  className?: string
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  onClickCountButton,
  removeCartItem,
  loading,
  className,
}) => {
  return (
    <WhiteBlock title='1. Корзина' className={className}>
      <div className='flex flex-col gap-5'>
        {items.map(item => (
          <CheckoutItem
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            details={getCartItemDetails(
              item.ingredients,
              item.pizzaType as PizzaType,
              item.pizzaSize as PizzaSize
            )}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            disabled={item.disabled}
            onClickCountButton={type =>
              onClickCountButton(item.id, item.quantity, type)
            }
            onClickRemove={() => removeCartItem(item.id)}
          />
        ))}
      </div>
    </WhiteBlock>
  )
}
