'use client'

import {} from 'next/router'
import { FC } from 'react'
import { useFilters } from '../../hooks/use-filters'
import { useIngredients } from '../../hooks/use-ingredients'
import { useQueryFilters } from '../../hooks/use-query-filters'
import { Input } from '../ui'
import { CheckBoxFiltersGroup } from './CheckBoxFiltersGroup'
import { RangeSlider } from './RangeSlider'
import { Title } from './Title'

interface Props {
  className?: string
}

export const Filters: FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients()
  const filters = useFilters()

  useQueryFilters(filters)

  const items = ingredients.map(item => ({
    value: String(item.id),
    text: item.name,
  }))

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0])
    filters.setPrices('priceTo', prices[1])
  }

  return (
    <div className={className}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-extrabold' />

      {/* Верхние чекбоксы */}
      <CheckBoxFiltersGroup
        title='Тип теста'
        name='types'
        className='mb-5'
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />
      <CheckBoxFiltersGroup
        title='Размеры'
        name='sizes'
        className='mb-5'
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />
      {/* Фильтр цен */}
      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='font-bold mt-3'>Цена от и до:</p>
        <div className='flex gap-3 mb-5'>
          <Input
            onChange={e =>
              filters.setPrices('priceFrom', Number(e.target.value))
            }
            value={String(filters.prices.priceFrom)}
            type='number'
            placeholder='0'
            min={0}
            max={1000}
          />
          <Input
            onChange={e => filters.setPrices('priceTo', Number(e.target.value))}
            value={String(filters.prices.priceTo)}
            type='number'
            placeholder='1000'
            min={100}
            max={1000}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          onValueChange={updatePrices}
        />
      </div>
      {/* Нижние чекбоксы */}
      <CheckBoxFiltersGroup
        name='ingredients'
        title='Ингредиенты'
        className='mt-5'
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  )
}
