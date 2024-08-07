import { prisma } from '@/prisma/prisma-client'
import { updateCartAmount } from '@/src/shared/lib/updateCartAmout'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    const data = (await req.json()) as { quantity: number }
    const token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({ message: 'Токен не найден' })
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: id,
      },
    })

    if (!cartItem) {
      return NextResponse.json({ message: 'товар не найден' })
    }

    await prisma.cartItem.update({
      where: {
        id: id,
      },
      data: {
        quantity: data.quantity,
      },
    })

    const updatedUserCart = await updateCartAmount(token)

    return NextResponse.json(updatedUserCart)
  } catch (error) {
    return NextResponse.json(
      { message: 'Не удалось обновить корзину' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    const token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({ message: 'Токен не найден' })
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: id,
      },
    })

    if (!cartItem) {
      return NextResponse.json({ message: 'товар не найден' })
    }

    await prisma.cartItem.delete({
      where: {
        id: id,
      },
    })

    const updatedUserCart = await updateCartAmount(token)

    return NextResponse.json(updatedUserCart)
  } catch (error) {
    return NextResponse.json(
      { message: 'Не удалось удалить товар' },
      { status: 500 }
    )
  }
}
