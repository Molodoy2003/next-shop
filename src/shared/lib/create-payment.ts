import { PaymentData } from '@/src/@types/types'
import axios from 'axios'

/* 
  (Создает платёж и возвращает ссылку которая перенаправит юзера на оплату)
  amount - сумма платежа
  capture - автоматическое списание денег
  metadata - доп инфа (передали id заказа)
  comfirmation - после оплаты редирект на url

  !!!!вопрос (comfirmation: как в деплое сделать так, чтоб оно редиректило на главную, ведь я не знаю свой url при деплое, тоесть я могу указать localost главную страницу, а до деплоя как мне понять, на какую страницу редиректить)
  ДААААА, ВМЕСТО LOCALHOST В ENV НАДО БУДЕТ УКАЗАТЬ URL МОЕГО САЙТА
*/

interface Props {
  description: string
  orderId: number
  amount: number
}

export async function createPayment(details: Props) {
  const { data } = await axios.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        value: details.amount.toString(),
        currency: 'RUB',
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.YOOKASSA_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_STORE_ID as string,
        password: process.env.YOOKASSA_API_KEY as string,
      },
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': Math.random().toString(36).substring(7),
      },
    }
  )

  return data
}
