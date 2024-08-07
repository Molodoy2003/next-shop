import { Container, Header } from '@/src/shared/components/shared'
import type { Metadata } from 'next'

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
        <Header
          hasCartButton={false}
          hasSearch={false}
          className='border-b-gray-200'
        />
        {children}
      </Container>
    </main>
  )
}
