import { prisma } from '@/prisma/prisma-client'
import { CartItemDTO, PaymentCallbackData } from '@/src/@types/types'
import { OrderSuccess } from '@/src/shared/components/shared/email-templates/OrderSuccess'
import { sendEmail } from '@/src/shared/lib/sendEmail'
import { OrderStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

// ФУНКЦИЯ ДЛЯ ИЗМЕНЕНИЯ СТАТУСА ЗАКАЗА ПОСЛЕ ОПЛАТЫ
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData

    // НАXОДИМ НУЖНЫЙ ЗАКАЗ
    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' })
    }

    const isSucceeded = body.object.status === 'succeeded'

    // ИЗМЕНЯЕМ СТАТУС НА УСПЕШНЫЙ
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    })

    const items = JSON.parse(order?.items as string) as CartItemDTO[]

    if (isSucceeded) {
      await sendEmail(
        order.email,
        'Ваш заказ успешно оформлен ✅',
        OrderSuccess({ orderId: order.id, items })
      )
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Ошибка checkout-callback' },
      { status: 500 }
    )
  }
}
