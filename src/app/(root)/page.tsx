import { Container } from '@/src/shared/components/shared/Container'
import { Filters } from '@/src/shared/components/shared/Filters'
import ProductsGroupList from '@/src/shared/components/shared/ProductsGroupList'
import { Stories } from '@/src/shared/components/shared/Stories'
import { Title } from '@/src/shared/components/shared/Title'
import { TopBar } from '@/src/shared/components/shared/TopBar'
import { findPizzas, GetSearchParams } from '@/src/shared/lib/findPizzas'
import { Suspense } from 'react'

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams
}) {
  const categories = await findPizzas(searchParams)

  return (
    <>
      <Container className=''>
        <Title text='Все продукты' size='lg' className='font-extrabold' />
      </Container>
      <TopBar
        categories={categories.filter(category => category.products.length > 0)}
      />

      <Stories />

      <Container className='pb-14 mt-8'>
        <div className='flex gap-[80px]'>
          {/* Фильтрация */}
          <div className='w-[250px]'>
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Список товаров */}
          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              {categories.map(
                category =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
