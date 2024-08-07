import { prisma } from '@/prisma/prisma-client'
import { ChooseProduct } from '@/src/shared/components/shared/modals/choose-product'
import { notFound } from 'next/navigation'

type ProductProps = {
  params: {
    id: string
  }
}

export default async function ProductPage({ params: { id } }: ProductProps) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      items: true,
    },
  })

  if (!product) return notFound()

  return <ChooseProduct product={product} />
}
