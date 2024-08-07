'use client'

import { useState } from 'react'
import { useSet } from 'react-use'
import { Input, Skeleton } from '../ui'
import { FilterChecboxProps, FilterCheckbox } from './FilterCheckBox'

type Item = FilterChecboxProps

interface IProps {
  className?: string
  title: string
  items: Item[]
  defaultItems?: Item[]
  loading?: boolean
  limit?: number
  searchInputPlaceholder?: string
  onClickCheckbox?: (id: string) => void
  defaultValue?: string[]
  selected?: Set<string>
  name?: string
}

export function CheckBoxFiltersGroup({
  limit = 5,
  searchInputPlaceholder = 'Поиск...',
  className,
  title,
  items,
  defaultItems,
  loading,
  selected,
  name,
  onClickCheckbox,
  defaultValue,
}: IProps) {
  const [showAll, setShowAll] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [set, { toggle }] = useSet(new Set<string>([]))

  const onChangeSearchInput = (value: string) => {
    setSearchValue(value)
  }

  if (loading) {
    return (
      <div className={className}>
        <p className='font-bold mt-3'>{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className='h-6 mb-4 rounded-[8px]' />
          ))}
      </div>
    )
  }

  const list = showAll
    ? items.filter(item =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : (defaultItems || items).slice(0, limit)

  return (
    <div className={className}>
      <p className='font-bold mb-3'>{title}</p>

      {showAll && (
        <div className='mb-5'>
          <Input
            onChange={e => onChangeSearchInput(e.target.value)}
            placeholder={searchInputPlaceholder}
            className='bg-gray-100 border-none'
          />
        </div>
      )}

      <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            name={name}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button
            className='text-primary mt-3'
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  )
}
