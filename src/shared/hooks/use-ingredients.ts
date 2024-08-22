import { Ingredient } from '@prisma/client'
import { useEffect, useState } from 'react'
import { Api } from '../services/api-client'

/*
  Получает список ингредиентов и хранит выбранные ингредиенты
*/

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true)
        const data = await Api.ingredients.getAll()
        setIngredients(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchIngredients()
  }, [])

  return {
    ingredients,
    loading,
  }
}
