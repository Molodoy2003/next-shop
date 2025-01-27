import { prisma } from '@/prisma/prisma-client'
import { CreateCartItemValues } from '@/src/@types/types'
import { findOrCreateCart } from '@/src/shared/lib/findOrCreateCart'
import { updateCartAmount } from '@/src/shared/lib/updateCartAmout'
import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

/*
  при помощи crypto создаем рандомный токен
*/

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] })
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [{ token }],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    })

    return NextResponse.json(userCart)
  } catch (error) {
    return NextResponse.json(
      { message: 'Не удалось получить корзину' },
      { status: 500 }
    )
  }
}

// находим или создаем корзину корзины
export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value

    if (!token) {
      token = crypto.randomUUID()
    }

    const userCart = await findOrCreateCart(token)

    const data = (await req.json()) as CreateCartItemValues

    // если добавляем пиццу с такими же ингредиентами, то увеличиваем quantity, иначе создаем товар в корзине
    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: { every: { id: { in: data.ingredients } } },
      },
    })

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: {
            connect: data.ingredients?.map(id => ({ id })),
          },
        },
      })
    }

    const updatedUserCart = await updateCartAmount(token)

    const response = NextResponse.json(updatedUserCart)
    response.cookies.set('cartToken', token)

    return response
  } catch (error) {
    return NextResponse.json(
      { message: 'Не удалось добавить товар в корзину' },
      { status: 500 }
    )
  }
}
