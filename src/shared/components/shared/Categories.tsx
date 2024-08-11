'use client'

import { cn } from '@/src/shared/lib/utils'
import { Category } from '@prisma/client'
import { FC } from 'react'
import { useCategoryStore } from '../../store/category'

interface Props {
  items: Category[]
  className?: string
}

export const Categories: FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore(state => state.activeId)

  return (
    <div
      className={cn(
        'flex justify-between gap-1 bg-gray-50 p-1 rounded-2xl',
        className
      )}
    >
      {items.map((item, id) => (
        <a
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === item.id &&
              'bg-white shadow-md shadow-gray-200 text-primary'
          )}
          href={`/#${item.name}`}
          key={id}
        >
          <button>{item.name}</button>
        </a>
      ))}
    </div>
  )
}
