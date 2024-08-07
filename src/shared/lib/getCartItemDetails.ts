import { mapTypes, PizzaSize, PizzaType } from '../constants/pizza'
import { CartItem } from './getCartDetails'

export const getCartItemDetails = (
  ingredients: CartItem['ingredients'],
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize
): string => {
  const details = []

  if (pizzaSize && pizzaType) {
    const typeName = mapTypes[pizzaType]
    details.push(`${typeName} ${pizzaSize} см`)
  }

  if (ingredients) {
    details.push(...ingredients.map(item => item.name))
  }

  return details.join(', ')
}
