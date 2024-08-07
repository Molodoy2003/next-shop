import { cn } from '@/src/shared/lib/utils'
import { FC } from 'react'

type Props = {
  title?: React.ReactNode
  value?: string
  className?: string
}

export const CheckoutDetails: FC<Props> = ({ className, title, value }) => {
  return (
    <div className={cn('flex my-4', className)}>
      <span className='flex flex-1 text-lg text-neutral-500'>
        {title}
        <div className='flex-1 border-b border-dashed border-neutral-300 relative -top-1 mx-2'></div>
      </span>
      <span className='font-bold text-lg'>{value} ₽</span>
    </div>
  )
}
