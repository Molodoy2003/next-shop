import { cn } from '@/src/shared/lib/utils'

interface Props {
  src: string
  className?: string
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
  return (
    <img alt='cart' className={cn('w-[80px] h-[80px]', className)} src={src} />
  )
}
