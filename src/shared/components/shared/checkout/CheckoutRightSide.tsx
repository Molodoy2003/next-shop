import { ArrowRight, Package, Percent, Truck } from 'lucide-react'
import { FC } from 'react'
import { useFerchCart } from '../../../hooks/use-fetch-cart'
import { cn } from '../../../lib/utils'
import { Button } from '../../ui/button'
import { WhiteBlock } from '../white-block'
import { CheckoutDetails } from './CheckoutDetails'

const VAT = 15
const DELIVERY_PRICE = 250

interface Props {
  className?: string
  loading: boolean
}

export const CheckoutRightSide: FC<Props> = ({ className, loading }) => {
  const { totalAmount } = useFerchCart()

  const vatPrice = (totalAmount * VAT) / 100
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE

  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className='flex flex-col gap-1 mb-10'>
        <span className='text-xl'>Итого: </span>
        {loading ? (
          ''
        ) : (
          <span className='text-[27px] font-extrabold'>{totalPrice} ₽</span>
        )}
      </div>

      <CheckoutDetails
        title={
          <div className='flex items-center'>
            <Package className='mr-2 text-gray-400' size={18} />
            Стоимость корзины:
          </div>
        }
        value={`${totalAmount}`}
      />
      <CheckoutDetails
        title={
          <div className='flex items-center'>
            <Percent className='mr-2 text-gray-400' size={18} />
            Налоги:
          </div>
        }
        value={`${vatPrice}`}
      />
      <CheckoutDetails
        title={
          <div className='flex items-center'>
            <Truck className='mr-2 text-gray-400' size={18} />
            Доставка:
          </div>
        }
        value={`${DELIVERY_PRICE}`}
      />
      <Button
        loading={loading}
        type='submit'
        className='w-full h-12 rounded-2xl mt-2 text-base font-bold'
      >
        Перейти к оплате
        <ArrowRight className='w-5 ml-2' />
      </Button>
    </WhiteBlock>
  )
}
