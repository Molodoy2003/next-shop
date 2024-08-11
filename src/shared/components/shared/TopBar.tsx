'use client'

import { cn } from '@/src/shared/lib/utils'
import { Category } from '@prisma/client'
import { FC, useEffect, useRef, useState } from 'react'
import { CartButton } from './CartButton'
import { Categories } from './Categories'
import { Container } from './Container'

type Props = {
  categories: Category[]
  className?: string
}

export const TopBar: FC<Props> = ({ categories, className }) => {
  const topBarRef = useRef<HTMLDivElement | null>(null)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (topBarRef.current) {
        const topBarOffset = topBarRef.current.getBoundingClientRect().top
        setIsSticky(topBarOffset <= 0)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      ref={topBarRef}
      className={cn(
        'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10',
        className
      )}
    >
      <Container className='flex items-center justify-between'>
        <Categories items={categories} />
        {isSticky && <CartButton className='ml-auto' />}
      </Container>
    </div>
  )
}
