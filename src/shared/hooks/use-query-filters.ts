import { useRouter } from 'next/navigation'
import qs from 'qs'
import { useEffect, useRef } from 'react'
import { IFilters } from './use-filters'

/*
  Конвертируем в url формат объект params, который содержит все фильтры.
  
  isMounted сделал для того, чтобы когда ты переходить после оплаты на главную страницу, у тебя не рендерились фильтры, а только после первого раза!
*/

export const useQueryFilters = (filters: IFilters) => {
  const router = useRouter()
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        sizes: Array.from(filters.sizes),
        pizzaTypes: Array.from(filters.pizzaTypes),
        ingredients: Array.from(filters.selectedIngredients),
      }

      const query = qs.stringify(params, {
        arrayFormat: 'comma',
      })

      router.push(`?${query}`, { scroll: false })
    }

    isMounted.current = true
  }, [filters, router])
}
