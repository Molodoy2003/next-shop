import { Ingredient, ProductItem } from '@prisma/client'
import { PizzaSize, PizzaType } from '../constants/pizza'

export const calcTotalPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice = items.find(
    item => item.pizzaType === type && item.size === size
  )!.price

  const ingredientsPrice = ingredients
    .filter(item => selectedIngredients.has(item.id))
    .reduce((acc, item) => acc + item.price, 0)

  return pizzaPrice + ingredientsPrice
}
