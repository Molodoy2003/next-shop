'use client'

import { cn } from '@/src/shared/lib/utils'
import { FC } from 'react'

type Variant = {
  name: string
  value: string
  disabled?: boolean
}

interface Props {
  items: readonly Variant[]
  className?: string
  onClick?: (value: Variant['value']) => void
  value?: Variant['value']
}

export const Variants: FC<Props> = ({ items, className, onClick, value }) => {
  return (
    <div
      className={cn(
        'flex justify-between bg-[#dedee4] rounded-3xl p-1 select-none ',
        className
      )}
    >
      {items.map(item => (
        <button
          className={cn(
            'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
            {
              'bg-gray-200 shadow  border border-gray-300':
                item.value === value,
              'text-gray-500 opacity-50 pointer-events-none': item.disabled,
            }
          )}
          onClick={() => onClick?.(item.value)}
          key={item.name}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
}
