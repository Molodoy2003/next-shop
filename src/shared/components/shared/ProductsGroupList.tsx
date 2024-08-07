'use client'

import { ProductWithRelations } from '@/src/@types/types'
import { cn } from '@/src/shared/lib/utils'
import { FC, useEffect, useRef } from 'react'
import useIntersection from 'react-use/esm/useIntersection'
import { useCategoryStore } from '../../store/category'
import { ProductCard } from './ProductCard'
import { Title } from './Title'

interface IProductsGroupList {
  className?: string
  items: ProductWithRelations[]
  title: string
  listClassName?: string
  categoryId: number
}

const ProductsGroupList: FC<IProductsGroupList> = ({
  className,
  items,
  title,
  listClassName,
  categoryId,
}) => {
  const setActiceCategoryId = useCategoryStore(state => state.setActiveId)
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  })

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiceCategoryId(categoryId)
    }
  }, [setActiceCategoryId, categoryId, title, intersection?.isIntersecting])

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size='lg' className='font-extrabold mb-5' />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product, id) => (
          <ProductCard
            key={id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductsGroupList
