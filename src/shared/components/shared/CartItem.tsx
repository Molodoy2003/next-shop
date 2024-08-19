import { Trash2Icon } from 'lucide-react'
import { FC } from 'react'
import { cn } from '../../lib/utils'
import { CartItemDetailsImage } from './cart-item-details/cart-item-details-image'
import { CartItemDetailsPrice } from './cart-item-details/cart-item-details-price'
import { CartItemProps } from './cart-item-details/cart-item-details.types'
import { CartItemInfo } from './cart-item-details/cart-item-info'
import { CountButton } from './CountButton'

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void
  onClickRemove?: () => void
  className?: string
}

export const CartItem: FC<Props> = ({
  className,
  id,
  imageUrl,
  details,
  name,
  price,
  quantity,
  onClickRemove,
  onClickCountButton,
  disabled,
}) => {
  return (
    <div
      className={cn(
        'flex bg-white p-5 gap-6',
        { 'opacity-50 pointer-events-none': disabled },
        className
      )}
    >
      <CartItemDetailsImage src={imageUrl} />

      <div className='flex-1'>
        <CartItemInfo name={name} details={details} />
        <hr className='my-3' />
        <div className='flex items-center justify-between'>
          <CountButton value={quantity} onClick={onClickCountButton} />
          <div className='flex items-center gap-3'>
            <CartItemDetailsPrice value={price} />
            <Trash2Icon
              onClick={onClickRemove}
              className='text-gray-400 cursor-pointer hover:text-gray-600'
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
