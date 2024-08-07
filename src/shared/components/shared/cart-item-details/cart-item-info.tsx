import { cn } from '@/src/shared/lib/utils'

interface Props {
  name: string
  details: string
  className?: string
}

export const CartItemInfo: React.FC<Props> = ({ name, details, className }) => {
  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className='text-xl font-bold flex-1 leading-6'>{name}</h2>
      </div>
      {details && <p className='text-sm text-gray-400 w-[90%] '>{details}</p>}
    </div>
  )
}
