import { CartItemDTO } from '@/src/@types/types'
import { FC } from 'react'

interface Props {
  orderId: number
  items: CartItemDTO[]
}

export const OrderSuccess: FC<Props> = ({ orderId, items }) => {
  return (
    <div>
      <h1>Спасибо за покупку!</h1>
      <p>Ваш заказ № {orderId} оплачен. Список товаров:</p>
      <hr />
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.productItem.product.name} | {item.productItem.price}₽
          </li>
        ))}
      </ul>
    </div>
  )
}
