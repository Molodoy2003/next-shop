import { cn } from '@/src/shared/lib/utils'
import { FC } from 'react'
import { Button } from '../../ui'
import { Title } from '../Title'

type Props = {
  name: string
  imageUrl: string
  onSubmit?: VoidFunction
  className?: string
  price: number
  loading?: boolean
}

export const ProductForm: FC<Props> = ({
  className,
  name,
  imageUrl,
  loading,
  price,
  onSubmit,
}) => {
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className='flex items-center justify-center flex-1 relative w-full'>
        <img
          src={imageUrl}
          alt={name}
          className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px] '
        />
      </div>

      <div className='w-[490px] bg-[#f7f6f5] p-7 flex flex-col'>
        <div className='flex-1'>
          <Title text={name} size='md' className='font-extrabold mb-1' />
        </div>
        <Button
          loading={loading}
          onClick={onSubmit}
          className='h-[55px] px-10 text-base rounded-[18px] w-full mt-auto'
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  )
}
