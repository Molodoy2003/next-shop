'use client'

import { cn } from '@/src/shared/lib/utils'
import { Api } from '@/src/shared/services/api-client'
import { Product } from '@prisma/client'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import { FC, useRef, useState } from 'react'
import { useClickAway, useDebounce } from 'react-use'

interface IProps {
  className?: string
}

export const SearchInput: FC<IProps> = ({ className }) => {
  const [focused, setFocused] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const ref = useRef(null)

  useClickAway(ref, () => {
    setFocused(false)
  })

  useDebounce(
    () => {
      Api.products.search(searchValue).then(items => {
        setProducts(items)
      })
    },
    150,
    [searchValue]
  )

  const onClickItem = () => {
    setFocused(false)
    setSearchValue('')
  }

  return (
    <>
      {focused && (
        <div className='fixed left-0 top-0 bottom-0 right-0 bg-black/50 z-30' />
      )}
      <div
        ref={ref}
        className={cn(
          'flex rounded-2xl flex-1 justify-between relative h-11 z-30',
          className
        )}
      >
        <Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
        <input
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          onFocus={() => setFocused(true)}
          className='rounded-xl placeholder:text-gray-600 outline-none w-full bg-gray-100 pl-11'
          type='text'
          placeholder='Найти продукт...'
        />
        {searchValue && (
          <X
            onClick={() => setSearchValue('')}
            className='cursor-pointer absolute top-1/2 translate-y-[-50%] right-3 h-5 text-gray-500'
          />
        )}

        {products.length > 0 && (
          <div
            className={cn(
              'absolute w-full bg-white rounded-sm py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              focused && 'visible opacity-100 top-12'
            )}
          >
            {products.map(item => (
              <Link
                onClick={onClickItem}
                key={item.id}
                className='flex items-center gap-3 px-3 w-full py-2 hover:bg-primary/15'
                href={`/product/${item.id}`}
              >
                <img
                  className='rounded-sm h-8 w-8'
                  src={item.imageUrl}
                  alt={item.name}
                />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
