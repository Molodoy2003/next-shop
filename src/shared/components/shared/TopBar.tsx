import { cn } from '@/src/shared/lib/utils'
import { Category } from '@prisma/client'
import { FC } from 'react'
import { Categories } from './Categories'
import { Container } from './Container'

type Props = {
  categories: Category[]
  className?: string
}

export const TopBar: FC<Props> = ({ categories, className }) => {
  return (
    <div
      className={cn(
        'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10',
        className
      )}
    >
      <Container className='flex items-center justify-between'>
        <Categories items={categories} />
      </Container>
    </div>
  )
}
