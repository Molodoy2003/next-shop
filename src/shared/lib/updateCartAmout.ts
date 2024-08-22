import { prisma } from '@/prisma/prisma-client'
import { calcCartItemPrice } from './calcCartItemPrice'

/*
  обновляем стоимость корзины после обновления количества товара
*/

export const updateCartAmount = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: {
      token,
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

  if (!userCart) return null

  const totalAmount = userCart?.items.reduce((acc, item) => {
    return acc + calcCartItemPrice(item)
  }, 0)

  return await prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalAmount: totalAmount,
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
}
