'use client'

import { ArrowRight, ShoppingCart } from 'lucide-react'
import { FC } from 'react'
import { cn } from '../../lib/utils'
import { useCartStore } from '../../store/cart'
import { Button } from '../ui/button'
import { CartDrawer } from './CartDrawer'

/*
  обернул в CartDrawer для отображения дравера при клике на кнопку
*/

type Props = {
  className?: string
}

export const CartButton: FC<Props> = ({ className }) => {
  const { totalAmount, items, loading } = useCartStore(state => state)

  return (
    <CartDrawer>
      <Button
        loading={loading}
        className={cn('group relative', { 'w-[105px]': loading })}
      >
        <b>{totalAmount} ₽</b>
        <span className='h-full w-[1px] bg-white/30 mx-3'></span>
        <div className='flex justify-center items-center gap-2 transition duration-300 group-hover:opacity-0'>
          <ShoppingCart size={16} className='relative' strokeWidth={2} />
          <b>{items.length}</b>
        </div>
        <ArrowRight
          size={20}
          className='absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
        />
      </Button>
    </CartDrawer>
  )
}
