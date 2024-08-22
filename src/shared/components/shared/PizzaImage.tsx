import { cn } from '@/src/shared/lib/utils'
import { FC } from 'react'

interface Props {
  className?: string
  imageUrl: string
  size: 20 | 30 | 40
}

export const PizzaImage: FC<Props> = ({ size, imageUrl, className }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center flex-1 relative w-full ',
        className
      )}
    >
      <img
        src={imageUrl}
        alt='logo'
        className={cn(
          'relative left-2  top-2 transition-all z-10 duration-300',
          {
            'w-[350px] h-[350px]': size === 20,
            'w-[400px] h-[400px]': size === 30,
            'w-[450px] h-[450px]': size === 40,
          }
        )}
      />
    </div>
  )
}
