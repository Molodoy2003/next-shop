import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useSet } from 'react-use'

interface PriceProps {
  priceFrom?: number
  priceTo?: number
}

interface IFilterQuery extends PriceProps {
  pizzaTypes: string
  sizes: string
  ingredients: string
}

export interface IFilters {
  sizes: Set<string>
  pizzaTypes: Set<string>
  selectedIngredients: Set<string>
  prices: PriceProps
}

interface ReturnProps extends IFilters {
  setPrices: (name: keyof PriceProps, value: number) => void
  setPizzaTypes: (value: string) => void
  setSizes: (value: string) => void
  setSelectedIngredients: (value: string) => void
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams()

  //! Фильтр ингредиентов
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(','))
  )

  //! Фильтр размеров
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []
    )
  )

  //! Фильтр типов
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.get('pizzaTypes')
        ? searchParams.get('pizzaTypes')?.split(',')
        : []
    )
  )

  //! Фильтр стоимости
  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  })

  const onChangePrice = (name: keyof PriceProps, value: number) => {
    setPrices(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return {
    sizes,
    pizzaTypes,
    selectedIngredients,
    prices,
    setPrices: onChangePrice,
    setPizzaTypes: togglePizzaTypes,
    setSizes: toggleSizes,
    setSelectedIngredients: toggleIngredients,
  }
}
