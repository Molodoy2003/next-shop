import { CircleCheck } from 'lucide-react'
import { FC } from 'react'
import { cn } from '../../lib/utils'

interface Props {
  className?: string
  imageUrl: string
  name: string
  price: number
  active?: boolean
  onClick?: () => void
}

export const IngredientItem: FC<Props> = ({
  className,
  imageUrl,
  name,
  price,
  active,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
        { 'border border-primary': active },
        className
      )}
    >
      {active && (
        <CircleCheck className='absolute top-2 right-2 text-primary' />
      )}
      <img alt='ing' width={110} height={110} src={imageUrl} />
      <span className='text-xs mb-1'>{name}</span>
      <span className='font-bold'>{price} ₽</span>
    </div>
  )
}
