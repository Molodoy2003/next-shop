import { FC } from 'react'

interface Props {
  orderId: number
  totalAmount: number
  paymentUrl: string
}

export const PayOrder: FC<Props> = ({ orderId, totalAmount, paymentUrl }) => {
  return (
    <div>
      <h1>Заказ № {orderId}</h1>
      <p>
        Оплатите заказ на сумму <b>{totalAmount} ₽</b>. Перейдите{' '}
        <a href={paymentUrl}>по этой ссылке</a>для оплаты заказа.
      </p>
    </div>
  )
}
