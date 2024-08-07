export const mapSizes = {
  20: 'Маленькая',
  30: 'Средняя',
  40: 'Большая',
} as const

export const mapTypes = {
  1: 'традиционное',
  2: 'тонкое',
} as const

export const pizzaSizes = Object.entries(mapSizes).map(([value, name]) => ({
  name,
  value,
}))

export const pizzaTypes = Object.entries(mapTypes).map(([value, name]) => ({
  name,
  value,
}))

export type PizzaType = keyof typeof mapTypes
export type PizzaSize = keyof typeof mapSizes
