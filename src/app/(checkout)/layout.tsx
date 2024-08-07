import { Container } from '@/src/shared/components/shared/Container'
import { Header } from '@/src/shared/components/shared/Header'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'TasteTown | Корзина',
}

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='min-h-screen bg-[#F4F1EE]'>
      <Container>
        <Suspense>
          <Header
            hasCartButton={false}
            hasSearch={false}
            className='border-b-gray-200'
          />
        </Suspense>
        {children}
      </Container>
    </main>
  )
}
