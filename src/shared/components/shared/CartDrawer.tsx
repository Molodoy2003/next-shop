'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { PizzaSize, PizzaType } from '../../constants/pizza'
import { useFerchCart } from '../../hooks/use-fetch-cart'
import { getCartItemDetails } from '../../lib/getCartItemDetails'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { CartItem } from './CartItem'
import { Title } from './Title'

/*
  SheetTrigger - вешается на кнопку для открытия дравера, тоесть на cartButton
*/

export const CartDrawer: FC<React.PropsWithChildren> = ({ children }) => {
  const { totalAmount, updateItemQuantity, items, deleteCartItem } =
    useFerchCart()

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
        <div
          className={cn(
            'flex flex-col h-full',
            !totalAmount && 'justify-center'
          )}
        >
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                В корзине {''}
                <span className='font-bold'>
                  {items.length} {items.length === 1 ? 'товар' : 'товара'}
                </span>
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className='flex flex-col items-center justify-center w-72 mx-auto'>
              <Image
                width={120}
                height={120}
                src='/assets/images/empty-box.png'
                alt='cartEmpty'
              />
              <Title
                text={'Корзина пустая'}
                size='sm'
                className='text-center font-bold my-2'
              />
              <p className='text-center text-neutral-500 mb-5'>
                Добавьте хотя бы 1 товар в корзину
              </p>
              <SheetClose>
                <Button className='w-56 h-12 text-base' size='lg'>
                  <ArrowLeft className='w-5 mr-2' />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className='-mx-6 mt-5 overflow-auto flex-1'>
                {items.map(item => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    imageUrl={item.imageUrl}
                    details={getCartItemDetails(
                      item.ingredients,
                      item.pizzaType as PizzaType,
                      item.pizzaSize as PizzaSize
                    )}
                    disabled={item.disabled}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    onClickCountButton={type =>
                      onClickCountButton(item.id, item.quantity, type)
                    }
                    onClickRemove={() => deleteCartItem(item.id)}
                  />
                ))}
              </div>

              <SheetFooter className='-mx-6 p-8 bg-white'>
                <div className='w-full'>
                  <div className='flex mb-4'>
                    <span className='flex flex-1 text-lg text-neutral-500'>
                      Итого:
                      <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'></div>
                    </span>
                    <span className='font-bold text-lg'>{totalAmount} ₽</span>
                  </div>

                  <Link href='/checkout'>
                    <Button type='submit' className='w-full h-12 text-base'>
                      Оформить заказ
                      <ArrowRight className='w-5 ml-2' />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
